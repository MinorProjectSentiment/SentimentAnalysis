import React from 'react'
import happy from '../assets/happy.png'
import sad from '../assets/sad.png'

const SentimentMeter = (props) => {
  return (
    <div style={{width:'298px', height:'536px', borderRadius:' 0px 50px 0px 30px', backgroundColor:'#fff'}}>
        <h1 style={{fontSize:'25px', fontWeight:'500', lineHeight:'30px', textAlign:'center', marginTop:'15%'}}>Sentiment Meter</h1>
        <div style={{width:'231px', height:'231px', border:'22px solid #04B2FC', borderRadius:'50%', margin:'auto', marginTop:'20%',display:'flex', justifyContent:'center', flexDirection:'column'}}>
            <img src={props.prediction==="Positive" ? happy : sad} alt="" style={{width:'60px', margin:'0px auto'}} />
            <h1 style={{fontSize:'20px', fontWeight:'800', textAlign:'center',marginTop:'10px', textTransform:'uppercase'}}>{props.prediction}</h1>
        </div>
    </div>
  )
}

export default SentimentMeter