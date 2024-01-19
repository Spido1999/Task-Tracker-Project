import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../service/register.service';
import { User } from '../User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registrationForm:FormGroup
  constructor(private router: Router, private regservice:RegisterService){
    this.registrationForm=new FormGroup({
      uName: new FormControl('', Validators.required),
      uEmail: new FormControl('',[Validators.required, Validators.email]),
      uPass: new FormControl('',Validators.required)
    });

  }

  isRegister=false;
  register(registrationForm:FormGroup){
    if(registrationForm.valid){
    const user:User= registrationForm.value;
    this.regservice.addUser(user).subscribe((data:any)=>{
      console.log(data);
      this.isRegister=true;
    },
    (error:any)=>{
      console.log(error);
      console.log(error);
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);

    }
    );
  }else{
    console.log('Please Provide Correct Details');
  }
}

}
