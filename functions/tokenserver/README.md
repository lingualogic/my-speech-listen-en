# Tokenserver as FaaS

In order to use the the Google Cloud Speech-to-Text a client access token is needed. For the generation of the token a server, like the [speech-tokenserver](https://github.com/lingualogic/speech-tokenserver) or Function as a Service (FaaS) can be used. 
This example implements a Google Cloud Function (GCF) tokenserver.

For more information on GCF read the [Docs](https://cloud.google.com/functions/docs/first-nodejs#functions-deploy-command-node10).

Follow this steps to set up a GCF tokenserver: 

1. Create folder for der gcf:

        $ mkdir ~/tokenserver
        $ cd ~/tokenserver

2. Copy this in `index.js`:

        const googleAuth = require( 'google-oauth-jwt' );
        ...

3. Init npm project and install dependencies:

        $ npm init
        $ npm install google-oauth-jwt

4. Set project configuration: (optional)

        $ gcloud projects list
        $ gcloud config set project project-name


5. Depoly the GCF tokenserver: 

        $ gcloud functions deploy tokenserver --region europe-west3 --runtime nodejs10 --trigger-http

6. Describe the GCF tokenserver :

        $ gcloud functions describe tokenserver

This command returns the `GOOGLE_SERVER_URL`, needed in the [Getting Started](../../README.md):

        httpsTrigger: 
                url: GOOGLE_SERVER_URL


