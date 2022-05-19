package com.project.clone_wavve.user;

import com.project.clone_wavve.user.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public void login() {
    }

    @PostMapping("/login")
    public String loginPost(UserEntity entity){
            int result = userService.login(entity);
            System.out.println("result : " + result);
            return "redirect:/";
    }

    @GetMapping("/join")
    public void join() {
    }

    @PostMapping("/join")
    public String joinProc(UserEntity userEntity) {
        System.out.println(userEntity);
        int result = userService.join(userEntity);
        return "redirect:login";
    }
}
