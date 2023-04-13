import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SearchBar from "./component/SearchBar";
import Result from "./pages/Result";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchBar />}>
        </Route>
        <Route path="/result" element={<Result />}>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;
