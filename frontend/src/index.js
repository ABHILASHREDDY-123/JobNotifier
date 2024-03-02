import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from './components/Navbar';
import App from './App';
import SignIn from './components/SignIn';
import { useState } from 'react';
import Test from './components/Test';
const root = ReactDOM.createRoot(document.getElementById('root'));

const Main = ()=>{
  const [token,setToken] = useState("");
   return (
    <>
    <ToastContainer/>
    <Router>
       <Navbar token={token} setToken={setToken}/>
       <Routes>
          <Route exact path='/' element={<App />}></Route>
          <Route path='/login' element={<SignIn setToken={setToken}/>}/>
          <Route exact path='/test' element={<Test />}></Route>
       </Routes>
    </Router>
  </>
   );
}


root.render(<Main/>);

