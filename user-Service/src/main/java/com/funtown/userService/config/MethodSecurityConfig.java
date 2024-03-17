package com.funtown.userService.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.GlobalMethodSecurityConfiguration;

/**
 * This class is a configuration class for method-level security in Spring Security. It extends the
 * GlobalMethodSecurityConfiguration class and enables various method-level security options.
 *
 * <p>The MethodSecurityConfig class is annotated with @Configuration, indicating that it declares one or
 * more Spring beans. It is also annotated with @EnableGlobalMethodSecurity, which enables method-level
 * security in the application.
 *
 * <p>The @EnableGlobalMethodSecurity annotation has three attributes: prePostEnabled, securedEnabled, and
 * jsr250Enabled. When set to true, each of these attributes enables a specific type of method-level
 * security.
 *
 * <p>{@code prePostEnabled = true} enables the use of @PreAuthorize and @PostAuthorize annotations for
 * pre- and post-authorizations respectively.
 *
 * <p>{@code securedEnabled = true} enables the use of the @Secured annotation for authorization.
 *
 * <p>{@code jsr250Enabled = true} enables the use of the JSR 250 annotations for authorization. The
 * supported annotations are @RolesAllowed, @PermitAll, and @DenyAll.
 */
@Configuration
@EnableGlobalMethodSecurity(
        prePostEnabled = true,
        securedEnabled = true,
        jsr250Enabled = true)
public class MethodSecurityConfig
        extends GlobalMethodSecurityConfiguration {
}