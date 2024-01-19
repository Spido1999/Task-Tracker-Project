package com.Tasks.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.Tasks.model.task;

@Repository
public interface taskrepo extends JpaRepository<task, Long> {
	public List<task> findByuEmail(String uEmail);
//    public List<task> findAllByOrderByPriorityDesc();
//	public List<task> findAllByDueDateBeforeAndCompleteIsFalse(LocalDateTime dueDate);
    @Query("SELECT t FROM task t WHERE t.dueDate < :dueDate AND t.Complete = false")
	public List<task> findAllByDueDateBeforeAndCompleteIsFalse(LocalDateTime dueDate);

}
