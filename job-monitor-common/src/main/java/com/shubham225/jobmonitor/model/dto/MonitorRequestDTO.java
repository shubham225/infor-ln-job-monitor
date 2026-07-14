package com.shubham225.jobmonitor.model.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MonitorRequestDTO {
    @NotBlank
    private String jobCode;
    @NotBlank
    private String company;
    @NotBlank
    private String hostName;
    @NotBlank
    private String username;
    private String bse;
}
