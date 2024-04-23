import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor() { }

  generateOtp():string{
    //call to the api
    console.log('Otp genration service has been called');
    return '909090';
  }
}
