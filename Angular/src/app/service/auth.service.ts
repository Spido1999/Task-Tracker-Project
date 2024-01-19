import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../User';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8088/api/login/validate';
  private tokenKey = 'token';
  private uEmailKey:string=''; // Change this to a different string value
  constructor(private http: HttpClient, private router: Router) { }

  // login(user: User): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, user).pipe(
  //     tap((response: { token: any; uEmail: string }) => {
  //       console.log('Token:', response.token); // Print the token value
  //       // Store the token in local storage
  //       this.setToken(response.token);

  //       // Store the userID in session storage
  //       this.setuEmail(response.uEmail);
  //       console.log('uEmail: ',response.uEmail);
  //     })
  //   );
  // }

  login(user: User): Observable<any> {
    console.log(user.uEmail);
    return this.http.post<any>(this.apiUrl, user).pipe(
      tap((response: { token: any; uEmail: string }) => {
        console.log('Token:', response.token); // Print the token value
        console.log(response);
        // Store the token in local storage
        this.setToken(response.token);
  
        // Store the uEmail in local storage
        console.log('uEmail:', response.uEmail);
        this.setuEmail(response.uEmail);
  
        // Verify the stored uEmail value
        console.log('Stored uEmail:', this.getuEmail());
      })
    );
  }
  

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    console.log("Token is removed",this.tokenKey)
    localStorage.removeItem(this.uEmailKey);
    console.log("Email is removed",this.uEmailKey)

    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = new Date(tokenData.exp * 1000);
      if (expirationDate <= new Date()) {
        this.logout();
        return false;
      }
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setuEmail(uEmail: string): void {
    localStorage.setItem("uEmail",uEmail);
  }
  
  getuEmail(): string | null {
    return localStorage.getItem("uEmail");
  }
  
  
}
