import React, { useContext, useEffect, useState } from "react";
// import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
// import MyContext from "../context/MyContext";

const Cards = (props) => {
  return (
    <>
      <Card style={{ width: "18rem", backgroundColor: props.cardbg }}>
        <Card.Img variant="top" src={props.img} />
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>{props.title}</Card.Title>
          <h5
            style={{
              textAlign: "center",
              padding: "6px",
              width: "50%",
              margin: "auto",
              borderRadius: "6px",
              color: props.resultcol,
              backgroundColor: props.resultbg,
              fontWeight: "600",
            }}
          >
            {props.result}
          </h5>
        </Card.Body>
      </Card>
    </>
  );
};

export default Cards;
