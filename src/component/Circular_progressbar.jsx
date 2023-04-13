import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../App.css'

const CircularProgress = ({ percentage }) => {
  return (
    <div style={{ width: '200px', height: '200px', marginTop:'7%' }}>
      <CircularProgressbar value={percentage} text={` ${percentage}%`} stroke={'#0D51FF'} strokeWidth={10}  />
    </div>
  );
};

export default CircularProgress;
