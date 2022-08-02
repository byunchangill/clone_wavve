package com.project.clone_wavve.user;

import com.project.clone_wavve.user.model.UserEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    int insUser(UserEntity entity); // 회원가입.
    UserEntity idChk(UserEntity entity); // 아이디 체크.
    int upUser(UserEntity entity); // 닉네임, 이미지 변경.
    int changeUser(UserEntity entity); // 이름, 생일, 성별, 폰번호 변경.
    int changePw(UserEntity entity); // 비밀번호 변경.
    int changeEmail(UserEntity entity); // 이메일(아이디) 변경.
    UserEntity findByEmail(UserEntity entity); // 소셜 로그인

}
