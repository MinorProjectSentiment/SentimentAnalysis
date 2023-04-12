import React from 'react';
import BarChart  from 'react-bar-chart';

const data = [
  { text: 'January', value: 12 },
  { text: 'February', value: 19 },
  { text: 'March', value: 3 },
  { text: 'April', value: 5 },
  { text: 'May', value: 2 },
  { text: 'June', value: 3 },
];

const BarGraph = () => {
  return (
    <div>
      <h2>Bar Chart</h2>
      {/* <BarChart/> */}
      <BarChart
        width={500}
        height={300}
        margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
        data={data}
        yAxisLabel="Sales"
        xAxisLabel="Month"
      />
    </div>
  );
};

export default BarGraph;
