package com.project.clone_wavve.user;

import com.project.clone_wavve.common.MyConst;
import com.project.clone_wavve.user.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private MyConst myConst;

    @GetMapping("/login")
    public void login() {
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

    // id 중복 체크(회원가입)
    @GetMapping("/idChk/{w_id}")
    @ResponseBody
    public Map<String, Integer> idChk(@PathVariable String w_id) {
        Map<String, Integer> res = new HashMap();
        res.put("result", userService.idChk(w_id));
        return res;
    }

    @GetMapping("/profile")
    public void profile() {

    }

    @ResponseBody
    @PostMapping("/profile")
    public int profile(@RequestBody UserEntity entity) {
       return userService.upNickname(entity);
    }
}
