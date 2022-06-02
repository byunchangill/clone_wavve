package com.project.clone_wavve.user;

import com.project.clone_wavve.config.AuthenticationFacade;
import com.project.clone_wavve.config.ProviderType;
import com.project.clone_wavve.user.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationFacade auth;

    public int join(UserEntity entity) {
        // 비밀번호 암호화
        String hashedWpw = passwordEncoder.encode(entity.getW_pw());
        entity.setW_pw(hashedWpw);
        entity.setProvider(ProviderType.LOCAL.toString());
        try {
            return userMapper.insUser(entity);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    // 아이디 중복 확인
    public int idChk(String w_id) {
        UserEntity userEntity = new UserEntity();
        userEntity.setW_id(w_id);

        UserEntity result = userMapper.idChk(userEntity);
        return result == null ? 1 : 0;
    }

    //닉네임, 이미지 변경
    public int upNickname(UserEntity entity) {
        entity.setIuser(auth.getLoginUserPk());
        auth.getLoginUser().setW_nickname(entity.getW_nickname());
        int result = userMapper.upNickname(entity);
        return result;
    }
}
