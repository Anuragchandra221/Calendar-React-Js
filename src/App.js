import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Calendar from './Components/Calendar';
import Login from './Components/Login';
import { getToken } from './services';

function App() {
  const dict1 = {}
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={
      <div className="App">
      <Calendar dict1={dict1} />
    </div>} />
    
        <Route path="login" element={<Login />} />
        
    </Routes>
      
    </BrowserRouter>
    
  );
}

export default App;
