package com.project.clone_wavve.user;

import com.project.clone_wavve.config.AuthenticationFacade;
import com.project.clone_wavve.config.ProviderType;
import com.project.clone_wavve.user.model.EmailDto;
import com.project.clone_wavve.user.model.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationFacade auth;

    private final JavaMailSender javaMailSender;

    // 이메일 인증
    public void mailSend(EmailDto emailDto){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(emailDto.getAddress());
        message.setSubject(emailDto.getTitle());
        message.setText(emailDto.getMessage());
        javaMailSender.send(message);

        System.out.println(emailDto.getMessage());
    }

    // 회원가입
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

    // 프로필이미지, 닉네임 변경
    public int upUser(UserEntity entity) {
        entity.setIuser(auth.getLoginUserPk());

        auth.getLoginUser().setW_nickname(entity.getW_nickname());
        auth.getLoginUser().setProfileImg(entity.getProfileImg());

        int result = userMapper.upUser(entity);
        if (result == 1) {
            entity.setW_nickname(entity.getW_nickname());
            entity.setProfileImg(entity.getProfileImg());
        }
        return result;
    }

    // 이름, 생일, 성별, 폰번호 변경
    public int changeUser(UserEntity entity) {
        entity.setIuser(auth.getLoginUserPk());

        auth.getLoginUser().setW_nm(entity.getW_nm());
        auth.getLoginUser().setW_birthday(entity.getW_birthday());
        auth.getLoginUser().setW_gender(entity.getW_gender());
        auth.getLoginUser().setW_phone(entity.getW_phone());

        int result = userMapper.changeUser(entity);
        if (result == 1) {
            entity.setW_nm(entity.getW_nm());
            entity.setW_birthday(entity.getW_birthday());
            entity.setW_gender(entity.getW_gender());
            entity.setW_phone(entity.getW_phone());
        }
        return result;
    }

    // 비밀번호 변경
    public int changePw(UserEntity entity) {
        entity.setIuser(auth.getLoginUserPk());
        // 비밀번호 암호화
        String hashedWpw = passwordEncoder.encode(entity.getW_pw());
        entity.setW_pw(hashedWpw);

        return userMapper.changePw(entity);
    }

    // 이메일(아이디) 변경
    public int changeEmail(UserEntity entity) {
        entity.setIuser(auth.getLoginUserPk());
        auth.getLoginUser().setW_id(entity.getW_id());

        int result = userMapper.changeEmail(entity);

        if (result == 1) {
            entity.setW_id(entity.getW_id());
        }
        return result;
    }
}
