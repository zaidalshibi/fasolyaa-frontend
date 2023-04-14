import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Songs from './Pages/HomeSongs/Songs';
import SongPlayer from './Pages/SongPlayer/SongPlayer';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/songs" element={<Songs />} />
      <Route path="/songs/:id" element={<SongPlayer />} />
      <Route path="/login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  </BrowserRouter>
);
