import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScoringPage from "./assets/components/ScoringPage";
import ChartPage from "./assets/components/ChartPage";
import "./assets/styles/index.css";


function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<ScoringPage />} />
        <Route path="/charts" element={<ChartPage />} />
      </Routes>
    </Router>
  )

}
export default App;