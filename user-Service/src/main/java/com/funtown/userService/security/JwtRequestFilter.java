package com.funtown.userService.security;

import com.funtown.userService.service.PersonService;
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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

/**
 * Filter that authenticates users based on JWT tokens included in the request headers.
 * <p>
 * This filter intercepts each request once per request to check for the presence of a JWT
 * in the Authorization header. If a valid JWT is found, it authenticates the user, allowing
 * them access to protected resources.
 * </p>
 */
@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class);

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    private final PersonService personService;


    /**
     * Filters incoming requests to authenticate users based on JWT tokens.
     * <p>
     * Extracts JWT from the Authorization header, validates it, and sets the
     * SecurityContext if the token is valid. If the token is invalid or expired,
     * the filter chain proceeds without setting the authentication in the context,
     * potentially triggering authentication entry points further down the filter chain.
     * </p>
     *
     * @param request     The request to filter.
     * @param response    The response associated with the request.
     * @param filterChain The chain of filters that the request is a part of.
     * @throws jakarta.servlet.ServletException if there is a servlet-related issue.
     * @throws IOException if an I/O error occurs during request processing.
     */
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws jakarta.servlet.ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        String username = null;
        String jwt = null;
        if (authHeader == null || !authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request, response);
            return;
        }
            jwt = authHeader.substring(7);  // Exclude Bearer prefix
            try {
                username = jwtUtil.extractUsername(jwt);
                System.out.println("Username: " + username);
            } catch (ExpiredJwtException e) {
                logger.warn("The token has expired", e);
            } catch (Exception e) {
                logger.warn("Unable to parse JWT", e);
            }


        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = null;
            try {
                userDetails = personService.loadUserByUsername(username);
            } catch (UsernameNotFoundException e) {
                logger.error("User not found: {}", username);
            }

            if (userDetails != null && jwtUtil.validateToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}
