import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.styles.css'

import Home from './pages/home';
import Country from './pages/country';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/country/:id' element={<Country/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
