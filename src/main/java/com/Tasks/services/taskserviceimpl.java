package com.Tasks.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Tasks.model.task;
import com.Tasks.repository.taskrepo;




@Service
public class taskserviceimpl implements taskservice {
	@Autowired
    private final taskrepo taskrepo;


    public taskserviceimpl(taskrepo taskrepo) {
        this.taskrepo = taskrepo;
    }

    @Override
    public List<task> getAllTasks() {
        return taskrepo.findAll();
    }

    @Override
    public Optional<task> getTaskById(Long id) {
        return taskrepo.findById(id);
    }

    @Override
    public task createTask(task task) {
    	System.out.println(task);
        return taskrepo.save(task);
    }

//    @Override
//    public task updateTaskById(Long id, task updatedTask) {
//        Optional<task> taskOptional = taskrepo.findById(id);
//        if (taskOptional.isPresent()) {
//            task existingTask = taskOptional.get();
//            existingTask.setTitle(updatedTask.getTitle());
//            existingTask.setDescription(updatedTask.getDescription());
//            existingTask.setComplete(updatedTask.isComplete());
//            return taskrepo.save(existingTask);
//        } else {
//            throw new RuntimeException("Task not found with id: " + id);
//        }
//    }
    
    @Override
    public List<task> getTaskByuEmail(String uEmail){
    	
    	return taskrepo.findByuEmail(uEmail);
    }
    
    @Override
    public task updateTaskById(Long id, task updatedTask) {
        Optional<task> taskOptional = taskrepo.findById(id);
        if (taskOptional.isPresent()) {
            task existingTask = taskOptional.get();
            existingTask.setTitle(updatedTask.getTitle());
            existingTask.setDescription(updatedTask.getDescription());
            existingTask.setComplete(updatedTask.isComplete());
            return taskrepo.save(existingTask);
        } else {
            throw new RuntimeException("Task not found with id: " + id);
        }
    }


    @Override
    public void deleteTask(Long id) {
        taskrepo.deleteById(id);
    }
    
    @Override
    public void sendTaskReminders() {
        LocalDateTime currentDate = LocalDateTime.now();
        List<task> overdueTasks = taskrepo.findAllByDueDateBeforeAndCompleteIsFalse(currentDate);

        for (task task : overdueTasks) {
            sendEmailNotification(task);
        }
    }

    private void sendEmailNotification(task task) {
        // Configure the SMTP server and account credentials
        String host = "akashinde4175@gmail.com";
        int port = 587;
        String username = "akashinde4175@gmail.com";
        String password = "Akash@1999";

        // Set the recipient email address and subject
        String recipient = "akashinde4175@gmail.com";
        String subject = "Task Reminder: " + task.getTitle();

        // Compose the email content
        String messageText = "This is a reminder for the task: " + task.getTitle();

        // Create the email session properties
        Properties properties = new Properties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", port);

        // Create the email session with the account credentials
        Session session = Session.getInstance(properties, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try {
            // Create a new email message
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipient));
            message.setSubject(subject);
            message.setText(messageText);

            // Send the email message
            Transport.send(message);

            System.out.println("Notification sent for task: " + task.getTitle());
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
    

}