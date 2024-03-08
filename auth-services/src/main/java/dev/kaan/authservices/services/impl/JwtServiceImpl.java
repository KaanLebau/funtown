package dev.kaan.authservices.services.impl;

import dev.kaan.authservices.services.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.security.core.GrantedAuthority;
import java.security.Key;
import java.util.Date;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * The JwtServiceImpl class provides implementations of methods for JWT token generation,
 * validation, and extraction of claims.
 */
@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService {
    @Value("${application.security.jwt.secret-key}")
    private String SECRET_KEY;
    @Value("${application.security.jwt.expiration}")
    private long tokenExpiration;
    @Value("${application.security.jwt.refresh-token.expiration}")
    private long tokenRefreshExpiration;

    /**
     * Generates a JWT token for the provided UserDetails.
     * The token is set to expire after a given time period.
     *
     * @param userDetails the UserDetails object for which to generate the token
     * @return the generated JWT token
     */
    public String generateToken( UserDetails userDetails){
        return tokenGenerator(userDetails,tokenExpiration);
    }

    /**
     * Generates a refresh token for the provided UserDetails with a default refresh time of one day.
     *
     * <p>
     * This method generates a refresh token for the provided UserDetails object,
     * which can be used for refreshing access tokens after they expire.
     * </p>
     *
     * <p>
     * By default, the refresh token is set to expire after one day.
     * </p>
     *
     * @param userDetails the UserDetails object for which to generate the refresh token
     * @return the generated refresh token
     */
    public String generateRefreshToken(UserDetails userDetails) {
        return tokenGenerator(userDetails, tokenRefreshExpiration);
    }
    /**
     * Validates whether the provided JWT token is valid for the given UserDetails.
     *
     * @param jwtToken the JWT token to validate
     * @param userDetails the UserDetails object against which to validate the token
     * @return true if the token is valid for the UserDetails, otherwise false
     */
    public boolean isTokenValid(String jwtToken, UserDetails userDetails){
        final String USERNAME = getUsername(jwtToken);
        return USERNAME.equals(userDetails.getUsername()) && !isTokenExpired(jwtToken);
    }
    /**
     * Retrieves the username from the provided JWT token.
     *
     * @param jwtToken the JWT token from which to extract the username
     * @return the username extracted from the JWT token
     */
    public String getUsername(String jwtToken) {
        return getClaim(jwtToken, Claims::getSubject);
    }


    //************** Private methods *****************
    //
    //
    //************************************************

    /**
     * Generates a JWT token for the provided UserDetails.
     *
     * @param userDetails the UserDetails object for which to generate the token
     * @param expiration the expiration time (in milliseconds) for the token
     * @return the generated JWT token
     */
    private String tokenGenerator(UserDetails userDetails, long expiration){
        return Jwts
                .builder()
                .setSubject(userDetails.getUsername())
                .claim("roles", userDetails.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList()))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey())
                .compact();
    }
    private boolean isTokenExpired(String jwtToken) {
        return getExpirationDate(jwtToken).before(new Date());
    }

    /**
     * Retrieves a specific claim from the provided JWT token.
     *
     * @param jwtToken          the JWT token from which to extract the claim
     * @param claimsTFunction   a function to process and extract the desired claim from the token's payload
     * @param <T>               the type of the claim to retrieve
     * @return the extracted claim from the JWT token
     */
    public <T> T getClaim(String jwtToken, Function<Claims, T> claimsTFunction){
        final Claims CLAIMS = getAllClaims(jwtToken);
        return claimsTFunction.apply(CLAIMS);
    }

    /**
     * Retrieves all the claims from the provided JWT token.
     *
     * @param jwtToken the JWT token from which to retrieve the claims
     * @return the Claims object containing all the claims from the JWT token
     */
    public Claims getAllClaims(String jwtToken){
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(jwtToken)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Date getExpirationDate(String jwtToken){
        return getClaim(jwtToken, Claims::getExpiration);
    }

}
