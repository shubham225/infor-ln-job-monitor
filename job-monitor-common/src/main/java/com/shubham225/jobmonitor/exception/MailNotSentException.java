package com.shubham225.jobmonitor.exception;

public class MailNotSentException extends RuntimeException {
    public MailNotSentException(String message) {
        super(message);
    }
}
