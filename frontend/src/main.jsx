import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {Toaster} from 'react-hot-toast';

import '../src/styles/globals.css';
import store from './app/store.js';


//Adds a single toast container for the whole app, Now anywhere you can write: toast.success("Profile Updated") or toast.error("Invalid Password") , and the notification appears in the top-right corner
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
      <Toaster position='top-right' />                  
    </BrowserRouter>
  </Provider>
)
