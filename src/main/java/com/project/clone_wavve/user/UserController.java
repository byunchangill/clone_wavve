package com.project.clone_wavve.user;

import com.project.clone_wavve.common.MyConst;
import com.project.clone_wavve.config.model.CustomUserPrincipal;
import com.project.clone_wavve.user.model.UserEntity;
import com.project.clone_wavve.user.model.UserVo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final PasswordEncoder encoder;

    @GetMapping("/login")
    public void login() {
    }

    @PostMapping("/login")
    public String loginPost(HttpServletRequest rq, RedirectAttributes ra){
        ra.addFlashAttribute("error",rq.getAttribute("error"));
        return "redirect:/user/login";
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

    //profile 변경
    @GetMapping("/profile")
    public void profile() {
    }
    @ResponseBody
    @PostMapping("/profile")
    public int profileProc(@RequestBody UserEntity entity) {
        return userService.upUser(entity);
    }

    // 비밀번호 체크
    @GetMapping("/me")
    public void me() {

    }

    @PostMapping("/me")
    public String me(Authentication auth, @RequestParam String w_pw) {
        CustomUserPrincipal user = (CustomUserPrincipal) auth.getPrincipal();
        String userPw = user.getUser().getW_pw();
        if (encoder.matches(w_pw, userPw)) {
            // 비밀번호 일치시
            return "redirect:/user/change";
        } else {
            // 비밀번호 틀릴시
            return "redirect:/user/me";
        }
    }

    @GetMapping("/change")
    public void change() {}
}
