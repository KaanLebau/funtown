package com.funtown.userService.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;
import java.util.function.Function;

/**
 * A utility class for performing common JWT operations.
 *
 * <p>Encapsulates all methods for manipulating JSON Web Tokens (JWTs), such as methods
 * for validating tokens, extracting claims and usernames from tokens, and checking if tokens are expired.
 * This class is designed specifically for handling JWT-based user authentication in the application.</p>
 */
@Setter
@Getter
@Component
public class JwtUtil {

    /**
     * -- GETTER --
     *  Gets the secret key used for JWT token processing.
     *
     *
     * -- SETTER --
     *  Sets the secret key to be used for JWT token processing.
     *
     @return the secret key
      * @param secretKey the secret key to set
     */
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
    Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    public String extractUsername(String token) {
        String username = extractClaim(token, Claims::getSubject);
        logger.debug("Extracted username from token: {}", username);
        return username;
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
     * Method to validate the token against the user's details.
     *
     * <p>This method checks whether the token has expired, and whether the username in the token
     * matches the username from the provided user details. This is necessary for ensuring that the token
     * is both fresh and corresponds to the correct user.</p>
     *
     * @param token the JWT token to validate
     * @param userDetails UserDetails object containing the details of the user to validate against
     * @return Boolean true if the token corresponds to the user and is not expired, false otherwise
     */
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        if(isTokenExpired(token)) {
            logger.debug("NOOOOOOOOOO");
        }
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