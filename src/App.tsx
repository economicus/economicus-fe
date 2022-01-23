import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>It's Navigation.</div>

      <Routes>
        <Route path="/" element={<div>It's Main!</div>} />
        <Route path="/page1/*" element={<div>It's Page1.</div>} />
        <Route path="/page2/*" element={<div>It's Page2.</div>} />
      </Routes>

      <div>It's Footer.</div>
    </BrowserRouter>
  );
}

export default App;
