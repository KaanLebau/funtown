package com.funtown.userService.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.function.Function;

/**
 * Utility class for common JWT operations.
 * <p>
 * This class provides methods for extracting information from JWT tokens,
 * such as claims, username, and expiration, and for validating tokens against
 * user details.
 * </p>
 */
@Component
public class JwtUtil {

    @Value("${application.security.jwt.secret-key}")
    private String secretKey;


    /**
     * Extracts all claims from the token using the secret key.
     *
     * @param token the JWT token to parse
     * @return Claims the claims extracted from the token
     * @throws SignatureException if the token signature validation fails
     */
    public Claims extractAllClaims(String token) throws SignatureException {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }

    /**
     * Extracts the username (subject) from the token.
     *
     * @param token the JWT token
     * @return String the username extracted from the token
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Extracts the expiration date from the token.
     *
     * @param token the JWT token
     * @return Date the expiration date of the token
     */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Generic method to extract a claim from the token.
     *
     * @param token          the JWT token
     * @param claimsResolver the function to apply to the claims
     * @param <T>            the type of the claim to extract
     * @return T the claim value
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Checks if the token is expired.
     *
     * @param token the JWT token
     * @return Boolean true if the token has expired, false otherwise
     */
    private Boolean isTokenExpired(String token) {
        final Date expiration = extractExpiration(token);
        return expiration.before(new Date());
    }

    /**
     * Validates the token against user details.
     * <p>
     * This method checks if the token is expired and if the username in the token matches
     * the username in the provided user details.
     * </p>
     *
     * @param token       the JWT token
     * @param userDetails the user details to validate against
     * @return Boolean true if the token is valid, false otherwise
     */
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return !isTokenExpired(token) && username.equals(userDetails.getUsername());
    }
    @PostConstruct
    private void init() {
        if (this.secretKey == null || this.secretKey.trim().isEmpty()) {
            throw new IllegalArgumentException("JWT secret key must not be null or empty.");
        }
        // Additional validation logic here
    }
}
