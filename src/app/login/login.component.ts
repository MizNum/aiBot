import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

constructor(private router: Router) { }


  email = '';
  code = '';
  recievedCode ='';
  loginPage = true;
  otpSent = false;


  openHome() {
    this.recievedCode = '989898';//Use the service send otp to store the code
    console.log("Otp sent is ", " and the recieved code is ", this.code);
    if (this.code === '989898') {
      this.router.navigate(['/home']);
    }
    else {
      //notify by popUP that opt is not verified try again
    }
  }

  //on send otp a mail to be sent to required witht a 6 digit otp
  sendOtp() {
    //sendOtp
    this.code = '989898';//replace this with service sendOtp
    this.otpSent = true;

  }

  onSingnUp() {
    this.loginPage = !this.loginPage;
    this.otpSent = false;
  }

}
