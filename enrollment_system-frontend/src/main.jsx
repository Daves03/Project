import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './auth'; 
import Home from './studentView/home'; 
import Admin from './admin/admin';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} /> {/* Login/Registration/ForgetPassword Component */}
        <Route path="/admin" element={<Admin />} /> {/* Home Component */}
        <Route path="/home" element={<Home />} /> {/* Home Component */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
