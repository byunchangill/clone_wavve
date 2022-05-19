package com.project.clone_wavve;

import com.project.clone_wavve.user.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpSession;

@Component
public class UserUtils {
    @Autowired
    private HttpSession hs;

    public void setLoginUser(UserEntity entity) {
        hs.setAttribute(Const.LOGIN_USER, entity);
    }

    public UserEntity getLoginUser() {
        return (UserEntity) hs.getAttribute(Const.LOGIN_USER);
    }

    public int getLoginUserPk() {
        UserEntity loginUser = getLoginUser();
        return loginUser == null ? 0 : loginUser.getIuser();
    }
}
