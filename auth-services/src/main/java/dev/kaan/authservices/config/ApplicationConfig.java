package dev.kaan.authservices.config;

import dev.kaan.authservices.services.impl.ClientServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * The ApplicationConfig class is responsible for configuring the application's beans and defining the authentication provider and manager.
 *
 * It is annotated with @Configuration, indicating that it is a configuration class.
 * It is also annotated with @RequiredArgsConstructor, indicating that the constructor will be automatically generated with required arguments.
 */
@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {
    private final ClientServiceImpl personService;

    /**
     * The authenticationProvider method is responsible for creating and configuring the authentication provider
     * for the application. It returns an instance of AuthenticationProvider.
     *
     * The DaoAuthenticationProvider class is used to create an authentication provider that connects to a UserDetailsService
     * and PasswordEncoder to perform authentication. It sets the personService as the UserDetailsService and
     * uses the passwordEncoder method to set the PasswordEncoder. The authentication provider is then returned.
     *
     * @return An instance of AuthenticationProvider configured with the personService and passwordEncoder.
     */
    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(personService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    /**
     * The authenticationManager method is responsible for retrieving the authentication manager
     * from the provided AuthenticationConfiguration object.
     *
     * @param authenticationConfiguration The AuthenticationConfiguration object from which to retrieve the authentication manager.
     * @return The AuthenticationManager object.
     * @throws Exception If an exception occurs while retrieving the authentication manager.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    /**
     * The passwordEncoder method is responsible for creating and configuring the password encoder used for authentication in the application.
     * It returns an instance of the PasswordEncoder interface, specifically a BCryptPasswordEncoder.
     *
     * The BCryptPasswordEncoder is a widely used password encoder that uses the bcrypt hashing algorithm. It is considered secure
     * because it incorporates a salt and a work factor, making it computationally expensive to crack passwords.
     *
     * @return An instance of the PasswordEncoder interface, specifically a BCryptPasswordEncoder.
     */
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

}
