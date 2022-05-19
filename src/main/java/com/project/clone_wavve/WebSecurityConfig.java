package com.project.clone_wavve;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().disable() // cors 제거
                .csrf().disable() // csrf 제거
                .authorizeRequests()
                .antMatchers(              //로그인과 상관없이 매칭.
                        "/user/mypage" ,"/user/nickname","/jmt/review/**"
                )//로그인 안됐을때 못들어가게
                .authenticated()// 위 주소창들은 인증authenitcated을 받아야한다.
                .anyRequest().permitAll()//나머지는 다 통과

                .and() //그대로 이 값(http)를 사용하겠다

                .formLogin().disable(); //세큐리티 로그인 폼 제거

        http.logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/user/logout"))
                .invalidateHttpSession(true)
                .logoutSuccessUrl("/")
                .permitAll();
    }

    @Override
    public void configure(WebSecurity web){
        web.ignoring().antMatchers("/css/**","/js/**","/imgs/**","/font/**","/video/**","/error","favicon.ico");
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
