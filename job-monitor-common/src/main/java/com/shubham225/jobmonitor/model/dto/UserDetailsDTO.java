package com.shubham225.jobmonitor.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserDetailsDTO {
    String name;
    String email;
}
