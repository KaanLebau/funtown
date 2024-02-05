package dev.kaan.authservices.model;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;

import static org.junit.jupiter.api.Assertions.*;

class ClientTest {
    @Test
    void testGetAuthorities() {
        Client client = new Client();
        client.setRole(Role.RECRUITER);
        Collection<? extends GrantedAuthority> authorities = client.getAuthorities();

        assertEquals(1, authorities.size());
        assertTrue(authorities.contains(new SimpleGrantedAuthority("RECRUITER")));
    }

    @Test
    void testIsAccountNonExpired() {
        Client client = new Client();
        boolean accountNonExpired = client.isAccountNonExpired();

        assertTrue(accountNonExpired);
    }

    @Test
    void testIsAccountNonLocked() {
        Client client = new Client();
        boolean accountNonLocked = client.isAccountNonLocked();

        assertTrue(accountNonLocked);
    }

    @Test
    void testIsCredentialsNonExpired() {
        Client client = new Client();
        boolean credentialsNonExpired = client.isCredentialsNonExpired();

        assertTrue(credentialsNonExpired);
    }

    @Test
    void testIsEnabled() {
        Client client = new Client();
        boolean enabled = client.isEnabled();

        assertTrue(enabled);
    }

}