import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ToastComponent } from '../toast/toast.component';
import { MailService } from '../mail.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ToastComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{

  constructor(
    private router: Router,
    private mailService : MailService
  ) { }


  email = '';
  code = '';
  recievedCode = '';
  loginPage = true;
  otpSent = false;
  otp ='';
  mailValid = false;
  show = false;

  emailCheck() {
    this.show = true;
    this.checkValidity(this.email);
  }




  checkValidity(email: string) {

    if (email === '') {
      this.show = false
    }

    // Explanation for reference 
    // ^: Asserts the start of the line.
    // .*: Matches any character (except for line terminators) zero or more times.
    // @: Matches the "@" symbol.
    // (?:stud\.)?: Matches the literal string "stud." optionally (the ? makes the preceding group optional).
    // th-bingen\.de: Matches the literal string "th-bingen.de".
    // $: Asserts the end of the line.

    const regex = /^.*@(?:stud\.)?th-bingen\.de$/

    if (regex.test(email)) {
      this.mailValid = true;
    }
    else {
      this.mailValid = false;
    }

  }

  openHome() {
    console.log("Otp sent is ",this.code, " and the recieved code is ", this.code);
    if (this.code === this.otp) {
      this.router.navigate(['/home']);
    }
    else {
      //notify by popUP that opt is not verified try again
    }
  }

  //on send otp a mail to be sent to required witht a 6 digit otp
  sendOtp() {
    //sendOtp
    this.otp = this.mailService.generateOtp();
    this.otpSent = true;
  }

  onSingnUp() {
    this.loginPage = !this.loginPage;
    this.otpSent = false;
  }

}
