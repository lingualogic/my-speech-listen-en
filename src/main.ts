import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Import Google Module
import { GoogleModule } from 'speech-angular';

// Google-Credentials
import { GOOGLE_APP_KEY, GOOGLE_SERVER_URL } from './../credentials/google-credentials-my';
const googleOption = {
    googleDynamicCredentialsFlag: false,
    googleAppKey: GOOGLE_APP_KEY,
    googleServerUrl: GOOGLE_SERVER_URL,
    errorOutputFlag: true
};

if (environment.production) {
  enableProdMode();
}

// Init Google Cloud-Service
GoogleModule.init( googleOption, (aGoogleFlag: boolean) => {
  if ( googleOption && googleOption.errorOutputFlag ) {
      console.log( '===> Google:', aGoogleFlag);
  }
  environment.google = aGoogleFlag;
});

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
