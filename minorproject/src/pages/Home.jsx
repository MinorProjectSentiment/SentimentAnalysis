import React from 'react'
import SearchBar from '../component/SearchBar'

const Home = () => {
  return (
    <>
    <div
        style={{
          width: "1280px",
          height: "792px",
          background: "rgba(47, 45, 45, 0.55)",
          borderRadius: "0px 80px 0px 50px",
          margin: "auto",
          marginTop: "5%",
          display:'flex',
          flexDirection:'column',
          justifyContent:'space-evenly'
        }}
      >
        
        <h1 style={{fontSize:'36px', fontWeight:'700', color:'#fff', lineHeight:'44px',textAlign:'center', margin:'5% auto'}}>Identifying Sentiments of a Paragraph (Semantic Analysis)</h1>
        <h2 style={{fontSize:'28px', fontWeight:'500', color:'#DDDEE5', lineHeight:'34px',textAlign:'center'}}>Extract Sentiment from your text:</h2>
        <SearchBar/>
      </div>
    </>
  )
}

export default Home