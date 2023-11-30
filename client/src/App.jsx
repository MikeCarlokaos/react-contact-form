import React from "react";
import { Routes, Route } from "react-router-dom";
import Form from "./pages/Contact";
import ThankYou from "./pages/ThankYou";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/thank-you" element={<ThankYou />} />
    </Routes>
  );
}

export default App;
