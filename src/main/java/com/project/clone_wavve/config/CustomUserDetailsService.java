package com.project.clone_wavve.config;

import com.project.clone_wavve.config.model.CustomUserPrincipal;
import com.project.clone_wavve.user.UserMapper;
import com.project.clone_wavve.user.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserMapper mapper;

    @Override
    public UserDetails loadUserByUsername(String w_id) throws UsernameNotFoundException {
        UserEntity param = new UserEntity();
        param.setW_id(w_id);
        param.setProvider(ProviderType.LOCAL.toString());

//        UserEntity savedUser = mapper.selUser(param);
        UserEntity savedUser = mapper.findByEmail(param);
        if(savedUser == null) {
            throw new UsernameNotFoundException(" 유저를 찾을 수가 없습니다. ");
        }
        return CustomUserPrincipal.create(savedUser);
    }
}
