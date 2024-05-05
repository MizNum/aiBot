import { Injectable } from '@angular/core';
import { Environment } from './environment';
import axios, { Axios } from 'axios';


@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor() { }

  async generateOtp(email: string): Promise<string | undefined> {
    const apiUrl = Environment.sendOtpUrl;
    const data = { email };

    try {
      const response = await axios.post(apiUrl, data);
      const otp = response.data.Otp?.toString();
       // Log the generated OTP (if successful)
      console.log('Otp is ',otp);
      return otp;
    } catch (error) {
      console.error('Error generating OTP:', error);
      // Handle the error appropriately (e.g., display an error message to the user)
      return undefined; // Indicate failure (optional)
    }
  }
}