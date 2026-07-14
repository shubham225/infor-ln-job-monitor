package com.shubham225.jobmonitor.mail;

import com.shubham225.jobmonitor.exception.MailNotSentException;
import com.shubham225.jobmonitor.mail.domain.MailRequest;

public interface MailClient {
    void sendEmail(MailRequest request) throws MailNotSentException;
}
