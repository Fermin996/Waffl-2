import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom'; 
import POS from './components/POS/POS';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/POS-view' element={<POS />} /> 
      </Routes>
    </div>
  );
}

export default App;
