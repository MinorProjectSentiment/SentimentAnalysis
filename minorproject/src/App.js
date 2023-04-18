import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Result from "./pages/Result";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";


const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}>
        </Route>
        <Route path="/result" element={<Result />}>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;
