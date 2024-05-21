import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener, OnDestroy, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router, Navigation } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PopupService } from '../popup.service';
import { filter } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { Environment } from '../environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule,MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnChanges {



  constructor(
    private route: ActivatedRoute,
    private popUpService: PopupService,
    private router: Router
  ) { }

  @ViewChild('chatContainer') chatContainer!: ElementRef;
  textInput = '';
  loggedIn: any;
  conversation: any;
  video = false;
  aFlag = false;
  mic = true;
  relativePath = 'http://localhost:3000';



  isRecording = false;
  mediaRecorder: any;
  audioChunks: any[] = [];
  transcript: string | null = null;

  startRecording() {
    this.mic = false;
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();
        this.isRecording = true;

        this.mediaRecorder.addEventListener('dataavailable', (event: any) => {
          this.audioChunks.push(event.data);
        });

        this.mediaRecorder.addEventListener('stop', () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
          this.audioChunks = [];
          this.sendAudioToServer(audioBlob);
        });
      });
  }

  stopRecording() {
    this.mic = true;
    this.mediaRecorder.stop();
    this.isRecording = false;
  }

  sendAudioToServer(audioBlob: Blob) {
    const reader = new FileReader();
  
    reader.onloadend = () => {
      if (reader.result) {
        const base64String = reader.result.toString().replace(/^data:audio\/\w+;base64,/, '');
        const requestBody = { 
          file: base64String
        };
  
        // Replace with your API endpoint and logic (assuming JSON format)
        fetch(Environment.UPLOAD_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        })
        .then(response => response.json())
        .then(data => {
          const newAudio = this.relativePath+data.url;
          console.log(newAudio);

          const voice_note = {
            "type":"voicenote",
            "sender":"sender",
            "timestamp": new Date().toISOString(),
            "audio_url": newAudio,
            "content": "This is the mesasge got from audio"
          }

          this.conversation.push(voice_note);

        })
        .catch(error => console.error('Error:', error));
      } else {
        console.error('Error reading audio blob');
      }
    };
  
    reader.readAsDataURL(audioBlob);
  }



  

  ngOnChanges(changes: SimpleChanges): void {
    
    if (this.chatContainer)
      this.scrollToBottom();

  }



  ngOnInit(): void {
    
    // if(window === undefined || localStorage === undefined){
    //     this.popUpService.toast('Please login First');
    //     this.router.navigate(['']);
    // }
    if (this.chatContainer)
      this.scrollToBottom();


    this.conversation = [
      {
        "type": "text",
        "sender": "user",
        "timestamp": "2024-05-07 10:00:00 AM",
        "content": "Hi there! How's your day going?"
      },
      {
        "type": "bot_response",
        "sender": "bot",
        "timestamp": "2024-05-07 10:01:00 AM",
        "name": "bot",
        "videoUrl": "../../assets/video/360p.mp4", 
            "vflag":false,
        "vtlag":false,
        "Summary": "Summary by Gpt",
        "startTime": "hh:mm:ss",
        "endTime": "hh:mm:ss",
        "result": "The logistic regression is a technique used for binary classification or binary response analysis. It is a linear regression algorithm that estimates the probability of an observation's outcome based on input variables. In logistic regression, we assume that each observation belongs to one or more categories, and we predict the probability of the observation belonging to each category given its input variables. The output for each observation is the predicted outcome (0 or 1), which determines whether the observation belongs to the true class, and the actual outcome (0 or 1) determines the probability of being in the true class.\n\nThe logistic regression algorithm works as follows:\n\n1. Calculate the log-odds ratios based on each input variable's estimated value and the predicted outcome for the observation. These log-odds ratios are used to calculate the probability of the observation's belonging to each category.\n\n2. Calculate the probability of the observation belonging to class 1 (or 0) given its input variables and predicted output using the formula: P(Y=1|X, O) = log(L/H), where L is the logistic likelihood function for class 1, H is the logistic likelihood function for class 0, and L is the logistic log-likelihood for class 1 and H is the logistic log-likelihood for class 0.\n\n3. Calculate the output (P(O=1|X)) using the formula: P(Y=1|X) = exp(logits).\n\nThe logistic regression algorithm works by finding the coefficients of each input variable that best fit the data, which are usually chosen by maximizing the likelihood function. The logistic regression output is then used to predict the probability of a specific observation belonging to each category.",
        "seekTime": {
          "end": 1044.4599999999998,
          "id": 268,
          "seek": 103086,
          "start": 1042.4599999999998,
          "text": " So for logistic regression,",
          "video_name": "2023-10-04_KInt_default"
        },
        "source": "So that's what we want to have. So for logistic regression, there is a very concrete loss function that we always use. And this loss function is defined like this, and this is called the logistic loss. And so let's look at what this does. So our target class, Y, is either zero or it is one. If it's either zero or one, if it's zero, this means this part vanishes over here. If it's one, it means this part vanishes over here because this part, thing becomes zero. So it means either we have this part, or we have this part of the loss function. Depending on the value of Y. So if we say Y is equal to one, and this part over here vanishes, and it means we take, our loss function will be the logarithm of our prediction. So logarithm of our prediction. So what is if we get a large prediction? So how does the log of any function look like? So I haven't made a plot of this. Would have been nice if I had some internet connection right now. Hmm., So let's see if I can get. So, ah yeah, some plot of logarithm. So the"
      },
      {
        "type": "voicenote",
        "sender": "user",
        "timestamp": "2024-05-07 10:02:30 AM",
        "audio_url": "../../assets/audio/voice3.mp3",
        "content": "Hey! My day's going well. Just finished some work and now taking a break."
      },
      {
        "type": "bot_response",
        "sender": "bot",
        "timestamp": "2024-05-07 10:03:30 AM",
        "name": "bot",
        "videoUrl": "../../assets/video/360p.mp4",
             "vflag":false,
        "vtlag":false,
        "Summary": "Summary by Gpt",
        "startTime": "hh:mm:ss",
        "endTime": "hh:mm:ss",
        "result": "The logistic regression is a technique used for binary classification or binary response analysis. It is a linear regression algorithm that estimates the probability of an observation's outcome based on input variables. In logistic regression, we assume that each observation belongs to one or more categories, and we predict the probability of the observation belonging to each category given its input variables. The output for each observation is the predicted outcome (0 or 1), which determines whether the observation belongs to the true class, and the actual outcome (0 or 1) determines the probability of being in the true class.\n\nThe logistic regression algorithm works as follows:\n\n1. Calculate the log-odds ratios based on each input variable's estimated value and the predicted outcome for the observation. These log-odds ratios are used to calculate the probability of the observation's belonging to each category.\n\n2. Calculate the probability of the observation belonging to class 1 (or 0) given its input variables and predicted output using the formula: P(Y=1|X, O) = log(L/H), where L is the logistic likelihood function for class 1, H is the logistic likelihood function for class 0, and L is the logistic log-likelihood for class 1 and H is the logistic log-likelihood for class 0.\n\n3. Calculate the output (P(O=1|X)) using the formula: P(Y=1|X) = exp(logits).\n\nThe logistic regression algorithm works by finding the coefficients of each input variable that best fit the data, which are usually chosen by maximizing the likelihood function. The logistic regression output is then used to predict the probability of a specific observation belonging to each category.",
        "seekTime": {
          "end": 1044.4599999999998,
          "id": 268,
          "seek": 103086,
          "start": 1042.4599999999998,
          "text": " So for logistic regression,",
          "video_name": "2023-10-04_KInt_default"
        },
        "source": "So that's what we want to have. So for logistic regression, there is a very concrete loss function that we always use. And this loss function is defined like this, and this is called the logistic loss. And so let's look at what this does. So our target class, Y, is either zero or it is one. If it's either zero or one, if it's zero, this means this part vanishes over here. If it's one, it means this part vanishes over here because this part, thing becomes zero. So it means either we have this part, or we have this part of the loss function. Depending on the value of Y. So if we say Y is equal to one, and this part over here vanishes, and it means we take, our loss function will be the logarithm of our prediction. So logarithm of our prediction. So what is if we get a large prediction? So how does the log of any function look like? So I haven't made a plot of this. Would have been nice if I had some internet connection right now. Hmm., So let's see if I can get. So, ah yeah, some plot of logarithm. So the"
      },
      {
        "type": "text",
        "sender": "user",
        "timestamp": "2024-05-07 10:05:00 AM",
        "content": "Nice! Any plans for later?"
      },
      {
        "type": "bot_response",
        "sender": "bot",
        "timestamp": "2024-05-07 10:01:00 AM",
        "name": "bot",
        "videoUrl": "../../assets/video/360p.mp4", 
            "vflag":false,
        "vtlag":false,
        "Summary": "Summary by Gpt",
        "startTime": "hh:mm:ss",
        "endTime": "hh:mm:ss",
        "result": "The logistic regression is a technique used for binary classification or binary response analysis. It is a linear regression algorithm that estimates the probability of an observation's outcome based on input variables. In logistic regression, we assume that each observation belongs to one or more categories, and we predict the probability of the observation belonging to each category given its input variables. The output for each observation is the predicted outcome (0 or 1), which determines whether the observation belongs to the true class, and the actual outcome (0 or 1) determines the probability of being in the true class.\n\nThe logistic regression algorithm works as follows:\n\n1. Calculate the log-odds ratios based on each input variable's estimated value and the predicted outcome for the observation. These log-odds ratios are used to calculate the probability of the observation's belonging to each category.\n\n2. Calculate the probability of the observation belonging to class 1 (or 0) given its input variables and predicted output using the formula: P(Y=1|X, O) = log(L/H), where L is the logistic likelihood function for class 1, H is the logistic likelihood function for class 0, and L is the logistic log-likelihood for class 1 and H is the logistic log-likelihood for class 0.\n\n3. Calculate the output (P(O=1|X)) using the formula: P(Y=1|X) = exp(logits).\n\nThe logistic regression algorithm works by finding the coefficients of each input variable that best fit the data, which are usually chosen by maximizing the likelihood function. The logistic regression output is then used to predict the probability of a specific observation belonging to each category.",
        "seekTime": {
          "end": 1044.4599999999998,
          "id": 268,
          "seek": 103086,
          "start": 1042.4599999999998,
          "text": " So for logistic regression,",
          "video_name": "2023-10-04_KInt_default"
        },
        "source": "So that's what we want to have. So for logistic regression, there is a very concrete loss function that we always use. And this loss function is defined like this, and this is called the logistic loss. And so let's look at what this does. So our target class, Y, is either zero or it is one. If it's either zero or one, if it's zero, this means this part vanishes over here. If it's one, it means this part vanishes over here because this part, thing becomes zero. So it means either we have this part, or we have this part of the loss function. Depending on the value of Y. So if we say Y is equal to one, and this part over here vanishes, and it means we take, our loss function will be the logarithm of our prediction. So logarithm of our prediction. So what is if we get a large prediction? So how does the log of any function look like? So I haven't made a plot of this. Would have been nice if I had some internet connection right now. Hmm., So let's see if I can get. So, ah yeah, some plot of logarithm. So the"
      },
      {
        "type": "text",
        "sender": "user",
        "timestamp": "2024-05-07 10:07:30 AM",
        "content": "Interesting! I've been learning about logistic regression lately."
      },
      {
        "type": "bot_response",
        "sender": "bot",
        "timestamp": "2024-05-07 10:01:00 AM",
        "name": "bot",
        "videoUrl": "../../assets/video/360p.mp4", 
            "vflag":false,
        "vtlag":false,
        "Summary": "Summary by Gpt",
        "startTime": "hh:mm:ss",
        "endTime": "hh:mm:ss",
        "result": "The logistic regression is a technique used for binary classification or binary response analysis. It is a linear regression algorithm that estimates the probability of an observation's outcome based on input variables. In logistic regression, we assume that each observation belongs to one or more categories, and we predict the probability of the observation belonging to each category given its input variables. The output for each observation is the predicted outcome (0 or 1), which determines whether the observation belongs to the true class, and the actual outcome (0 or 1) determines the probability of being in the true class.\n\nThe logistic regression algorithm works as follows:\n\n1. Calculate the log-odds ratios based on each input variable's estimated value and the predicted outcome for the observation. These log-odds ratios are used to calculate the probability of the observation's belonging to each category.\n\n2. Calculate the probability of the observation belonging to class 1 (or 0) given its input variables and predicted output using the formula: P(Y=1|X, O) = log(L/H), where L is the logistic likelihood function for class 1, H is the logistic likelihood function for class 0, and L is the logistic log-likelihood for class 1 and H is the logistic log-likelihood for class 0.\n\n3. Calculate the output (P(O=1|X)) using the formula: P(Y=1|X) = exp(logits).\n\nThe logistic regression algorithm works by finding the coefficients of each input variable that best fit the data, which are usually chosen by maximizing the likelihood function. The logistic regression output is then used to predict the probability of a specific observation belonging to each category.",
        "seekTime": {
          "end": 1044.4599999999998,
          "id": 268,
          "seek": 103086,
          "start": 1042.4599999999998,
          "text": " So for logistic regression,",
          "video_name": "2023-10-04_KInt_default"
        },
        "source": "So that's what we want to have. So for logistic regression, there is a very concrete loss function that we always use. And this loss function is defined like this, and this is called the logistic loss. And so let's look at what this does. So our target class, Y, is either zero or it is one. If it's either zero or one, if it's zero, this means this part vanishes over here. If it's one, it means this part vanishes over here because this part, thing becomes zero. So it means either we have this part, or we have this part of the loss function. Depending on the value of Y. So if we say Y is equal to one, and this part over here vanishes, and it means we take, our loss function will be the logarithm of our prediction. So logarithm of our prediction. So what is if we get a large prediction? So how does the log of any function look like? So I haven't made a plot of this. Would have been nice if I had some internet connection right now. Hmm., So let's see if I can get. So, ah yeah, some plot of logarithm. So the"
      },
      {
        "type": "text",
        "sender": "user",
        "timestamp": "2024-05-07 10:10:00 AM",
        "content": "By the way, I'm thinking of trying a new recipe for dinner. Any suggestions?"
      },
      {
        "type": "bot_response",
        "sender": "bot",
        "timestamp": "2024-05-07 10:01:00 AM",
        "name": "bot",  
        "videoUrl": "../../assets/video/360p.mp4", 
        "Summary": "Summary by Gpt",
        "startTime": "hh:mm:ss",
        "endTime": "hh:mm:ss",
        "result": "The logistic regression is a technique used for binary classification or binary response analysis. It is a linear regression algorithm that estimates the probability of an observation's outcome based on input variables. In logistic regression, we assume that each observation belongs to one or more categories, and we predict the probability of the observation belonging to each category given its input variables. The output for each observation is the predicted outcome (0 or 1), which determines whether the observation belongs to the true class, and the actual outcome (0 or 1) determines the probability of being in the true class.\n\nThe logistic regression algorithm works as follows:\n\n1. Calculate the log-odds ratios based on each input variable's estimated value and the predicted outcome for the observation. These log-odds ratios are used to calculate the probability of the observation's belonging to each category.\n\n2. Calculate the probability of the observation belonging to class 1 (or 0) given its input variables and predicted output using the formula: P(Y=1|X, O) = log(L/H), where L is the logistic likelihood function for class 1, H is the logistic likelihood function for class 0, and L is the logistic log-likelihood for class 1 and H is the logistic log-likelihood for class 0.\n\n3. Calculate the output (P(O=1|X)) using the formula: P(Y=1|X) = exp(logits).\n\nThe logistic regression algorithm works by finding the coefficients of each input variable that best fit the data, which are usually chosen by maximizing the likelihood function. The logistic regression output is then used to predict the probability of a specific observation belonging to each category.",
        "seekTime": {
          "end": 1044.4599999999998,
          "id": 268,
          "seek": 103086,
          "start": 1042.4599999999998,
          "text": " So for logistic regression,",
          "video_name": "2023-10-04_KInt_default"
        },
        "source": "So that's what we want to have. So for logistic regression, there is a very concrete loss function that we always use. And this loss function is defined like this, and this is called the logistic loss. And so let's look at what this does. So our target class, Y, is either zero or it is one. If it's either zero or one, if it's zero, this means this part vanishes over here. If it's one, it means this part vanishes over here because this part, thing becomes zero. So it means either we have this part, or we have this part of the loss function. Depending on the value of Y. So if we say Y is equal to one, and this part over here vanishes, and it means we take, our loss function will be the logarithm of our prediction. So logarithm of our prediction. So what is if we get a large prediction? So how does the log of any function look like? So I haven't made a plot of this. Would have been nice if I had some internet connection right now. Hmm., So let's see if I can get. So, ah yeah, some plot of logarithm. So the"
      },
    ]


  }


  sendText() {
    this.conversation.push({
      "type": "text",
      "sender": "user",
      "timestamp": new Date().toISOString(),
      "content": this.textInput
    })

    this.textInput = '';

    this.conversation.push({
      "type": "bot_response",
      "sender": "bot",
      "timestamp": "2024-05-07 10:01:00 AM",
      "name": "bot",
      "videoUrl": "../../assets/video/360p.mp4", "vflag":false,
      "Summary": "Summary by Gpt",
      "startTime": "hh:mm:ss",
      "endTime": "hh:mm:ss",
      "result": "The logistic regression is a technique used for binary classification or binary response analysis. It is a linear regression algorithm that estimates the probability of an observation's outcome based on input variables. In logistic regression, we assume that each observation belongs to one or more categories, and we predict the probability of the observation belonging to each category given its input variables. The output for each observation is the predicted outcome (0 or 1), which determines whether the observation belongs to the true class, and the actual outcome (0 or 1) determines the probability of being in the true class.\n\nThe logistic regression algorithm works as follows:\n\n1. Calculate the log-odds ratios based on each input variable's estimated value and the predicted outcome for the observation. These log-odds ratios are used to calculate the probability of the observation's belonging to each category.\n\n2. Calculate the probability of the observation belonging to class 1 (or 0) given its input variables and predicted output using the formula: P(Y=1|X, O) = log(L/H), where L is the logistic likelihood function for class 1, H is the logistic likelihood function for class 0, and L is the logistic log-likelihood for class 1 and H is the logistic log-likelihood for class 0.\n\n3. Calculate the output (P(O=1|X)) using the formula: P(Y=1|X) = exp(logits).\n\nThe logistic regression algorithm works by finding the coefficients of each input variable that best fit the data, which are usually chosen by maximizing the likelihood function. The logistic regression output is then used to predict the probability of a specific observation belonging to each category.",
      "seekTime": {
        "end": 1044.4599999999998,
        "id": 268,
        "seek": 103086,
        "start": 1042.4599999999998,
        "text": " So for logistic regression,",
        "video_name": "2023-10-04_KInt_default"
      },
      "source": "So that's what we want to have. So for logistic regression, there is a very concrete loss function that we always use. And this loss function is defined like this, and this is called the logistic loss. And so let's look at what this does. So our target class, Y, is either zero or it is one. If it's either zero or one, if it's zero, this means this part vanishes over here. If it's one, it means this part vanishes over here because this part, thing becomes zero. So it means either we have this part, or we have this part of the loss function. Depending on the value of Y. So if we say Y is equal to one, and this part over here vanishes, and it means we take, our loss function will be the logarithm of our prediction. So logarithm of our prediction. So what is if we get a large prediction? So how does the log of any function look like? So I haven't made a plot of this. Would have been nice if I had some internet connection right now. Hmm., So let's see if I can get. So, ah yeah, some plot of logarithm. So the"
    }

    )

    console.log('TExt is added ');
    this.scrollToBottom();
  }

  scrollToBottom() {
    console.log('Ng Changes worked ');
    try {
      // Scroll to the bottom of the chat container
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }


}
