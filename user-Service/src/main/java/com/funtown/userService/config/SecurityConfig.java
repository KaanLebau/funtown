package com.funtown.userService.config;

import com.funtown.userService.security.JwtRequestFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Security configuration class for JWT-based authentication in a Spring Boot application.
 * This configuration adapts to the Spring Security 6 updates, ensuring compliance with
 * stateless security requirements for REST APIs.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtRequestFilter jwtRequestFilter;
    /**
     * Constructor for SecurityConfig that initializes the JwtRequestFilter.
     *
     * @param jwtRequestFilter Filter that processes JWT tokens for authentication.
     */
    public SecurityConfig(JwtRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter;
    }
    /**
     * Password encoder bean that uses BCrypt hashing algorithm.
     * It is defined as a bean to be used across the application for encoding passwords.
     *
     * @return A password encoder that uses the BCrypt hashing function.
     */
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    /**
     * Configures the security filter chain for the application.
     * It disables CSRF as it is not needed for stateless APIs, configures request matcher
     * to specify public and protected endpoints, and integrates the custom JwtRequestFilter
     * to handle JWT token-based authentication.
     *
     * @param http HttpSecurity to configure.
     * @return A SecurityFilterChain that enforces the specified security configurations.
     * @throws Exception if an error occurs during the configuration.
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeRequests(authorize -> authorize
                        .requestMatchers("/api/v1/persons/**","/api/v1/competenceprofiles**","/api/v1/competence**").permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                .httpBasic(httpBasic -> httpBasic.disable())
                .formLogin(form -> form.disable())
                .logout(logout -> logout.disable());

        return http.build();
    }
}