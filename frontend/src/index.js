import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from './components/Navbar';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ToastContainer/>
    <Router>
       <Navbar/>
       <Routes>
   
       </Routes>
    </Router>
  </>

);

