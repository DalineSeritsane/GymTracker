import React from 'react';
import { Routes, Route, BrowserRouter} from "react-router-dom";
import Header from "./components/Header";
import Exercises from "./pages/Exercises";
import Workout from "./pages/Workout";
import Hero from "./components/Hero";



function App() {
  return (
    <div className= "App">
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Hero />}></Route>
        <Route path="/exercises" element={<Exercises />}></Route>
        <Route path="/workout" element={<Workout />}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  );
};

export default App;
