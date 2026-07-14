package com.shubham225.jobmonitor.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorMessageDTO {
    private String jobCode;
    private String company;
    private String message;
}
