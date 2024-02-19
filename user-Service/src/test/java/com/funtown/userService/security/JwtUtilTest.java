package com.funtown.userService.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collections;
import java.util.Date;
import java.util.function.Function;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class JwtUtilTest {

    private JwtUtil jwtUtil;

    @Mock
    private UserDetails userDetails;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil();
        jwtUtil.setSecretKey("MySecretKey");
        userDetails = new User("testUser", "testPass", Collections.emptyList());
    }

    @Test
    void testExtractAllClaims_WithValidToken() {
        Claims claimsMock = mock(Claims.class);
        when(claimsMock.getSubject()).thenReturn(userDetails.getUsername());
        String token = Jwts.builder().setClaims(claimsMock).signWith(jwtUtil.getSecretKey()).compact();

        try {
            Claims claims = jwtUtil.extractAllClaims(token);

            assertNotNull(claims);
            assertEquals(userDetails.getUsername(), claims.getSubject());
        } catch (SignatureException e) {
            fail("Exception should not have been thrown");
        }
    }

    @Test
    void testExtractUsername_WithValidToken() {
        Claims claimsMock = mock(Claims.class);
        when(claimsMock.getSubject()).thenReturn(userDetails.getUsername());

        String token = Jwts.builder().setClaims(claimsMock).signWith(jwtUtil.getSecretKey()).compact();
        String username = jwtUtil.extractUsername(token);

        assertEquals(userDetails.getUsername(), username);
    }

    @Test
    void testIsTokenExpired_WithExpiredToken() {
        Claims claimsMock = mock(Claims.class);
        when(claimsMock.getExpiration()).thenReturn(new Date(System.currentTimeMillis() - 60000));

        String token = Jwts.builder().setClaims(claimsMock).signWith(jwtUtil.getSecretKey()).compact();
        boolean isExpired = jwtUtil.isTokenExpired(token);

        assertTrue(isExpired);
    }

    @Test
    void testValidateToken_WithValidToken() {
        Claims claimsMock = mock(Claims.class);
        when(claimsMock.getSubject()).thenReturn(userDetails.getUsername());
        when(claimsMock.getExpiration()).thenReturn(new Date(System.currentTimeMillis() + 60000));

        String token = Jwts.builder().setClaims(claimsMock).signWith(jwtUtil.getSecretKey()).compact();
        boolean isValid = jwtUtil.validateToken(token, userDetails);

        assertTrue(isValid);
    }

    @Test
    void testInit_WithEmptyKey() {
        jwtUtil.setSecretKey("");

        assertThrows(IllegalArgumentException.class, jwtUtil::init);
    }
}