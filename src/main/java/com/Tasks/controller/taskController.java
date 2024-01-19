package com.Tasks.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Tasks.model.task;
//import com.Tasks.services.taskservice;
import com.Tasks.services.taskserviceimpl;




@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins="*")
public class taskController {
	
	@Autowired
	private taskserviceimpl taskservice;
	
	@GetMapping("/getAlltask")
    public List<task> getAllTasks() {
        return taskservice.getAllTasks();
    }
//    @GetMapping("/getByuserID/{userID}")
//	public ResponseEntity<List<Car>>getCarDetailsByuserID(@PathVariable String userID){
//		 if (userID==null) {
//		        return ResponseEntity.badRequest().build();
//		       
//		    }
//		 List<Car> carsByuserID;
//		 System.out.println("got the id");
//		 carsByuserID=carbrowse.getCarDetailsByuserID(userID);
//		 return new ResponseEntity<>(carsByuserID,HttpStatus.OK);
//	}
    
    @GetMapping("/getByuEmail/{uEmail}")
    public ResponseEntity<List<task>>getTaskByuEmail(@PathVariable String uEmail){
    	if(uEmail==null) {
    		return ResponseEntity.badRequest().build();
    	}
    	List<task> taskByuEmail;
    	System.out.println("Got the Email");
    	taskByuEmail=taskservice.getTaskByuEmail(uEmail);
    	return new ResponseEntity<> (taskByuEmail, HttpStatus.OK);
    }
    
    @GetMapping("/getByID/{id}")
    public task getTaskById(@PathVariable Long id) {
        return taskservice.getTaskById(id).orElse(null);
    }

    @PostMapping("/createtask")
    public task createTask(@RequestBody task task) {
    	System.out.println("Received Boolean-> "+task);
        return taskservice.createTask(task);
    }


    @PutMapping("/updateTaskbyid/{id}")
    public task updateTaskById(@PathVariable Long id, @RequestBody task updatedTask) {
    	System.out.println("Id received for update-> "+id);
        return taskservice.updateTaskById(id, updatedTask);
    }


    @DeleteMapping("/deletByID/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskservice.deleteTask(id);
    }
    
    @GetMapping("/reminders")
    public ResponseEntity<String> sendTaskReminders() {
        try {
            taskservice.sendTaskReminders();
            return ResponseEntity.ok("Task reminders sent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send task reminders");
        }
    }

}
