import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpclient:HttpClient) { }

  private apiUrl = 'http://localhost:5000/api/regi';
  getRegisteredUsers(Email: string): Observable<User> {
    const url = `${this.apiUrl}/getUserByEmail/${Email}`;
    return this.httpclient.get<User>(url);
  }
  
  addUser(uObj:User):Observable<User>{
    return this.httpclient.post<User>("http://localhost:5000/api/regi/adduser",uObj);
  }
}
