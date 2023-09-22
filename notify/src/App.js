import './App.css';

import NoteState from './context/notes/NoteState'

import Navbar from "./components/Navbar"
import Home from "./components/Home"
import About from "./components/About"
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
    <NoteState>
      <Navbar/>
      <div className="container">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
      </div>
    </NoteState>
    
    
    

    </>
  );
}

export default App;
