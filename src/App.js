import { useState } from 'react';
import './App.css';
import Appbar from './components/Appbar';
import Student from './components/Student';

function App() {
  return (
    <div className="App">
      <Appbar title="StudentPortal"/>
      <Student/>
    </div>
  );
}

export default App;
