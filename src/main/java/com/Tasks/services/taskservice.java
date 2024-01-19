package com.Tasks.services;

import java.util.List;
import java.util.Optional;

import com.Tasks.model.task;

public interface taskservice {
	
		List<task> getAllTasks();

	    Optional<task> getTaskById(Long id);

	    task createTask(task task);
	   
	    List<task> getTaskByuEmail(String uEmail);

		task updateTaskById(Long id, task task);

	    void deleteTask(Long id);
	    
	  void sendTaskReminders();


}
