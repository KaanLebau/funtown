package com.funtown.userService.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Collections;

import static org.mockito.Mockito.when;

class JwtRequestFilterTest {
  /*  private JwtRequestFilter jwtRequestFilter;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private UserDetailsService userDetailsService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        jwtRequestFilter = new JwtRequestFilter(jwtUtil, userDetailsService);
    }

    @Test
    void doFilterInternalValidToken() throws Exception {
        UserDetails userDetails = new User("testUser", "testPass", Collections.emptyList());
        when(request.getHeader("Authorization")).thenReturn("Bearer token");
        when(jwtUtil.extractUsername("token")).thenReturn("testUser");
        when(userDetailsService.loadUserByUsername("testUser")).thenReturn(userDetails);
        when(jwtUtil.validateToken("token", userDetails)).thenReturn(true);

        // Need to find a way to check the authentication status of SecurityContextHolder after the method call.
        jwtRequestFilter.doFilterInternal(request, response, Mockito.mock(FilterChain.class));
    }*/

    // Test other scenarios similarly...
}