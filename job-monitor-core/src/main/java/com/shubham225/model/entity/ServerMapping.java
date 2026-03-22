package com.shubham225.model.entity;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServerMapping extends BaseModel{
    @NotBlank
    private String hostname;
    @NotBlank
    private String apiUrl;
}
