import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./assets/components/HomePage";
import ScoringPage from "./assets/components/ScoringPage";
import ChartPage from "./assets/components/ChartPage";
import "./assets/styles/index.css";


function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scoring" element={<ScoringPage />} /> 
        <Route path="/charts" element={<ChartPage />} />
      </Routes>
    </Router>
  )

}
export default App;