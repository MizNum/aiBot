import { Injectable } from '@angular/core';
import { PopupService } from './popup.service';
import axios, { Axios } from 'axios';
import { Environment } from './environment';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(
    private popUpService : PopupService,
  ) {}

  async response(text: string): Promise<string | undefined> {
    const apiUrl = Environment.RESPONSE_API;
    const data = { "text" : text};

    try {
        const response = await axios.post(apiUrl, data);
        // console.log(response.data);
        return response.data as string;
    } catch (error) {
        this.popUpService.toast('Failed to fetch response.');
      console.error('Error:', error);

        return undefined; 
    }
}


}
