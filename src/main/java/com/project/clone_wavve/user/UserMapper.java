package com.project.clone_wavve.user;

import com.project.clone_wavve.user.model.UserEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    int insUser(UserEntity entity);
    UserEntity selUser(UserEntity entity);
    UserEntity idChk(UserEntity entity);
    int upNickname(UserEntity entity);


}
