package com.shubham225.model.key;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.text.MessageFormat;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ERPJobId implements Serializable {
    private String jobName;
    private String company;
    private String server;

    @Override
    public String toString() {
        return MessageFormat.format("[jobName: {0}, company: {1}, server: {2}]",
                                            this.jobName, this.company, this.server);
    }
}
