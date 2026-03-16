package com.shubham225.exception;

public class MailNotSentException extends RuntimeException {
    public MailNotSentException(String message) {
        super(message);
    }
}
