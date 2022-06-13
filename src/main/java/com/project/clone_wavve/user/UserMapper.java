package com.project.clone_wavve.user;

import com.project.clone_wavve.user.model.UserEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    int insUser(UserEntity entity); // 회원가입
    UserEntity selUser(UserEntity entity); // 조회
    UserEntity idChk(UserEntity entity); // 아이디 체크
    UserEntity pwChk(UserEntity entity); // 비밀번호 체크
    int upUser(UserEntity entity); // 닉네임, 이미지 변경
}
