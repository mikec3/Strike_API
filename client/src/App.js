import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'
import io from 'socket.io-client';
import GetAccount from './GetAccount.js'

function App() {

// establish socket port
const socket = io();

const [data, setData] = useState();
const [message, setMessage] = useState();

useEffect(()=>{

// When a message is sent from the server, setMessage() it to display it on screen.
socket.on('message', (res) => {
  console.log(res.message);
  setMessage(res.message.Customer);
})

}, [])

  return (
    <div className="App">
      <p>{!data ? "Loading..." : data} </p>
      <p>{!message ? "No Message Yet..." : message} </p>
      <GetAccount/>
    </div>
  );
}

export default App;