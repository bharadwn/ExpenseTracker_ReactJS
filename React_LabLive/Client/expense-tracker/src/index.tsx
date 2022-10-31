import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// import { BrowserRouter  as Router} from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* <Router></Router> */}
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>
);

