# Speech-Angular: Getting Started with ListenService

In this Getting Started we want to create an Angluar app and extend it with the **ListenService**. The service enables [(Automatic) Speech Recognition](https://en.wikipedia.org/wiki/Speech_recognition) - ASR within the app.

## Installation

To follow this tutorial you will need the [Angular CLI](https://github.com/angular/angular-cli/wiki). Please install it if you don't have it yet. Afterwards the project dependencies can be installed.

	$ npm install -g @angular/cli
	
**Hint:** Angular requires Node.js version 8.x or 10.x. To check your version, run `node -v` in a terminal. To get *Node.js*, go to [nodejs.org](https://nodejs.org/en/). 

## Start 

To start the example use this command:

	$ ng serve

Open [localhost on port 4200](localhost:4200) in **Chrome** to test the speech recognition.

## Build 

To build a version for production, use:

	$ ng build

The build can be found in the [dist](/dist) directory.
	
## Step-by-Step Instruction

Create a new Angular app project and change directory to the workspace. 

    $ ng new my-speech-listen
    $ cd my-speech-listen

To be able to use the ListenService, we install the speech-framework and speech-angular.
You find the current release of the ready-to-use packages on the website of [LinguaLogic](lingualogic.de) in the Download section. 

Download the packages and copy them into the workspace. Then they can be installed:
	
	$ npm install speech-framework
	$ npm install speech-angular-0.5.17.tgz

Let's continue in the code. For programming we can recommend [VScode](https://code.visualstudio.com/).

	$ code .

### Provide the ListenService

With the service we will enable [(Automatic) Speech Recognition](https://en.wikipedia.org/wiki/Speech_recognition) within the app.


In `app.module.ts` we import the service and make it available as a provider. 

    import { BrowserModule } from '@angular/platform-browser';
	import { FormsModule } from '@angular/forms';
	import { NgModule } from '@angular/core';
	
	import { AppComponent } from './app.component';
	
	import { ListenService } from 'speech-angular';    // <== Import ListenService
	
	@NgModule({
	    declarations: [
	        AppComponent
	    ],
	    imports: [
	        BrowserModule,
	        FormsModule
	    ],
	    providers: [
	        ListenService                              // <== Add Provider
	    ],
	    bootstrap: [AppComponent]
	})
	export class AppModule { }

Now the service is available in our components.

### Start the ListenService 

We open `app.component.ts` and import the ListenService. In the constructor of the `AppComponent` class we create a ListenService object via Dependency Injection. The functionality of the service can be lookup [here](https://lingualogic.de/speech-angular/docs/latest/api/classes/speech_listen.listenservice.html).

In the  `start()` function we set the language and start the speech recognition.

    import { Component } from '@angular/core';
	import { ListenService } from 'speech-angular';               // <== Import ListenService
	
	@Component({
	    selector: 'app-root',
	    templateUrl: './app.component.html',
	    styleUrls: ['./app.component.css']
	})
	
	export class AppComponent {
	    title = 'my-speech-listen';
	
	    constructor( private listenService: ListenService ) { }   // <== Dependency Injection
	
	    start(): void {
	        this.listenService.language = 'en';                   // <== Set Language
	        this.listenService.start();                           // <== Start ListenService
	    }
	}

### Get the result of speech recognition

In order to get the result of the speech recognition, need to subscribe the [resultEvent](https://lingualogic.de/speech-angular/docs/latest/api/classes/speech_listen.listenservice.html#mlistenresultevent) of the ListenService. Therefore we implement the `OnInit` interface in the `AppComponent` class, initialize the `listenResultEvent` and set the callback function in the `ngOnInit()` function.
In the callback the result of the speech recognition gets log in the console.

	import { Component, OnInit } from '@angular/core';             // <== Add OnInit
	import { ListenService } from 'speech-angular';
	
	@Component({
	    selector: 'app-root',
	    templateUrl: './app.component.html',
	    styleUrls: ['./app.component.css']
	})
	
	export class AppComponent implements OnInit {                  // <== Implement OnInit
	    title = 'my-speech-listen';
	
	    listenResultEvent: any;                                    // <== Init Event
	
	    constructor( private listenService: ListenService ) { }
	
	    ngOnInit(): void {
	        this.listenResultEvent = this.listenService.resultEvent.subscribe(aText => {
	            console.log(aText);                               // <== Here is the Result
	        });
	    }
	
	    start(): void {
	        this.listenService.language = 'en';
	        this.listenService.start();
	    }
	}

### Show the result of the speech recognition

To show the result of the speech recognition in the view, we instantiate a string `listenResult`.
In the callbak function of the `listenResultEvent` we set its value and update the view. 

	import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // <== More Imports
	import { ListenService } from 'speech-angular';
	
	@Component({
	    selector: 'app-root',
	    templateUrl: './app.component.html',
	    styleUrls: ['./app.component.css']
	})
	
	export class AppComponent implements OnInit {
	    title = 'my-speech-listen';
	
	    listenResult: string;                                             // <== Init String
	
	    listenResultEvent: any;
	
	    constructor( private listenService: ListenService,
	                 private ref: ChangeDetectorRef ) { }                 // <==
	
	    ngOnInit(): void {
	        this.listenResultEvent = this.listenService.resultEvent.subscribe(aText => {
	            this.listenResult = aText;                                // <== Set Result
	            this.ref.detectChanges();                                 // <== Update View
	        });
	    }
	
	    start(): void {
	        this.listenService.language = 'en';
	        this.listenService.start();
	    }
	}

### Edit the view

Subsequently we edit the template file `app.component.html`. We add an input - to show the `listenResult` and a button - to call the `start()` fucntion.

    <div style="text-align:center">

    <h1>Welcome to {{ title }}!</h1>

    <img width="300" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">

    <h2>This App can recognize spoken language:</h2>

    <!-- Shows the ListenResult -->
    <input type="text" [(ngModel)]="listenResult" style="padding: 16px 30px; font-size: 16px;" />

    <!-- Start the ListenService -->
    <button (click)="start()" style="padding: 16px 32px; font-size: 16px;">Press me!</button>

</div>

### Start

Now the Angular app can be started.

    $ ng serve 

Open [localhost on port 4200](localhost:4200) in **Chrome** to test the speech recognition.

Does the app understands you? Send your feedback to *info@lingualogic.de*.

## Extension

Speech recognition using HTML5 and the Web-Audio-API is only supported in Chrome, to enable speech recognition on all browsers and plattforms, you may use a cloud service, like 
[Google Cloud Speech-to-Text](https://cloud.google.com/speech-to-text). 

If you want to analyse the users intention, you need natural language understanding, which is provided in the [IntentService](https://lingualogic.de/speech-angular/docs/latest/api/classes/speech_intent.intentservice.html).

### Enable speech recognition for all browsers

In order to enable speech recognition for all browsers, we add the Google Cloud Speech-to-Text API to our project. Therefore we follow the steps: 

1. Go to the [Google Cloud Console](https://console.cloud.google.com/), setup a project and activate the Google Cloud Speech-to-Text API.

2. Set up a server (like the [speech-tokenserver](https://github.com/lingualogic/speech-tokenserver)) or a FaaS to create client access token. This Example uses the gcf in `functions/tokenserver`. Follow the [instruction](./../functions/tokenserver) and enter the GOOGLE_SERVER_URL in the `credentials/google-credentials.ts`.  

3. In `environment.ts` and `environment.prod.ts` add a `google` parameter: 

		export const environment = {
  			production: false,
  			google: false,
		};

4. In `main.ts` import google module, set the google-credentials and init the cloud-service:

		import { GoogleModule } from 'speech-angular';

		...

		import { GOOGLE_APP_KEY, GOOGLE_SERVER_URL } from './../credentials/google-credentials-my';
		const googleOption = {
			googleDynamicCredentialsFlag: false,
			googleAppKey: GOOGLE_APP_KEY,
			googleServerUrl: GOOGLE_SERVER_URL,
			errorOutputFlag: true
		};

		...

		GoogleModule.init( googleOption, (aGoogleFlag: boolean) => {
		if ( googleOption && googleOption.errorOutputFlag ) {
			console.log( '===> Google:', aGoogleFlag);
		}
		environment.google = aGoogleFlag;
		});

5. In the `app.component.ts` we can now shwich the ASR used by the ListenService.  

		ngOnInit(): void {
        	this.listenService.asr = 'ASRGoogle';
			... }

Test your app on another browser (than Chrome), it should work!
