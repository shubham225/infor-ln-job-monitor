package com.shubham225.jobmonitor.controller;

import com.shubham225.jobmonitor.domain.AppResult;
import com.shubham225.jobmonitor.model.dto.UserDetailsDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Objects;

import static com.shubham225.jobmonitor.constant.ApplicationConstants.VERSION;

@RestController
@RequestMapping(value = VERSION + "/me")
public class UserController {

    @GetMapping()
    public ResponseEntity<AppResult> getCurrentUser(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return AppResult.error("User not Logged In", null);
        }

        UserDetailsDTO userDetail = UserDetailsDTO.builder()
                                    .name(principal.getAttribute("name"))
                                    .email(principal.getAttribute("email"))
                                    .build();

        return AppResult.success(userDetail);
    }
}