package com.funtown.application.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Key;
import java.util.Base64;
import java.util.Collections;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {

    @Value("${application.security.jwt.secret-key}")
    private String SECRET_KEY; // Secret key for JWT validation

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        final String AUTH_HEADER = request.getHeader("Authentication");
        if(AUTH_HEADER == null || !AUTH_HEADER.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
            return;
        }
        String token = AUTH_HEADER.substring(7);
            try{
                // Validate and parse the JWT token
                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(getSigningKey())
                        .build()
                        .parseClaimsJws(token)
                        .getBody();
                // Extract user details from the token
                // maybe check if user is already authenticated or not
                String username = claims.getSubject();
                // You can extract other user claims here as needed
                List<GrantedAuthority> authorities = extractAuthoritiesFromToken(claims);
                // Set user details in the security context
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(username, null, authorities);
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
             }catch (Exception e) {
                System.out.println("EXCEEEEPTIOOOOOONNNNNNNNNNNNNNN");
            }
         filterChain.doFilter(request, response);
    }

    private Key getSigningKey() {
        // Decode the secret key from Base64
        byte[] decodedKey = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(decodedKey);
    }

    private List<GrantedAuthority> extractAuthoritiesFromToken(Claims claims) {
        List<String> roles = (List<String>) claims.get("roles");
        if (roles != null || roles.size() != 0) {
           List<GrantedAuthority> auths =  roles.stream().map(
                    (String role) -> {
                       GrantedAuthority gauth =  new SimpleGrantedAuthority("ROLE_" + role);
                       return gauth;
                    }
            ).toList();
            return auths;
        } else {
            return Collections.emptyList();
        }
    }
}

