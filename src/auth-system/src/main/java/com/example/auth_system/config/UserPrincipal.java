package com.example.auth_system.config;

import com.example.auth_system.entity.User;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Data
public class UserPrincipal implements UserDetails {

    private String id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private Collection<? extends GrantedAuthority> authorities;

    public UserPrincipal(String id, String email, String password, String firstName,
                         String lastName, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.authorities = authorities;
    }

    public static UserPrincipal build(User user) {
        // 👇 Add "ROLE_" prefix for Spring Security compatibility
        String roleName = "ROLE_" + user.getRole().getRoleName();

        return new UserPrincipal(
                String.valueOf(user.getUserId()),
                user.getEmail(),
                user.getPassword(),
                user.getFirstName(),
                user.getLastName(),
                Collections.singletonList(new SimpleGrantedAuthority(roleName))
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Customize if needed
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Customize if needed
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Customize if needed
    }

    @Override
    public boolean isEnabled() {
        return true; // Customize if needed
    }
}