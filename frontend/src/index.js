import { ToastContainer, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import React from 'react'

import store from './store'
import App from './App'
import './index.css'

const options = {
  position: 'bottom-center',
  hideProgressBar: true,
  transition: Zoom,
  theme: 'dark'
}

createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <ToastContainer {...options} />
      <App />
    </Provider>
  // </React.StrictMode>
)
