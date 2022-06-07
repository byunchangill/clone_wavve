package com.project.clone_wavve.user.model;

import lombok.*;


@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor // 파라미터가 없는 기본 생성자를 생성
@AllArgsConstructor // 모든 필드 값을 파라미터로 받는 생성자를 만듦
public class UserEntity {
    private long iuser;
    private String w_id;
    private String w_pw;
    private String rdt;
    private String mdt;
    private String provider;
    private String w_nickname;
    private String profileImg;
    private String auth;
}