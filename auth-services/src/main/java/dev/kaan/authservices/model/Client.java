package dev.kaan.authservices.model;

import dev.kaan.authservices.config.AESConfig;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

/**
 *
 * this object represents a client and encapsulates the following information
 *<pre>
 *     {<br>
 *          id: <b>type: </b>Integer <b>contains:</b> primary key for database. <br>
 *          username: <b>type:</b> String <b>contains: </b>clients username in app.<br>
 *          password: <b>type: </b>String <b>contains:</b> clients password.<br>
 *          role: <b>type: </b>Enum <b>contains:</b> clients role in app.<br>
 *     }
 *
 *</pre>
 * <br>
 * which corresponds to the <b><i>client</i></b> table in the database.<br>
 *  the class <b>implements</b> <i>UserDetails</i> from spring security
 *@author Kaan<br>
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "client")
public class Client implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "username")
    //@Convert(converter = AESConfig.class)
    private String username;

    @Column(name = "password")
    private String password;


    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role ;

    /**
     *  Retrieves the authorities granted to the user.
     * @see org.springframework.security.core.userdetails.UserDetails
     * @return a collection of GrantedAuthority representing the user's authorities
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    /**
     *
     * <code><b>isAccountNonExpired()</b></code> Indicates whether the user's account has expired. <br>
     * <b>true: </b> signifies that the user's account is valid and has not expired.<br>
     * <b>false: </b> signifies that the user's account has expired and may require renewal or reactivation.
     * @return he state of the user's account expiration status.
     * @see org.springframework.security.core.userdetails.UserDetails
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * <code><b>isAccountNonLocked()</b></code> method indicates whether the user's account is locked.<br>
     * <b>true:</b> Signifies that the user's account is not locked and is accessible for use.<br>
     * <b>false:</b> Signifies that the user's account is locked, potentially due to security reasons or administrative actions,
     * and may require unlocking before further access is granted.<br>
     * @see org.springframework.security.core.userdetails.UserDetails
     * @return the state of the user's account lock status.
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     *<code><b>isCredentialsNonExpired()</b></code> method indicates whether the user's credentials (e.g., password) have expired.<br>
     * <b>true:</b> Signifies that the user's credentials are considered non-expired and are valid for authentication purposes.<br>
     * <b>false:</b> Signifies that the user's credentials have expired, typically indicating that the password needs to be changed or updated.<br>
     * @returnthe state of the user's credentials expiration status.
     * @see org.springframework.security.core.userdetails.UserDetails
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * <code><b>isEnabled()</b></code> method indicates whether the user's account is enabled.<br>
     * <b>true:</b> Signifies that the user's account is enabled and active, allowing them to access the system.<br>
     * <b>false:</b> Signifies that the user's account is disabled, possibly due to administrative actions or security reasons,
     * and access to the system is restricted until the account re-enabled.<br>
     * @return the state of the user's account activation status.
     * @see org.springframework.security.core.userdetails.UserDetails
     */
    @Override
    public boolean isEnabled() {
        return true;
    }
}
