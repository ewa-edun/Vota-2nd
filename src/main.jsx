import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import emailjs from '@emailjs/browser';

// Initialize EmailJS once when app loads
emailjs.init({
  host: 'mail.vota.ng',
  port: 465,
  username: 'contactus@vota.ng',
  password: import.meta.env.VITE_EMAILJS_PASSWORD, 
  ssl: true,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
