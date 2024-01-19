	package com.Tasks.model;
	
	import java.time.LocalDateTime;

import jakarta.annotation.Priority;
	import jakarta.persistence.Entity;
	import jakarta.persistence.GeneratedValue;
	import jakarta.persistence.GenerationType;
	import jakarta.persistence.Id;
	
	@Entity
	public class task {
			@Id
		    @GeneratedValue(strategy = GenerationType.IDENTITY)
		    private Long id;
			private String uEmail;
		    private String title;
		    private String description;
//		    private Priority priority;
		    private boolean Complete;
		    private LocalDateTime dueDate;
			public Long getId() {
				return id;
			}
			public void setId(Long id) {
				this.id = id;
			}
			public String getuEmail() {
				return uEmail;
			}
			public void setuEmail(String uEmail) {
				this.uEmail = uEmail;
			}
			public String getTitle() {
				return title;
			}
			public void setTitle(String title) {
				this.title = title;
			}
			public String getDescription() {
				return description;
			}
			public void setDescription(String description) {
				this.description = description;
			}
			public boolean isComplete() {
				return Complete;
			}
			public void setComplete(boolean complete) {
				Complete = complete;
			}
			public LocalDateTime getDueDate() {
				return dueDate;
			}
			public void setDueDate(LocalDateTime dueDate) {
				this.dueDate = dueDate;
			}
			@Override
			public String toString() {
				return "task [id=" + id + ", uEmail=" + uEmail + ", title=" + title + ", description=" + description
						+ ", Complete=" + Complete + "]";
			}

			
	
	}
