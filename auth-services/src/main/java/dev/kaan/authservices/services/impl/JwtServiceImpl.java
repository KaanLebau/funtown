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

@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService {
    @Value("${application.security.jwt.secret-key}")
    private String SECRET_KEY;
    @Value("${application.security.jwt.expiration}")
    private long tokenExpiration;
    @Value("${application.security.jwt.refresh-token.expiration}")
    private long tokenRefreshExpiration;

    public String generateToken( UserDetails userDetails){
        return tokenGenerator(userDetails,tokenExpiration);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return tokenGenerator(userDetails, tokenRefreshExpiration);
    }
    public boolean isTokenValid(String jwtToken, UserDetails userDetails){
        final String USERNAME = getUsername(jwtToken);
        return USERNAME.equals(userDetails.getUsername()) && !isTokenExpired(jwtToken);
    }
    public String getUsername(String jwtToken) {
        return getClaim(jwtToken, Claims::getSubject);
    }


    //************** Private methods *****************
    //
    //
    //************************************************

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

    public <T> T getClaim(String jwtToken, Function<Claims, T> claimsTFunction){
        final Claims CLAIMS = getAllClaims(jwtToken);
        return claimsTFunction.apply(CLAIMS);
    }

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
