package dev.kaan.authservices.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;


public interface JwtService {



    /**
     * Retrieves the username from the provided JWT token.
     *
     * @param jwtToken the JWT token from which to extract the username
     * @return the username extracted from the JWT token
     */
  String getUsername(String jwtToken);

    /**
     * Generates a JWT token for the provided UserDetails.
     *
     * <p>
     *   The token is set to expire after one minute by default.
     *   </p>
     *
     * @param userDetails the UserDetails object for which to generate the token
     * @return the generated JWT token
     */
  String generateToken( UserDetails userDetails);


    /**
     *  <p>
     *  This method generates a JWT token for the provided UserDetails object with additional
     *  custom claims specified in the extraClaims parameter.
     *  </p>
     *
     *  <p>
     *  The token is set to expire after one minute by default.
     *  </p>
     *
     * @param extraClaims additional custom claims to include in the JWT token
     * @param userDetails the UserDetails object for which to generate the token
     * @return the generated JWT token with additional custom claims
     */
  String generateToken(Map<String, Object> extraClaims, UserDetails userDetails);

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
    String generateRefreshToken(UserDetails userDetails);

    /**
     * Validates whether the provided JWT token is valid for the given UserDetails.
     *
     * @param jwtToken the JWT token to validate
     * @param userDetails the UserDetails object against which to validate the token
     * @return true if the token is valid for the UserDetails, otherwise false
     */
   boolean isTokenValid(String jwtToken, UserDetails userDetails);

   /**
     * Retrieves a specific claim from the provided JWT token.
     *
     * @param jwtToken the JWT token from which to extract the claim
     * @param claimsTFunction a function to process and extract the desired claim from the token's payload
     * @param <T> the type of the claim to retrieve
     * @return the extracted claim from the JWT token
     */
   <T> T getClaim(String jwtToken, Function<Claims, T> claimsTFunction);

}