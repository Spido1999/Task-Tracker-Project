import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../task';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // private baseur='http://localhost:7004/task';

  constructor(  private httpClient:HttpClient ) { }

  createTask(task:Task) : Observable<any>{
    return this.httpClient.post<Task>("http://localhost:7004/tasks/createtask", task);
  }

  // getAlltask(): Observable<Task[]>{
  //   return this.httpClient.get<Task[]>("http://localhost:7004/tasks/getAlltask");
  // }
  getAlltask(): Observable<Task[]> {
    const uEmail = localStorage.getItem('uEmail');
    return this.httpClient.get<Task[]>(`http://localhost:7004/tasks/getByuEmail/${uEmail}`);
}


  getTaskById(id: number): Observable<Task> {
    return this.httpClient.get<Task>(`http://localhost:7004/tasks/getByID/${id}`);
  }
  
  deleteTask(id:number): Observable<Task>{
    return this.httpClient.delete<Task>(`http://localhost:7004/tasks/deletByID/${id}`);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.httpClient.put<Task>(`http://localhost:7004/tasks/updateTaskbyid/${id}`, task);
  }

}
