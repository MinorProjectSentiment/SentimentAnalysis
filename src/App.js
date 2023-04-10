import React from 'react'
import Cards from './component/Cards'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import './App.css';

const App = () => {
  return (
    <>
    <div style={{marginTop:'5%'}}>
    <h1 style={{textAlign:'center'}}>Sentiment analysis of a paragraph</h1>
    <Form>

    <Form.Control
        type="text"
        placeholder="Enter text"
        aria-label="Text"
        style={{width:'50%',margin:'auto',marginTop:'2%'}}
        />
        </Form>
    <div style={{display:'flex', justifyContent:'space-around',width:'80%',margin:'auto',marginTop:'6%'}}>

    <Cards title="Good"/>
    <Cards title="Bad"/>
    </div>
    </div>
    </>
  )
}

export default App