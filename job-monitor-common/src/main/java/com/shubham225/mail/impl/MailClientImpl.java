package com.shubham225.mail.impl;

import com.shubham225.exception.MailNotSentException;
import com.shubham225.mail.MailClient;
import com.shubham225.mail.domain.MailRequest;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.nio.file.Path;
import java.util.Properties;

@Slf4j
public class MailClientImpl implements MailClient {

    private final String emailUser;
    private final Session session;

    public MailClientImpl(String emailUser, String emailPassword) {
        this.emailUser = emailUser;

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        this.session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(emailUser, emailPassword);
            }
        });
    }

    @Override
    public void sendEmail(MailRequest request) throws MailNotSentException {
        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(emailUser));

            // To recipients
            message.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse(normalizeEmails(request.getTo()))
            );

            // CC recipients (optional)
            if (request.getCc() != null && !request.getCc().isBlank()) {
                message.setRecipients(
                        Message.RecipientType.CC,
                        InternetAddress.parse(normalizeEmails(request.getCc()))
                );
            }

            // Subject
            message.setSubject(request.getSubject());

            // Multipart email
            Multipart multipart = getMultipartMailContent(request);

            // Content
            message.setContent(multipart);

            Transport.send(message);
            log.info("mail has been sent successfully : {}", request.getTo());
        } catch (Exception e) {
            throw new MailNotSentException(e.getMessage());
        }
    }

    private static Multipart getMultipartMailContent(MailRequest request) throws MessagingException, IOException {
        Multipart multipart = new MimeMultipart();

        // Body (HTML)
        MimeBodyPart bodyPart = new MimeBodyPart();
        bodyPart.setContent(request.getBody(), "text/html; charset=utf-8");
        multipart.addBodyPart(bodyPart);

        // Attachments
        if (request.getAttachments() != null) {
            for (Path attachment : request.getAttachments()) {
                MimeBodyPart attachmentPart = new MimeBodyPart();
                attachmentPart.attachFile(attachment.toFile());
                attachmentPart.setFileName(attachment.getFileName().toString());
                multipart.addBodyPart(attachmentPart);
            }
        }

        return multipart;
    }

    private String normalizeEmails(String emails) {
        return emails.replace(";", ",");
    }
}
