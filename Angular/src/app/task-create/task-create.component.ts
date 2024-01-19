import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../service/task.service';
import { Task } from '../task';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent {
  taskForm: FormGroup;
  @Output() taskUpdated: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      Complete: [false]
    });
  }

  createTask(): void {
    if (this.taskForm.valid) {
      const uEmail = localStorage.getItem('uEmail');

      const newTask: any = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        Complete: this.taskForm.value.Complete,
        uEmail: uEmail
      };

      this.taskService.createTask(newTask).subscribe(
        () => {
          console.log("New task Created", newTask);
          this.taskUpdated.emit(); // Emit event to notify task list to refresh
          this.router.navigate(['/tasks']);
        },
        error => {
          console.log("Error occurred while creating task", error);
        }
      );
    }
  }
}
