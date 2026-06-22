package com.shubham225.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class ServerMappingDTO {
    private Long id;
    private String hostname;
    private String apiUrl;
}
