package com.shubham225.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExclusionJobDTO {
    private Long id;
    private String hostName;
    private String jobName;
    private String company;
}
