import React, { useContext } from "react";
import Cards from "./component/Cards";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import sad from "./assets/sad.png";
import happy from "./assets/happy.png";
import SearchBar from "./component/SearchBar";
import MyContext from "./context/MyContext";


const App = () => {

  // const data = useContext(MyContext);
  // console.log(data)

  return (
    <>
      <div style={{ marginTop: "5%" }}>
        <h1 style={{ textAlign: "center" }}>
          Sentiment analysis of a paragraph
        </h1>
        <SearchBar/>
        
      </div>
    </>
  );
};

export default App;
