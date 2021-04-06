# Spotify External Application for Duda Custom Widgets

This is the supplemental code repository to [this blog article](https://blog.duda.co/how-to-use-external-apps-to-power-custom-widgets-in-duda). The code is structured to allow it to run within a Duda widget or as a standalone application. [Rescripts](https://www.npmjs.com/package/@rescripts/cli) is being used to update our configuration to include CSS within the same package as the JS, and output the package as UMD.

## Installation

The frontend needs a middleware to authorize with the [Spotify API](https://developer.spotify.com/documentation/web-api/). The middleware will request an authorization token from Spotify, and then proxy all other requests straight to the Spotify API, including the authorization token in the headers of the request. The repo includes an example [Firebase Cloud Function](https://firebase.google.com/docs/functions) that can act as this middleware. To retrieve a client id and secret, you must set up a developer account and register an application with Spotify, after which, you will then be able to retrieve the information from the [developer application dashboard](https://developer.spotify.com/dashboard/applications).

If using the included Firebase function, you will need a new project in the [Firebase console](https://console.firebase.google.com). Your environemnt must be then setup as outlined in the [getting started guide](https://firebase.google.com/docs/functions/get-started). The spotify client ID and secret, should be set as [environmental variables](https://firebase.google.com/docs/functions/config-env) within your Firebase function. To set the environment run the following command in the `functions` directory:

`firebase functions:config:set spotify.id="<CLIENT_ID>" spotify.secret="<CLIENT_SECRET>" spotify.base="https://api.spotify.com" spotify.path="/v1"`

Once your middleware is set, you should set the URL of the API in the react application by creating a file called `.env.production` in the root of the project and adding the following line:

`REACT_APP_API_BASE_URL=<https://mydomain.com/path-to-api-base`

You are also able to add a `.env.development` file to specify a different URL while doing local testing.

## Available Scripts in the `functions` directory

`npm run serve` start a local Firebase functions emulator. The URL output should be added to your `.env.development` file

`npm run deploy` deploy the function to Firebase. The resulting URL should be added to your `.env.production` file

## Available Scripts for the React application

`npm start` compile and serve the application locally.

`npm run build` compile the code to the build folder. Rescripts will be used to modify the default create react app behavior to include CSS in the same file as your JS. It will also result in the output being in the UMD format instead of CJS. (Required for Duda external applications.

`npm run deploy` deploys the contents of the build folder to Firebase hosting and the function to cloud functions.
