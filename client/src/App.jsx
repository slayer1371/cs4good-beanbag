import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScoringPage from "./assets/components/ScoringPage";
import ChartPage from "./assets/components/ChartPage";
import "./assets/styles/index.css";
import TeamPage from "./assets/components/TeamPage";


function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<ScoringPage />} />
        <Route path="/charts" element={<ChartPage />} />
        <Route path="/team" element={<TeamPage />} />
      </Routes>
    </Router>
  )

}
export default App;

