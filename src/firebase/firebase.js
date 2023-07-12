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
import jwt_decode from 'jwt-decode';



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

export const HandleData = (data) => {
  const token = data.token;
  const decodedToken = jwt_decode(token);
  const userID = decodedToken.uid;
  const expirationTime = decodedToken.exp;
  localStorage.setItem('token', token);
  localStorage.setItem('expirationTime', expirationTime);
  localStorage.setItem('uid', userID);
}

// export const HandleGoogleLogin = async (response) => {
//   try {
//     const googleProvider = new GoogleAuthProvider();
//     const result = await signInWithPopup(auth, googleProvider);
//     const token = await result.user.getIdToken();
//     try {
//       const res = await fetch('http://localhost:3001/api/google-auth', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ token }),
//       });
//       const data = await res.json();
//       HandleData(data)
//       return data;
//     } catch (error) {
//       console.error('Error calling backend API:', error);
//     }
//   } catch (error) {
//     console.error('Error signing in with Google:', error);
//   }
// };

export const HandleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // The signed-in user info.
      const token = await result.user.getIdToken();
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      try {
        const response = await fetch('http://localhost:3001/api/google-auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
        
        const data = await response.json();
        HandleData(data);
        return data; // Return the response from the fetch call
      } catch (error) {
        console.error('Error calling backend API:', error);
        throw error; // Throw the error to be caught in the outer catch block if necessary
      }
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    })
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

export const LogOut = () => {signOut()};