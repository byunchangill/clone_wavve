package com.project.clone_wavve.user;

import com.project.clone_wavve.UserUtils;
import com.project.clone_wavve.user.model.UserEntity;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserUtils userUtils;

    @Autowired
    PasswordEncoder passwordEncoder;

    public int join(UserEntity entity) {
        // 비밀번호 암호화
        String hashedWpw = passwordEncoder.encode(entity.getW_pw());
        entity.setW_pw(hashedWpw);
        try {
            return userMapper.insUser(entity);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    public int login(UserEntity entity) {
        UserEntity dbUser = null;
        try {
            dbUser = userMapper.selUser(entity);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }

        if(dbUser == null) {
            return 2;
        } else if(!BCrypt.checkpw(entity.getW_id(), dbUser.getW_pw())) {
            return 3;
        }
        dbUser.setW_pw(null);
        userUtils.setLoginUser(dbUser);
        return 1;
    }
}
