import React from "react";
import Model from "../component/Model";
import SentimentAnalysis from "../component/SentimentAnalysis";
import SentimentMeter from "../component/SentimentMeter";

const Result = () => {
  const data = JSON.parse(localStorage.getItem("Result"));
  const val = data.map((val) => val.confidence);
  const maxNumber = Math.max(...val);
  const maxIndex = val.indexOf(maxNumber);

  return (
    <>
        {/* <IoIosArrowBack  style={{color:'#fff', fontSize:'20px'}}/> */}
      <div
        style={{
          width: "1280px",
          height: "792px",
          background: "rgba(47, 45, 45, 0.55)",
          borderRadius: "0px 80px 0px 50px",
          margin: "auto",
          marginTop: "5%",
        }}
      >
        


        <h1
          style={{
            fontSize: "36px",
            color: "#ffffff",
            fontWeight: "700",
            fontFamily: "Inter",
            textAlign: "center",
            paddingTop: "2%",
          }}
          >
          Identifying Sentiments of the Text
        </h1>
        
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            margin: "6% 0px ",
          }}
        >
          <SentimentMeter prediction={data[maxIndex].prediction}/>
          <SentimentAnalysis confidence={maxNumber} model={data[maxIndex].model} data={data} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <Model data={data} model={data[maxIndex].model}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;
