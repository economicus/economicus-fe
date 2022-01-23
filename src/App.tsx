import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>It&apos;s Navigation.</div>
      {/* <div>It's Navigation.</div> */}
      {/* NOTE: "'"를 &apos; 등으로 대치하라고 eslint에서 에러 */}

      <Routes>
        <Route path="/" element={<div>It&apos;s Main!</div>} />
        <Route path="/page1/*" element={<div>It&apos;s Page1.</div>} />
        <Route path="/page2/*" element={<div>It&apos;s Page2.</div>} />
      </Routes>

      <div>It&apos;s Footer.</div>
    </BrowserRouter>
  );
}

export default App;
