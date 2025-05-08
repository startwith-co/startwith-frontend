import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCLYjZ7W5vqKaWyXC64tvdgSJd1sMOAaRo',
  authDomain: 'startwith-7a7ae.firebaseapp.com',
  databaseURL: 'https://startwith-7a7ae-default-rtdb.firebaseio.com',
  projectId: 'startwith-7a7ae',
  storageBucket: 'startwith-7a7ae.firebasestorage.app',
  messagingSenderId: '647091271831',
  appId: '1:647091271831:web:be3a85bbc837ff60bed1d2',
  measurementId: 'G-YD15N249NQ',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
