import React from "react";
import { MdModelTraining } from "react-icons/md";

const Model = (props) => {
  return (
    <>
    {props.data.map((item)=>(
      item.model!==props.model && 
      <div
      style={{
        width: "250px",
        height: "120px",
        backgroundColor: "#fff",
        borderRadius: "0px 40px 0px 20px",
        }}
        >
        <div style={{ display: "flex", margin: "2%" }}>
          <MdModelTraining
            style={{ width: "44px", height: "45px", color: "#D99BFF" }}
            />
          <h1
            style={{
              fontSize: "22px",
              fontWeight: "500",
              lineHeight: "27px",
              margin: "4%",
            }}
            >
            {item.model}
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
          >
          <h2
            style={{
              fontSize: "15px",
              fontWeight: "400",
              lineHeight: "18px",
              color: "#575353",
            }}
            >
            Accuracy: {item.confidence}%
          </h2>
          <h2
            style={{
              fontSize: "15px",
              fontWeight: "400",
              lineHeight: "18px",
              color: "#575353",
            }}
            >
            Sentiment {item.prediction}
          </h2>
        </div>
      </div>
        ))}
    </>
  );
};

export default Model;
