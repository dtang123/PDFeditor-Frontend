import { useEffect, useState } from "react"
import { AuthForm, AuthFormContainer, AuthFormContent, AuthFormTitle, AuthFormLabel, GoogleLogIn } from "./login.styles"
import 'firebase/compat/auth';
import { HandleGoogleLogin, HandleEmailLogin, HandleEmailSignUp, HandleData } from "../../firebase/firebase"
import { Navigate, useNavigate } from "react-router-dom";
import store from '../../store/reducers';
import { useDispatch } from "react-redux";
import { setFiles, setFilesMap } from "../../store/filesSlice";
import jwt_decode from 'jwt-decode';
import { setUserId } from "../../store/userSlice";




const Login = () => {
    const [authMode, setAuthMode] = useState("signin")
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleNameChange = (event) =>{
      setName(event.target.value)
    }

    const handleEmailChange = (event) => {
      setEmail(event.target.value)
    }
    
    const handlePasswordChange = (event) => {
      setPassword(event.target.value)
    }

    const changeAuthMode = () => {
      setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    // useEffect(() =>  {
    //   const token = localStorage.getItem('token');
    //   const expirationTime = localStorage.getItem('expirationTime');
    //   const userID = localStorage.getItem('uid')
    //   const currentTime = Math.floor(Date.now() / 1000); // Get the current time in seconds

    //   const fetchData = async () => {
    //     const res = await fetch('http://localhost:3001/api/google-auth/token', {
    //       method: 'POST',
    //       headers: {
    //         authorization: `Bearer ${token}`,
    //       },
    //     })
    //     const data = await res.json();
    //     return data
    //   }

    //   if (userID && token && expirationTime && currentTime < expirationTime) {
    //     // Token is valid, include it in the request headers
    //     fetchData().then((data) => {
    //       if (data && data.success) {
    //         HandleData(data)
    //         SetUser(localStorage.getItem('uid'))
    //         navigate('/my-drive')
    //       }
    //     }
    //     ).catch(console.error)
    //   } 
    // }, [hello])
    const SetUser = async (userID, dataFiles) => {
      await dispatch(setUserId(userID))
      await dispatch(setFiles(dataFiles))
      await dispatch(setFilesMap(dataFiles))
      console.log(store.getState().user.userId);
    }

    const HandleData = async (data) => {
      const token = data.token;
      const decodedToken = jwt_decode(token);
      const userID = decodedToken.uid;
      const expirationTime = decodedToken.exp;
      localStorage.setItem('token', token);
      localStorage.setItem('expirationTime', expirationTime);
      localStorage.setItem('uid', userID);
      await SetUser(userID, data.files);
      console.log(store.getState().files)
    }
    
  
    const emailSignIn = async (event) => {
      event.preventDefault()
      if (password.length >= 8) {
        const response = await HandleEmailLogin(email, password)
        setName('')
        setEmail('')
        setPassword('')
        if (response && response.success) {
          HandleData(response)
          console.log("navigate");
          return navigate('/my-drive')
        }
      }
      else {
        alert("Password has to be at least 8 characters")
      }
    }

    const emailSignUp = async (event) => {
      event.preventDefault()
      if (password.length >= 8) {
        const response = await HandleEmailSignUp(email, password)
        setName('')
        setEmail('')
        setPassword('')
        if (response && response.success) {
          HandleData(response)
          navigate('/my-drive')
        }
      }
      else {
        alert("Password has to be at least 8 characters")
      }
      
    }
  
    const handleGoogleButton = async (event) => {
        event.preventDefault()
        console.log("login");
        HandleGoogleLogin().then((response) => {
          console.log(response);
          if (response && response.success) {
            HandleData(response)
            console.log("navigate");
            console.log(store.getState().user.userId)
            console.log(store.getState().files.fileObjs)
            return navigate("./my-drive", { replace: true })
          }
        }).catch((error) => {
          console.log(error);
        })
      };
    
  
    if (authMode === "signin") {
      return (
        <AuthFormContainer>
          <AuthForm>
            <AuthFormContent>
              <AuthFormTitle>Sign In</AuthFormTitle>
              <div className="text-center">
                Not registered yet?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>
              </div>
              <div className="form-group mt-3">
                <AuthFormLabel>Email address</AuthFormLabel>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  onChange={handleEmailChange}
                  value={email}
                />
              </div>
              <div className="form-group mt-3">
                <AuthFormLabel>Password</AuthFormLabel>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  onChange={handlePasswordChange}
                  value={password}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <GoogleLogIn onClick={handleGoogleButton} />
                <button className="btn btn-primary" onClick={emailSignIn}>
                  Submit
                </button>
              </div>
              <p className="text-center mt-2">
                Forgot <a href="#">password?</a>
              </p>
            </AuthFormContent>
          </AuthForm>
        </AuthFormContainer>
      )
    }
  
    return (
      <AuthFormContainer>
        <AuthForm>
          <AuthFormContent>
            <AuthFormTitle>Sign Up</AuthFormTitle>
            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
                onChange={handleNameChange}
                value={name}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                onChange={handleEmailChange}
                value={email}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                onChange={handlePasswordChange}
                value={password}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button onClick={handleGoogleButton} />
              <button className="btn btn-primary" onClick={emailSignUp}>
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </AuthFormContent>
        </AuthForm>
      </AuthFormContainer>
    )
  }


export default Login;