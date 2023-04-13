import React, { useState } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [formData, setFormData] = useState({
    text: "",
  });

  const navigate = useNavigate();
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
        localStorage.removeItem("Result");
        localStorage.setItem("Result", JSON.stringify(response.data.results));
        navigate("/result");
      })
      .catch((error) => {
        console.log(error, "bla");
      });
  }

  return (
    <>
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
        as="textarea" rows={6} 
          type="text"
          placeholder="Enter text"
          aria-label="Text"
          name="text"
          value={formData.text}
          onChange={handleInputChange}
          style={{ width: "95%" }}
        />
        <BsSearch
          style={{ fontSize: "20px", margin: "auto", cursor: "pointer" , color:'#fff'}}
          onClick={handleSubmit}
        />
      </Form>
    </>
  );
};

export default SearchBar;
