import Firebase from 'firebase';
let config = {
  apiKey: 'AIzaSyD7zIGmZbh9W8nQfhjKj8N_JSd29puFydg',
  authDomain: 'graphing-f827a.firebaseapp.com',
  databaseURL: 'https://graphing-f827a-default-rtdb.firebaseio.com/',
  projectId: 'graphing-f827a',
  storageBucket: 'graphing-f827a.appspot.com',
  messagingSenderId: '955976354718'
};
let app = Firebase.initializeApp(config);
export const db = app.database();