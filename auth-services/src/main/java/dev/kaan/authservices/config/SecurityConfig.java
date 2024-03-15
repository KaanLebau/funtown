package dev.kaan.authservices.config;

import dev.kaan.authservices.filter.JwtAuthenticationFilter;
import dev.kaan.authservices.services.impl.ClientServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


/**
 * This class represents the configuration for the security of the application.
 * It is responsible for defining the security filters and rules for different endpoints.
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter JWT_AUTH_FILTER;
    private final AuthenticationProvider AUTHENTICATION_PROVIDER;
    private final PasswordEncoder PASSWORD_ENCODER;
    private final ClientServiceImpl PERSON_SERVICE;
    /**
     * This method creates a SecurityFilterChain object for configuring the security of the application.
     * It configures the security filters and rules for different endpoints.
     *
     * @param http the HttpSecurity object to configure
     * @return the created SecurityFilterChain object
     * @throws Exception if an exception occurs during configuration
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf-> csrf.disable())
                .authorizeHttpRequests(
                        auth    ->
                                auth.requestMatchers("/api/v1/auth/authenticate/**", "/api/v1/auth/registration")
                                        .permitAll()
                                        .anyRequest()
                                        .authenticated()
                ).userDetailsService(PERSON_SERVICE)
                .sessionManagement(
                        session     ->
                                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                        )
                .addFilterBefore(JWT_AUTH_FILTER, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

}
