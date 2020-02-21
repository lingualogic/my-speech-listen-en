import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ListenService } from 'speech-angular';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    title = 'my-speech-listen-en';

    listenResult: string;

    listenResultEvent: any;

    constructor( private listenService: ListenService,
                 private ref: ChangeDetectorRef ) { }

    ngOnInit(): void {
        this.listenService.asr = 'ASRGoogle';
        this.listenResultEvent = this.listenService.resultEvent.subscribe(aText => {
            this.listenResult = aText;
            this.ref.detectChanges();
        });
    }

    start(): void {
        this.listenService.language = 'en';
        this.listenService.start();
    }
}




