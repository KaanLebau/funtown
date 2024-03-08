package com.funtown.availabilityService.config;

import com.funtown.availabilityService.filter.JwtTokenFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


/**
 * The SecurityConfig class is responsible for configuring the security settings in the application.
 * It is annotated with @Configuration and @EnableWebSecurity to enable the Spring Security configuration.
 *
 * The class accepts an instance of JwtTokenFilter through constructor injection.
 * JwtTokenFilter is responsible for handling JWT authentication.
 *
 * The SecurityConfig class provides a securityFilterChain bean, which configures the security filter chain for the application.
 * It disables the CSRF protection and adds the JwtTokenFilter before the UsernamePasswordAuthenticationFilter.
 *
 * Example usage:
 *
 * ```java
 * @Configuration
 * @EnableWebSecurity
 * @RequiredArgsConstructor
 * public class SecurityConfig {
 *     private final JwtTokenFilter jwtTokenFilter;
 *
 *     @Bean
 *     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
 *         return http.csrf(csrf -> csrf.disable())
 *                 .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
 *                 .build();
 *     }
 * }
 * ```
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtTokenFilter jwtTokenFilter;

    /**
     * Returns a configured SecurityFilterChain for the application.
     *
     * The SecurityFilterChain is responsible for configuring the security filter chain.
     * It disables CSRF protection and adds a JwtTokenFilter before the UsernamePasswordAuthenticationFilter.
     *
     * @param http the HttpSecurity object used for configuring security
     * @return the configured SecurityFilterChain
     * @throws Exception if an error occurs during configuration
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.csrf(csrf-> csrf.disable())
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
