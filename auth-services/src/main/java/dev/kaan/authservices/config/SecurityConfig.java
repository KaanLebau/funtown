package dev.kaan.authservices.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    //private final JwtAuthenticationFilter JWT_AUTH_FILTER;
    //private final AuthenticationProvider AUTHENTICATION_PROVIDER;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
/*
                http
                        .csrf(csrfConfigurer -> csrfConfigurer.disable())
                        .authorizeHttpRequests()
                        .requestMatchers("/api/v1/auth/**")
                        .permitAll()
                        .anyRequest()
                        .authenticated()
                        .and()
                        .sessionManagement()
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                        .and()
                        .authenticationProvider(AUTHENTICATION_PROVIDER)
                        .addFilterBefore( JWT_AUTH_FILTER, UsernamePasswordAuthenticationFilter.class);
*/

        return http.build();
    }
}
