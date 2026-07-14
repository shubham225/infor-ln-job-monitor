package com.shubham225.jobmonitor.model.entity;

import jakarta.persistence.Column;
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
public class ServerMapping extends BaseEntity {
    @Column(unique = true)
    private String hostName;
    @NotBlank
    private String apiUrl;
}
