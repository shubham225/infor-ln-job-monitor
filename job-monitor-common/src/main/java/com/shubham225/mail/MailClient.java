package com.shubham225.mail;

import com.shubham225.exception.MailNotSentException;
import com.shubham225.mail.domain.MailRequest;

public interface MailClient {
    void sendEmail(MailRequest request) throws MailNotSentException;
}
