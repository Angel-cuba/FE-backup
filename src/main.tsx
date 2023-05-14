import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App'
import { store } from './redux/store'

import { Provider } from 'react-redux'
import { ThemeProvider } from './context/ThemeProvider'
import './styles/index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider>
    <GoogleOAuthProvider clientId="'702706853603-h3socua2kmsam8cutlb92eg4udtsl8l6.apps.googleusercontent.com'">
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  </ThemeProvider>
)
