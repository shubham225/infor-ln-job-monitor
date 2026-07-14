package com.shubham225.jobmonitor.erp.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FetchJobHistoryMessageResponseDTO {
    String jobCode;
    String company;
    String[] messages;
}
