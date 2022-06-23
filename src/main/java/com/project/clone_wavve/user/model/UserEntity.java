package com.project.clone_wavve.user.model;

import lombok.*;


@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor // 파라미터가 없는 기본 생성자를 생성
@AllArgsConstructor // 모든 필드 값을 파라미터로 받는 생성자를 만듦
public class UserEntity {
    // 유저 넘버
    private long iuser;
    // 유저 아이디, 이메일
    private String w_id;
    // 유저 비밀번호
    private String w_pw;
    // 유저 등록 일시
    private String rdt;
    // 유저 수정 일시
    private String mdt;
    // 유저 가입 경로(로컬, 플랫폼)
    private String provider;
    // 유저 닉네임
    private String w_nickname;
    // 유저 프로필 이미지
    private String profileImg;
    // 유저 권한
    private String auth;
    // 유저 이름
    private String w_nm;
    // 유저 생일
    private String w_birthday;
    // 유저 성별
    private String w_gender;
    // 유저 폰 번호
    private String w_phone;
}