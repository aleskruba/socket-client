import { Routes, Route } from "react-router-dom";
import './App.css';
import Chat from './Components/Chat';
import { useState } from 'react';
import Layout from './Components/Layout';

function App() {

 
  return (

    <Routes>
       <Route path='/chat' element={ <Chat/>} />
       <Route path='/' element={<Layout/>}/>
   </Routes>

  );
}

export default App;
