import React from 'react'
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Cards = ({props}) => {
  return (
    <>
    <Card style={{ width: '18rem'}}>
      
    <Card.Img variant="top" src="https://spng.pngfind.com/pngs/s/609-6093177_smiling-face-png-pic-smiley-face-emoji-with.png" />
    <Card.Body>
      <Card.Title  style={{textAlign:'center'}}></Card.Title>
     <h5 style={{textAlign:'center',padding:'6px',width:'50%',margin:'auto',borderRadius:'6px',color:'#0bb398',backgroundColor:'#0bb39830',fontWeight:'600'}}>POSITIVE</h5>
      {/* <Button variant="primary">Go somewhere</Button> */}
    </Card.Body>
  </Card>
    </>
  )
}

export default Cards