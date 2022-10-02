import logo from './logo.svg';
import './App.css';
import Calendar from './Components/Calendar';

function App() {
  console.log("hi")
  const dict1 = {}
  return (
    <div className="App">
      <Calendar dict1={dict1} />
    </div>
  );
}

export default App;
