import React from 'react';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import './App.css';
import './styles.css';
import './Navbar';
import Navbar from "./Navbar"

import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>


        </Routes>
      </div>
      <div className="App">
        <SortingVisualizer />
      </div>
    </div>
  );
}


export default App;