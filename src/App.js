import './App.css';
import Navbar from './Components/Navbar.js';
import Home from './Components/Home.js';
import About from './Components/About.js'; 
import Alerts from './Components/Alerts.js';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState.js';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alerts message ="Unbowed,Unbent,Unbroken"/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
