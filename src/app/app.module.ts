import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ListenService } from 'speech-angular';  // <== Import ListenService

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [
        ListenService                            // <== Add Provider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }


