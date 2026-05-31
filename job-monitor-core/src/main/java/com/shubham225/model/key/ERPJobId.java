package com.shubham225.model.key;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.text.MessageFormat;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ERPJobId implements Serializable {
    private String jobCode;
    private String company;
    private String hostName;
}
