package com.project.clone_wavve.config;

import com.project.clone_wavve.config.model.CustomUserPrincipal;
import com.project.clone_wavve.config.model.OAuth2UserInfo;
import com.project.clone_wavve.user.UserMapper;
import com.project.clone_wavve.user.model.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final UserMapper mapper;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);
        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception e) {
            throw new InternalAuthenticationServiceException(e.getMessage(), e.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());

        if (!StringUtils.hasText(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }

        ProviderType providerType = ProviderType.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId().toUpperCase());
        String provider = providerType.toString();

        UserEntity param = new UserEntity();
        param.setW_id(oAuth2UserInfo.getEmail());
        param.setProvider(provider);

        UserEntity savedUser = mapper.findByEmail(param);
        if (savedUser == null) {
            param.setW_nm(oAuth2UserInfo.getName());
            savedUser = registerUser(param);
        }
        return CustomUserPrincipal.create(savedUser);
    }

    private UserEntity registerUser(UserEntity param) {
        int result = mapper.insUser(param);
        if (result == 0) {
            throw new OAuth2AuthenticationProcessingException(" Social Login Join Fail ");
        }
        return mapper.findByEmail(param);
    }

}
