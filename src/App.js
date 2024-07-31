import logo from './billboard.png';
import './App.css';
import '@fontsource/inter'; 
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './page/Home'
import axios from 'axios';
import React, { useState } from 'react';


function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes> 
      </Router>
    </div>
  );
}

function Login(){
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [credentials, setCredentials] = useState({ usernameOrEmail: '', password: '' });

  
  const handleHome = async (e) =>{
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/auth/login', credentials
);
      console.log(response.data);
      navigate('/home');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('รหัสผ่านหรือชื่อผู้ใช้ไม่ถูกต้อง');
      } else if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
        console.log(error.response.data.message)
      }
    }
  }

  return (
  <div>
    <header className="App-header">
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <form className="Login-form" onSubmit={handleHome}>
          <label>Userame</label>
          <input 
              type="text" 
              id="username" 
              name="username" 
              placeholder="Enter your username" /><br />
          <label htmlFor="password">Password</label>
          <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Enter your password" 
          /><br />
            <div className="Button-container">
              <button type="submit">Login</button>
            </div>
        </form>
      </div>    
    </header>
  </div>
  )
}

export default App;
