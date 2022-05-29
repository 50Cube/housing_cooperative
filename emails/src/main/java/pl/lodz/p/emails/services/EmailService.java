package pl.lodz.p.emails.services;

import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.http.MediaType;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import pl.lodz.p.common.dto.ReportMailDto;

import javax.activation.DataHandler;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @RabbitListener(queues = "nsai")
    public void sendReportMails(List<ReportMailDto> reportMails) throws MessagingException {
        String currentDate = LocalDate.now().toString();
        for (ReportMailDto reportMail : reportMails) {
            sendReportMail(reportMail, currentDate);
        }
    }

    private void sendReportMail(ReportMailDto reportMail, String currentDate) throws MessagingException {
        MimeBodyPart mimeBodyPart = new MimeBodyPart();
        ByteArrayDataSource dataSource = new ByteArrayDataSource(reportMail.getContent(), MediaType.APPLICATION_PDF_VALUE);
        mimeBodyPart.setDataHandler(new DataHandler(dataSource));
        mimeBodyPart.setFileName(reportMail.getLogin() + "-" + currentDate + ".pdf");
        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(mimeBodyPart);
        MimeMessage message = mailSender.createMimeMessage();
        message.setContent(multipart);
        message.setSubject("NSAI");
        message.setRecipient(Message.RecipientType.TO, new InternetAddress(reportMail.getEmail()));
        mailSender.send(message);
    }
}
