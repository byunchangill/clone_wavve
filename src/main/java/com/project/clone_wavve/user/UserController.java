package com.project.clone_wavve.user;

import com.project.clone_wavve.common.MyConst;
import com.project.clone_wavve.user.model.UserEntity;
import com.project.clone_wavve.user.model.UserVo;
import lombok.RequiredArgsConstructor;
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
    private final MyConst myConst;

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
    @ResponseBody
    public Map<String, Integer> meProc(@RequestBody UserVo vo) {
        Map<String, Integer> res = new HashMap();
        res.put("wpw", userService.pwChk(vo));
        return res;
    }

    @GetMapping("/change")
    public void change() {}
}
