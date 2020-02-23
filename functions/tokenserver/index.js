const googleAuth = require( 'google-oauth-jwt' );

const googleCredentials = require( './google-credentials' );

// Token values

const TOKEN_TIMEOUT = 60 * 55;
let tokenDate = new Date();
let currentToken = '';

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */

exports.tokenserver = (req, res) => {

  res.header("Access-Control-Allow-Origin", googleCredentials.GOOGLE_WEB_URL );
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  getAccessToken( res );
};

/**
 * Calculation of the time difference for determining the remaining validity period of a token
 */

function getDiffTime( date1, date2 ) {
  return date2.getTime() - date1.getTime();
}


/**
* Fetch the token from the Google server when the validity period has expired
*/

async function getAccessToken(res) {
  // Calculation of the remaining validity period in seconds

  const currentDate = new Date();
  const diffTime = Math.round( getDiffTime( tokenDate, currentDate ) / 1000 );

  // the remaining validity period has expired, get a new token from the Google server

  if ( diffTime > TOKEN_TIMEOUT || !currentToken ) {
      currentToken = await generateAccessToken();
  }

  // Return token to caller with remaining validity period in seconds

  // console.log('getAccessToken: ', currentToken, TOKEN_TIMEOUT - diffTime );
  const result = { token: currentToken, time: TOKEN_TIMEOUT - diffTime };
  res.json( result );
}


/**
* Get the token from the Google server
*/

function generateAccessToken() {
  // enter current time for validity period

  tokenDate = new Date();

  // Calling the Google server to return an Access Token

    return new Promise(( resolve ) => {
        googleAuth.authenticate(
            {
              email: googleCredentials.GOOGLE_CLIENT_EMAIL,
              key: googleCredentials.GOOGLE_PRIVATE_KEY,
              scopes: [ googleCredentials.GOOGLE_SCOPE_URL ],
          },
            (err, token ) => {
              resolve( token );
         },
        );
    });
}
