import logo from './billboard.png';
import './App.css';
import '@fontsource/inter'; 
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './page/Home'
import CardDetail from './components/ModalDetail'
import axios from 'axios';
import React, { useState } from 'react';
import Explore from './page/Explore';
import ExploreFrom from './components/ExploreFrom';


function App() {
  return (
    <div className="bg-sky-500">
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/manual" element={<Home />} />
        <Route path="/help" element={<Home />} />
        <Route path='/card-detail/:cardId' element={<CardDetail />} />        
        <Route path='/explorefrom/:landNumber' element={<ExploreFrom/>}/>
        <Route path='/explorefrom' element={<ExploreFrom/>}/>
        </Routes> 
      </Router>
    </div>
  );
}

function Login(){
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value
    }));
  };
  
  const handleHome = async (e) =>{
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/method/maechan.api.login', credentials
      );
      const { token } = response.data.message; 
      if (token) {
        localStorage.setItem('token', token);
        localStorage.removeItem('loggedInUsername');
        navigate('/home');
      } else {
        setErrorMessage('ไม่สามารถรับโทเคนจากเซิร์ฟเวอร์');
      }
      console.log(localStorage)
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
    <header className="w-full h-svh justify-center flex">
      <div className='flex flex-col justify-center items-center'>
        <img src={logo} className="w-3/12 rounded-full" alt="logo" />
        <form className="mt-5 text-left" onSubmit={handleHome}>
          <label className='mb-1.5 block font-Inter font-bold text-sky-950'>Userame</label>
          <input 
              type="text" 
              id="username" 
              name="username" 
              className='mb-4 p-2.5 w-52 border-none rounded-2xl'
              value={credentials.username} onChange={handleChange}
              placeholder="Enter your username" /><br />
          <label htmlFor="password" className='mb-1.5 block font-Inter font-bold text-sky-950'>Password</label>
          <input 
              type="password" 
              id="password" 
              name="password" 
              className='mb-4 p-2.5 w-52 border-none rounded-2xl'
              value={credentials.password} onChange={handleChange}
              placeholder="Enter your password" 
          /><br />
            <div className="text-center">
              <button type="submit" 
              className='py-3.5 px-10 my-4 mx-8 bg-red-50 text-sky-950 font-Inter font-bold border-none rounded-xl text-xl hover:bg-customBlue hover:text-red-50'>Login</button>
            </div>
            {errorMessage && <p className='text-red-700 '>{errorMessage}</p>}
        </form>
      </div>    
    </header>
  )
}

export default App;
