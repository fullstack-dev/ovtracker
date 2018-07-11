// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBlmiK5g7sojWBJPVtd6_k-AvKOdCCKn7g',
    authDomain: 'ovtracker-188602.firebaseapp.com',
    databaseURL: 'https://ovtracker-188602.firebaseio.com',
    projectId: 'ovtracker-188602',
    storageBucket: 'ovtracker-188602.appspot.com',
    messagingSenderId: '937409070346',
  },

  functionsURL: 'https://us-central1-ovtracker-188602.cloudfunctions.net/app',
  stripePublishable: 'pk_test_jpC2OhzDEErN6uVk83a0nQ4I'

};
