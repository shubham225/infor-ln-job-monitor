package com.shubham225.jobmonitor.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExclusionErrorMessageDTO {
    private Long id;
    private String hostName;
    private String message;
}
