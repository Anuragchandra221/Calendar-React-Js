import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Calendar from './Components/Calendar';
import Login from './Components/Login';
import SignUp from './Components/SignUp';

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={
          <div className="App">
          <Calendar/>
        </div>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<SignUp />}/>
    </Routes>
      
    </BrowserRouter>
    
  );
}

export default App;
