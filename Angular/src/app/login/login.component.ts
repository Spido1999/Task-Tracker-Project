import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { User } from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  showPassword: boolean = false;
  isAuthenticated: boolean = false;
  errorMessage: string = '';
  uEmail:any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      uEmail: ['', [Validators.required, Validators.email]],
      uPass: ['', Validators.required]
    });

    // Check if the user is already authenticated
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/tasks']);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  login(): void {
    const user: User = {
      uEmail: this.loginForm.value.uEmail,
      uPass: this.loginForm.value.uPass,
    };
    console.log(user.uPass);

    this.authService.login(user).subscribe(
      (response: { token: any; uEmail: any}) => {


        // Successful login
        this.isAuthenticated = true;
        this.errorMessage = '';

        // Store the token in local storage
        this.authService.setToken(response.token);

        // Store the uEmail in session storage
        console.log('uEmail:', response.uEmail);
        // this.authService.setuEmail(response.uEmail);
        // Store the uEmail in local storage
            this.authService.setuEmail(response.uEmail);

        // Redirect to the desired page
        this.router.navigate(['/tasks']);
      },
      (error: any) => {
        // Failed login
        this.isAuthenticated = false;
        this.errorMessage = 'Invalid Credentials';
      }
    );
  }
}
