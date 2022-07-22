import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'
import io from 'socket.io-client';
import GetAccount from './GetAccount.js'
import DisplayAccount from './DisplayAccount'

function App() {

// establish socket port
const socket = io();

const [data, setData] = useState();
const [message, setMessage] = useState();
const [userInfo, setUserInfo] = useState();

useEffect(()=>{

// When a message is sent from the server, setMessage() it to display it on screen.
// paid invoices come through as {invoiceId: 1234fake-invoice-id, status: 'PAID'}
socket.on('message', (res) => {
  console.log(res);
  //setMessage(res.message.Customer);
})

}, [])

// accepts the userInfo from the GetAccount component
const acceptUserInfo = (uInfo) => {
  console.log(uInfo);

  // save the state of the passed up user's info
  setUserInfo(uInfo);
}

  return (
    <div className="App">
      <p>{!data ? "Loading..." : data} </p>
      <p>{!message ? "No Message Yet..." : message} </p>
      <GetAccount passUpUserInfo={acceptUserInfo}/>
      {userInfo && <DisplayAccount userInfo = {userInfo} /> }
    </div>
  );
}

export default App;