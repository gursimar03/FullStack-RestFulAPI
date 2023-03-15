import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import './css/App.css'
import * as serviceWorker from "./serviceWorker"

//run npm install @react-oauth/google@latest
import { GoogleOAuthProvider } from '@react-oauth/google';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="229157463098-qcejos0ds4i477v76rogb7s1q1vum3q9.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
