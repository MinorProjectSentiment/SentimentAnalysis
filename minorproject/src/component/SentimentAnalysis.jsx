import React from "react";
import BarGraph from "./BarGraph";
import CircularProgress from "./Circular_progressbar";
import { VscCircleLargeFilled } from "react-icons/vsc";

const SentimentAnalysis = (props) => {

  const model = [
    {name:"SNN", color:'#1AE708'},
    {name:"CNN", color:'#BC1B03'},
    {name:"LSTM", color:'#099CB9'},
    {name:"BILSTM", color:'#B96005'},
    {name:"Hybrid", color:'#000'}
  ]

  return (
    <>
      <div
        style={{
          width: "624px",
          height: "536px",
          backgroundColor: "#fff",
          borderRadius: "30px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h1
              style={{
                fontSize: "25px",
                fontWeight: "500",
                lineHeight: "30px",
                textAlign: "center",
                marginTop: "15%",
              }}
            >
              Sentiment Analysis
            </h1>
            <BarGraph data={props.data} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "12% auto",
            }}
          >
            <h1
              style={{
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "19px",
                color: "#575353",
              }}
            >
              Favourable Accuracy by
            </h1>
            <h1
              style={{
                fontSize: "25px",
                fontWeight: "500",
                lineHeight: "30px",
              }}
            >
              {props.model}
            </h1>
            <CircularProgress percentage={props.confidence} />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          {model.map((item)=>(
            <div style={{display:'flex'}}>
            <VscCircleLargeFilled style={{ color:item.color, margin:'auto 2px' }} />
            <h1 style={{fontSize:'15px', fontWeight:'400',margin:'auto 2px'}}>{item.name}</h1>
          </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SentimentAnalysis;
