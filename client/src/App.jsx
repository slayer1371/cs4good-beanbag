import { useState } from "react";
import "./assets/styles/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./assets/HomePage";
import ScoringPage from "./assets/ScoringPage";
import ChartPage from "./assets/ChartPage";

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