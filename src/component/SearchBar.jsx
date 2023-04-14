import React, { useState } from "react";
import axios from "axios";
import { BsArrowRightShort } from "react-icons/bs";
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
    if (formData.text != '') {
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
    else
    {
      navigate("/")
    }
  }



  return (
    <>
      <Form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          margin: "auto",
          justifyContent: "space-around",
          flexDirection: "column",
        }}
      >
        <Form.Control
          as="textarea"
          rows={6}
          type="text"
          placeholder="Enter text"
          aria-label="Text"
          name="text"
          value={formData.text}
          onChange={handleInputChange}
          className="input-search"
          style={{ width: "858px",height:'112px' ,borderRadius:'0px 30px', backgroundColor:'#DDDEE5'}}
        />
        <div
          style={{
            display: "flex",
            width: "208px",
            height: "60px",
            borderRadius: "0px 30px",
            backgroundColor: "#192fc8b5",
            justifyContent: "center",
            margin: "7% auto",
            padding: "7px",
            cursor: "pointer",
          }}
          onClick={handleSubmit}
        >
          <h1 style={{ fontSize: "30px", fontWeight: "400", color: "#fff" }}>
            Analyse
          </h1>
          <BsArrowRightShort style={{ color: "#fff", fontSize: "35px" }} />
        </div>
      </Form>
    </>
  );
};

export default SearchBar;
