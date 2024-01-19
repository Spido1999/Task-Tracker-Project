import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css']
})
export class TaskUpdateComponent implements OnInit {
  taskId!: number;
  updateTaskForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.createForm();
    this.loadTask();
  }

  createForm(): void {
    this.updateTaskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      complete: [false]
    });
  }

  loadTask(): void {
    this.taskService.getTaskById(this.taskId).subscribe(task => {
      this.updateTaskForm.patchValue(task);
    });
  }

  updateTask(): void {
    if (this.updateTaskForm.valid) {
      const updatedTask: Task = { ...this.updateTaskForm.value };
      this.taskService.updateTask(this.taskId, updatedTask).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }
}
