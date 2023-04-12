import React, { useState } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import MyContext from "../context/MyContext";
import Cards from "./Cards";
import sad from "../assets/sad.png";
import happy from "../assets/happy.png";

const SearchBar = () => {
  const [formData, setFormData] = useState({
    text: "",
  });

  const [result, setresult] = useState([])

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    console.log("submit");
    event.preventDefault();

    axios
      .post("http://localhost:5000/predict_sentiment", formData)
      .then((response) => {
        console.log(response.data.results);
        setresult(response.data.results);
      })
      .catch((error) => {
        console.log(error, "bla");
      });
  }
console.log("result", result)

let Sentiment = "none";
if (result != 0) {
   Sentiment = result[0].prediction;
  
}

  return (
    <>
      <MyContext.Provider value={result}>
        <Form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            width: "50%",
            margin: "auto",
            marginTop: "2%",
            justifyContent: "space-around",
          }}
        >
          <Form.Control
            type="text"
            placeholder="Enter text"
            aria-label="Text"
            name="text"
            value={formData.text}
            onChange={handleInputChange}
            style={{ width: "95%" }}
            //   style={{ width: "50%", margin: "auto", marginTop: "2%" }}
          />
          <BsSearch
            style={{ fontSize: "20px", margin: "auto", cursor: "pointer" }}
            onClick={handleSubmit}
          />
        </Form>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "80%",
            margin: "auto",
            marginTop: "6%",
          }}
        >
         
        <Cards
            title="Good"
            img={happy}
            result="POSITIVE"
            resultbg="#0bb39830"
            resultcol="#0bb398"
            cardbg = {Sentiment==="Positive" ? "#251008" : "none"}
            />
          <Cards
            title="Bad"
            img={sad}
            result="NEGATIVE"
            resultbg="#ff000036"
            resultcol="red"
            cardbg = {Sentiment==="Negative" ? "#251008" : "none"}
            />
            </div>
      </MyContext.Provider>


    </>
  );
};

export default SearchBar;
