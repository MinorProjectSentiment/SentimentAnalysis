import React from "react";
import BarChart from "react-bar-chart";

const margin = { top: 10, right: 20, bottom: 30, left: 40 };

const BarGraph = (props) => {
  const data = [
    {
      text: props.data[0].model.split(" ")[0],
      value: props.data[0].confidence,
    },
    {
      text: props.data[1].model.split(" ")[0],
      value: props.data[1].confidence,
    },
    {
      text: props.data[2].model.split(" ")[0],
      value: props.data[2].confidence,
    },
    {
      text: props.data[3].model.split(" ")[0],
      value: props.data[3].confidence,
    },
    {
      text: props.data[4].model.split(" ")[0],
      value: props.data[4].confidence,
    },
  ];

  return (
    <div style={{ marginTop: "20%" }}>
      <BarChart  width={297} height={265} margin={margin} data={data} />
    </div>
  );
};

export default BarGraph;
