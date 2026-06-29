package com.shubham225.erp.domain;

import com.shubham225.model.dto.ErrorMessageDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FetchJobHistoryMessageResponseDTO {
    String jobCode;
    String company;
    String[] messages;
}
