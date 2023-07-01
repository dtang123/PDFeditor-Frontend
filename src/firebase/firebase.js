import {
    initializeApp
  } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId } from '../store/userSlice';
import store from '../store/reducers';


const firebaseConfig = {
    apiKey: "AIzaSyBdm2IPzParC5JiUrz_2k8fILoA8dNPubk",
    authDomain: "pdfmaster-c3ae7.firebaseapp.com",
    projectId: "pdfmaster-c3ae7",
    storageBucket: "pdfmaster-c3ae7.appspot.com",
    messagingSenderId: "832427674525",
    appId: "1:832427674525:web:3ebdb2205c37464ee4bd74",
    measurementId: "G-EPGLRHYBGM"
};

const app = initializeApp(firebaseConfig);



export const auth = getAuth(app);

export const HandleData = (data) => {
  const token = data.token;
  const decodedToken = jwt_decode(token);
  const userID = decodedToken.uid;
  const expirationTime = decodedToken.exp;
  localStorage.setItem('token', token);
  localStorage.setItem('expirationTime', expirationTime);
  localStorage.setItem('uid', userID);
}

export const HandleGoogleLogin = async (response) => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleProvider);
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
        HandleData(data)
        return data;
      } catch (error) {
        console.error('Error calling backend API:', error);
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
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
        HandleData(data)
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
          HandleData(data)
          return data
        } catch (error) {
          console.error('Error calling backend API:', error);
        }
      } catch (error) {
        console.error('Error signing in with Google:', error);
      }
}