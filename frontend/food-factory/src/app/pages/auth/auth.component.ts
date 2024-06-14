import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { min } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from '../../services/Auth/auth-service.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatRadioModule,FormsModule,ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  isRegister = false;

  constructor(public authService:AuthServiceService) { }


  registrationForm = new FormGroup({
    fullName: new FormControl("",[Validators.required]),
    email: new FormControl("",[Validators.required, Validators.email]),
    password: new FormControl("",[Validators.required, Validators.minLength(6)])
  })

  loginForm = new FormGroup({
    email: new FormControl("",[Validators.required, Validators.email]),
    password: new FormControl("",[Validators.required])
  })

  handleRegister(){
    console.log("register ", this.registrationForm.value)
    this.authService.register(this.registrationForm.value).subscribe({
      next: (response)=>{
        localStorage.setItem('jwt', response.jwt);
        this.authService.getUserProfile().subscribe();
        console.log("Signup Sucess" , response)
      },
       
      }
    )
  }

  handleLogin(){
    console.log("login ", this.loginForm.value)
    this.authService.login(this.loginForm.value).subscribe({
      next: (response)=>{
        localStorage.setItem('jwt', response.jwt);
        this.authService.getUserProfile().subscribe();
        console.log("Login Sucess" , response)
      },
       
      }
    )
  }

  togglePanel(){
    this.isRegister=!this.isRegister
  }
}
