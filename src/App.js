import logo from './billboard.png';
import './App.css';
import '@fontsource/inter'; 
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './page/Home'

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
  const handleHome = (e) =>{
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (username === 'correctUsername' && password === 'correctPassword') {
      navigate('/home');
    } else {
      alert('Incorrect username or password');
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
