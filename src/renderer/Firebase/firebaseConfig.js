// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";





// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAbn43_8rO1N1L2aLnMf3YdLPLuIxADHaU',
  authDomain: 'razor-studio.firebaseapp.com',
  projectId: 'razor-studio',
  storageBucket: 'razor-studio.appspot.com',
  messagingSenderId: '447236945167',
  appId: '1:447236945167:web:40dffaaeb2b061a56bba7a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const RazorAuth = getAuth(app);

export { RazorAuth }