package com.funtown.userService.config;

import com.funtown.userService.security.JwtRequestFilter;
import com.funtown.userService.security.JwtUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Security configuration class for JWT based Spring Security application.
 * <p>
 * This configuration secures the application by configuring HTTPSecurity to
 * require authentication for certain requests, specifying how users are loaded
 * for authentication, and defining how passwords are encoded.
 * </p>
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    /**
     * Constructs a new SecurityConfig with the given JwtUtil and UserDetailsService.
     *
     * @param jwtUtil the JWT utility class for token generation and validation
     * @param userDetailsService the service to load user-specific data
     */
    public SecurityConfig(JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    /**
     * Defines the password encoder to be used for encoding and decoding passwords in the application.
     *
     * @return a BCryptPasswordEncoder instance
     */
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Configures the authentication provider to be used by Spring Security.
     * <p>
     * This method configures a DaoAuthenticationProvider with the custom userDetailsService
     * and the password encoder defined in this configuration class.
     * </p>
     *
     * @return an instance of DaoAuthenticationProvider
     */
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    /**
     * Configures the security filter chain to specify custom security settings.
     * <p>
     * This includes disabling CSRF protection, setting session management to stateless, and
     * adding custom JWT request filter for API authentication/authorization.
     * </p>
     *
     * @param http HttpSecurity to configure
     * @return the SecurityFilterChain after configuration
     * @throws Exception if an error occurs during configuration
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth ->
                        auth.requestMatchers("/api/public/**")
                                .permitAll()
                                .anyRequest().authenticated())
                .formLogin(form -> form.loginProcessingUrl("/login"))
                .logout(logout -> logout.logoutUrl("/logout"))
                .addFilterBefore(jwtRequestFilter(), UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }

    /**
     * Creates a JWT request filter bean.
     * <p>
     * The filter intercepts HTTP requests to validate JWT tokens and perform authentication.
     * </p>
     *
     * @return a JwtRequestFilter instance
     */
    @Bean
    public JwtRequestFilter jwtRequestFilter() {
        return new JwtRequestFilter(jwtUtil, userDetailsService);
    }
}
