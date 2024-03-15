package com.funtown.userService.security;

import com.funtown.userService.Dtos.FullPersonDto;
import com.funtown.userService.model.Person;
import com.funtown.userService.service.PersonService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.lang.NonNullApi;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.List;

/**
 * A filter for validating incoming user requests based on JWT tokens included in the request headers.
 *
 * <p>This filter is designed to intercept every incoming request to check whether it contains a valid JWT
 * in the Authorization header. If the provided JWT is valid, it authenticates the user and allows access
 * to protected resources. If the JWT is invalid or not present, the request is forwarded down the
 * filter chain without authentication.</p>
 */
@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class);

    private final JwtUtil jwtUtil;
    private final PersonService personService;


    /**
     * Method to filter incoming requests and authenticate users based on JWT tokens.
     *
     * <p>This method handles the process of extracting JWTs from the Authorization header, validating
     * them, and setting the SecurityContext if the token is valid. If the token is invalid or expired,
     * the filter chain proceeds without setting the authentication, potentially triggering authentication
     * entry points further down the filter chain.</p>
     *
     * @param request the request to filter.
     * @param response the response associated with the request.
     * @param filterChain the chain of filters that the request is a part of.
     * @throws jakarta.servlet.ServletException if there is a servlet-related issue.
     * @throws IOException if an I/O error occurs during the request processing.
     */
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws jakarta.servlet.ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = authHeader.substring(7);  // Exclude Bearer prefix
        String username;
        Claims claims;
        List<GrantedAuthority> authorities;

        try {
            claims = jwtUtil.extractAllClaims(jwt);
            username = claims.getSubject();
            authorities = jwtUtil.extractAuthoritiesFromToken(claims);
            System.out.println("auth : "+ authorities);
            logger.debug("claims: " + claims);
        } catch (ExpiredJwtException e) {
            logger.warn("The token has expired", e);
            filterChain.doFilter(request, response);
            return;
        } catch (Exception e) {
            logger.warn("Unable to parse JWT", e);
            filterChain.doFilter(request, response);
            return;
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            FullPersonDto userDetails;

            try {
                userDetails = personService.findByUsername(username);
            } catch (UsernameNotFoundException e) {
                logger.error("User not found: {}", username);
                filterChain.doFilter(request, response);
                return;
            }

            if (jwtUtil.validateToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails.getUsername(), null, authorities);
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}