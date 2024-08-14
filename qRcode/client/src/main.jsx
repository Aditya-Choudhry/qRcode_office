import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="468316523645-t7jjsq0prc8q9fgm6goeg9q8u9nsqi0n.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
 );