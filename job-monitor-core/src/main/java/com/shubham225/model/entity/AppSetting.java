package com.shubham225.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppSetting {
    @Id
    private Long id = 1L;
    private String mailTo;
    private String mailCc;
    private Integer allowedJobStartDelay;
    private boolean emailAlerts;
    private String errorKeywords;
}
