import {
    initializeApp,
  } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'




const firebaseConfig = {
  apiKey: "AIzaSyBdm2IPzParC5JiUrz_2k8fILoA8dNPubk",
  authDomain: "pdfmaster-c3ae7.firebaseapp.com",
  projectId: "pdfmaster-c3ae7",
  storageBucket: "pdfmaster-c3ae7.appspot.com",
  messagingSenderId: "832427674525",
  appId: "1:832427674525:web:3ebdb2205c37464ee4bd74",
  measurementId: "G-EPGLRHYBGM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);




export const auth = getAuth(app);



  export const HandleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = await result.user.getIdToken();
  
      const response = await fetch('http://localhost:3001/api/google-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error calling backend API:', error);
      throw error;
    }
  };
  


export const HandleEmailLogin = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      const token = await result.user.getIdToken();
      try {
        const res = await fetch('http://localhost:3001/api/google-auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();
        return data
      } catch (error) {
        console.error('Error calling backend API:', error);
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

export const HandleEmailSignUp = async (email, password) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password)
        const token = await result.user.getIdToken();
        try {
          const res = await fetch('http://localhost:3001/api/google-auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });
          const data = await res.json();
          return data
        } catch (error) {
          console.error('Error calling backend API:', error);
        }
      } catch (error) {
        console.error('Error signing in with Google:', error);
      }
}

export const LogOut = () => {signOut(auth)};