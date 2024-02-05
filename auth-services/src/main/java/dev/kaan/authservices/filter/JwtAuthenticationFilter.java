package dev.kaan.authservices.filter;

import dev.kaan.authservices.services.JwtService;
import dev.kaan.authservices.services.impl.ClientServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
/**
 * JwtAuthenticationFilter is responsible for intercepting incoming HTTP requests and
 * processing JWT (JSON Web Token) authentication.<br>
 *<br>
 * This filter extends OncePerRequestFilter, ensuring that it is only invoked once per request.
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService JWT_SERVICE;
    private final ClientServiceImpl PERSON_SERVICE;

    /**
     * Performs filtering of incoming HTTP requests and handles JWT authentication.
     *
     * <p>
     * This method intercepts incoming HTTP requests and checks for the presence of a JWT (JSON Web Token)
     * in the "Authentication" header.<br>
     *
     *
     *
     * If a valid JWT is found, it authenticates the user and sets the
     * authentication token in the SecurityContext.
     * </p>
     *
     * <p>
     * If no valid JWT is found or the user is already authenticated, the request is passed to the next filter
     * in the filter chain.
     * </p>
     *  @see org.springframework.web.filter.OncePerRequestFilter
     * @param request the HttpServletRequest object representing the incoming HTTP request
     * @param response the HttpServletResponse object representing the outgoing HTTP response
     * @param filterChain the FilterChain object for invoking the next filter in the chain
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs during the filter processing
     */
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,@NonNull HttpServletResponse response,@NonNull FilterChain filterChain) throws ServletException, IOException {
        final String AUTH_HEADER = request.getHeader("Authentication");
        final String JWT_TOKEN;
        final String USERNAME;
        if(AUTH_HEADER == null || !AUTH_HEADER.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
            return;
        }
        JWT_TOKEN = AUTH_HEADER.substring(7);
        USERNAME = JWT_SERVICE.getUsername(JWT_TOKEN);
        // username provided NOT Authenticated
        if((USERNAME != null) && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails userDetails = this.PERSON_SERVICE.loadUserByUsername(USERNAME);// get user data from database
            if(JWT_SERVICE.isTokenValid(JWT_TOKEN, userDetails)){ //checks if user or token is vaild or not
                // creates authenticaton token
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authenticationToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
        filterChain.doFilter(request,response);
    }
}
