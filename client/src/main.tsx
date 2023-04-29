import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement
); // type assertion recommended here: https://bobbyhadz.com/blog/typescript-document-getelementbyid. Don't need | null b/c we're sure there is a div with id 'root'.

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
