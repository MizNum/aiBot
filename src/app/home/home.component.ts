import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener, OnDestroy, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router, Navigation } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PopupService } from '../popup.service';
import { filter } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { Environment } from '../environment';
import { eventNames } from 'process';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule,MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,AfterViewChecked {
  
  @ViewChild('startButton') startButton!: ElementRef;
  @ViewChild('output') outputDiv!: ElementRef;
  @ViewChild('chatContainer') chatContainerRef!: ElementRef;
  
  recognition: any;
  errorMessage: string | null = null;



  constructor(
    private route: ActivatedRoute,
    private popUpService: PopupService,
    private router: Router
  ) { }
 
  textInput = '';
  loggedIn: any;
  conversation: any;
  video = false;
  aFlag = false;
  mic = true;
  relativePath = 'http://localhost:3000';
  preferredLanguage = 'en';
  languages = [
    { name: "Afrikaans", code: "af" },
    { name: "Albanian", code: "sq" },
    { name: "Amharic", code: "am" },
    { name: "Arabic", code: "ar" },
    { name: "Armenian", code: "hy" },
    { name: "Assamese", code: "as" },
    { name: "Aymara", code: "ay" },
    { name: "Azerbaijani", code: "az" },
    { name: "Bambara", code: "bm" },
    { name: "Basque", code: "eu" },
    { name: "Belarusian", code: "be" },
    { name: "Bengali", code: "bn" },
    { name: "Bhojpuri", code: "bho" },
    { name: "Bosnian", code: "bs" },
    { name: "Bulgarian", code: "bg" },
    { name: "Catalan", code: "ca" },
    { name: "Cebuano", code: "ceb" },
    { name: "Chinese (Simplified)", code: "zh-CN" },
    { name: "Chinese (Traditional)", code: "zh-TW" },
    { name: "Corsican", code: "co" },
    { name: "Croatian", code: "hr" },
    { name: "Czech", code: "cs" },
    { name: "Danish", code: "da" },
    { name: "Dhivehi", code: "dv" },
    { name: "Dogri", code: "doi" },
    { name: "Dutch", code: "nl" },
    { name: "English", code: "en" },
    { name: "Esperanto", code: "eo" },
    { name: "Estonian", code: "et" },
    { name: "Ewe", code: "ee" },
    { name: "Filipino (Tagalog)", code: "tl" },
    { name: "Finnish", code: "fi" },
    { name: "French", code: "fr" },
    { name: "Frisian", code: "fy" },
    { name: "Galician", code: "gl" },
    { name: "Georgian", code: "ka" },
    { name: "German", code: "de" },
    { name: "Greek", code: "el" },
    { name: "Guarani", code: "gn" },
    { name: "Gujarati", code: "gu" },
    { name: "Haitian Creole", code: "ht" },
    { name: "Hausa", code: "ha" },
    { name: "Hawaiian", code: "haw" },
    { name: "Hebrew", code: "he" },
    { name: "Hindi", code: "hi" },
    { name: "Hmong", code: "hmn" },
    { name: "Hungarian", code: "hu" },
    { name: "Icelandic", code: "is" },
    { name: "Igbo", code: "ig" },
    { name: "Ilocano", code: "ilo" },
    { name: "Indonesian", code: "id" },
    { name: "Irish", code: "ga" },
    { name: "Italian", code: "it" },
    { name: "Japanese", code: "ja" },
    { name: "Javanese", code: "jv" },
    { name: "Kannada", code: "kn" },
    { name: "Kazakh", code: "kk" },
    { name: "Khmer", code: "km" },
    { name: "Kinyarwanda", code: "rw" },
    { name: "Konkani", code: "kok" },
    { name: "Korean", code: "ko" },
    { name: "Krio", code: "kri" },
    { name: "Kurdish", code: "ku" },
    { name: "Kurdish (Sorani)", code: "ckb" },
    { name: "Kyrgyz", code: "ky" },
    { name: "Lao", code: "lo" },
    { name: "Latin", code: "la" },
    { name: "Latvian", code: "lv" },
    { name: "Lingala", code: "ln" },
    { name: "Lithuanian", code: "lt" },
    { name: "Luganda", code: "lg" },
    { name: "Luxembourgish", code: "lb" },
    { name: "Macedonian", code: "mk" },
    { name: "Maithili", code: "mai" },
    { name: "Malagasy", code: "mg" },
    { name: "Malay", code: "ms" },
    { name: "Malayalam", code: "ml" },
    { name: "Maltese", code: "mt" },
    { name: "Maori", code: "mi" },
    { name: "Marathi", code: "mr" },
    { name: "Meiteilon (Manipuri)", code: "mni" },
    { name: "Mizo", code: "lus" },
    { name: "Mongolian", code: "mn" },
    { name: "Myanmar (Burmese)", code: "my" },
    { name: "Nepali", code: "ne" },
    { name: "Norwegian", code: "no" },
    { name: "Nyanja (Chichewa)", code: "ny" },
    { name: "Odia (Oriya)", code: "or" },
    { name: "Oromo", code: "om" },
    { name: "Pashto", code: "ps" },
    { name: "Persian", code: "fa" },
    { name: "Polish", code: "pl" },
    { name: "Portuguese", code: "pt" },
    { name: "Punjabi", code: "pa" },
    { name: "Quechua", code: "qu" },
    { name: "Romanian", code: "ro" },
    { name: "Russian", code: "ru" },
    { name: "Samoan", code: "sm" },
    { name: "Sanskrit", code: "sa" },
    { name: "Scots Gaelic", code: "gd" },
    { name: "Sepedi", code: "nso" },
    { name: "Serbian", code: "sr" },
    { name: "Sesotho", code: "st" },
    { name: "Shona", code: "sn" },
    { name: "Sindhi", code: "sd" },
    { name: "Sinhala (Sinhalese)", code: "si" },
    { name: "Slovak", code: "sk" },
    { name: "Slovenian", code: "sl" },
    { name: "Somali", code: "so" },
    { name: "Spanish", code: "es" },
    { name: "Sundanese", code: "su" },
    { name: "Swahili", code: "sw" },
    { name: "Swedish", code: "sv" },
    { name: "Tagalog (Filipino)", code: "tl" },
    { name: "Tajik", code: "tg" },
    { name: "Tamil", code: "ta" },
    { name: "Tatar", code: "tt" },
    { name: "Telugu", code: "te" },
    { name: "Thai", code: "th" },
    { name: "Tigrinya", code: "ti" },
    { name: "Tsonga", code: "ts" },
    { name: "Turkish", code: "tr" },
    { name: "Turkmen", code: "tk" },
    { name: "Twi (Akan)", code: "tw" },
    { name: "Ukrainian", code: "uk" },
    { name: "Urdu", code: "ur" },
    { name: "Uyghur", code: "ug" },
    { name: "Uzbek", code: "uz" },
    { name: "Vietnamese", code: "vi" },
    { name: "Welsh", code: "cy" },
    { name: "Xhosa", code: "xh" },
    { name: "Yiddish", code: "yi" },
    { name: "Yoruba", code: "yo" },
    { name: "Zulu", code: "zu" }
  ];
  
  isRecording = false;
  mediaRecorder: any;
  audioChunks: any[] = [];
  transcript: string | null = null;


  ngOnInit(): void {

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
        "videoUrl": "360p.mp4", 
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
    ];

    
    this.initSpeechRecognition();
    console.log('intital speech is recoginized.')

  }



  ngAfterViewInit(): void {
    console.log(this.startButton);
    console.log(this.outputDiv);
    console.log(this.chatContainerRef);
  }

  initSpeechRecognition(): void {
    const SpeechRecognition = (window as any).SpeechRecognition || 
                              (window as any).webkitSpeechRecognition ||
                              (window as any).mozSpeechRecognition ||
                              (window as any).msSpeechRecognition;

    if (!SpeechRecognition) {
      this.errorMessage = "Web Speech API is not supported in this browser.";
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onstart = () => {
      this.startButton.nativeElement.textContent = 'Listening...';
      console.log('listening');
      this.isRecording = true;
    };

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      // this.outputDiv.nativeElement.textContent = transcript;
      // console.log(transcript);
      this.textInput = transcript;
    };

    this.recognition.onerror = (event: any) => {
      this.errorMessage = `Error occurred in recognition: ${event.error}`;
      this.startButton.nativeElement.textContent = 'Start Voice Input';
    };

    this.recognition.onend = () => {
      // this.startButton.nativeElement.textContent = 'Start Voice Input';
      this.mic = true;
      this.isRecording = false;
    };
  }

  startVoiceInput(): void {
    this.mic = false;
    if (this.recognition) {
      this.errorMessage = null;
      this.recognition.start();
    } else {
      this.errorMessage = "Speech recognition is not initialized.";
    }
  }

  ngAfterViewChecked(): void {
      this.recognition.onresult = (event: any)=>{
        this.textInput = event.results[0][0].transcript;
        console.log('inout ',this.textInput);
      }
  }

  scrollToBottom() {
    const chatContainer = this.chatContainerRef.nativeElement;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  
  }


  changeLanguage(){
    console.log('Language selected is ',this.preferredLanguage);

  }

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

    console.log('Text is added');
  }


}
