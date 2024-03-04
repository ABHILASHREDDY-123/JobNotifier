import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from './components/Navbar';
import App from './App';
import SignIn from './components/SignIn';
import Companies from './components/companies';
import { useState } from 'react';
import Test from './components/Test';
const root = ReactDOM.createRoot(document.getElementById('root'));

const Main = ()=>{
  const [token,setToken] = useState(localStorage.getItem("job-notifier")||"");
  const [user,setUser] = useState({});
  
   return (
    <>
    <ToastContainer/>
    <Router>
       <Navbar token={token} setToken={setToken}/>
       <Routes>
          <Route exact path='/' element={<App />}></Route>
          <Route path='/login' element={<SignIn setToken={setToken} setUser={setUser} />}/>
          <Route path='/test' element={<Test token={token}/>}></Route>
          <Route path="/companies" element={<Companies user={user} token={token} setToken={setToken}/>}></Route>
       </Routes>
    </Router>
  </>
   );
}


root.render(<Main/>);

