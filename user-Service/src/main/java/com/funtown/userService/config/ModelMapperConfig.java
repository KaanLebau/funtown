package com.funtown.userService.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


/**
 * Configuration class for setting up model mapping in the application.
 * <p>
 * This class is responsible for providing a bean configuration for {@link ModelMapper}.
 * {@link ModelMapper} is a library that automates the process of mapping objects of one type into objects of another type.
 * It is particularly useful for mapping DTOs to entity classes and vice versa in a layered application architecture.
 * </p>
 */
@Configuration
public class ModelMapperConfig {

    /**
     * Creates and configures a {@link ModelMapper} bean to be used across the application.
     * <p>
     * The {@link ModelMapper} instance is configured with default settings, but can be customized
     * as needed by modifying this method.
     * </p>
     *
     * @return A new instance of {@link ModelMapper} for model mapping.
     */
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
    @Configuration
    public class CorsConfig implements WebMvcConfigurer {

        /**
         * Configures Cross-Origin Resource Sharing (CORS) for the application.
         * CORS defines a way in which a browser and server can interact to determine whether it is safe to allow the requested resource to be shared.
         *
         * @param registry the CorsRegistry to be configured
         */
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowCredentials(true);
        }
    }
}
