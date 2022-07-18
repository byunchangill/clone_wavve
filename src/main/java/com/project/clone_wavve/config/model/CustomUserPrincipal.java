package com.project.clone_wavve.config.model;

import com.project.clone_wavve.user.model.UserEntity;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

public class CustomUserPrincipal implements OAuth2User, UserDetails {
    @Getter
    private UserEntity user;

    public CustomUserPrincipal(UserEntity user) {
        this.user = user;
    }

    public static CustomUserPrincipal create(UserEntity user) {
        return new CustomUserPrincipal(user);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"));
    }

    public Map<String, Object> getAttributes() {
        return null;
    }

    @Override
    public String getPassword() {
        return user.getW_pw();
    }

    @Override
    public String getUsername() {
        return user.getW_id();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getName() {
        return user.getW_nm();
    }
}
