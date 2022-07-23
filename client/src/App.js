import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'
import io from 'socket.io-client';
import GetAccount from './GetAccount.js'
import DisplayAccount from './DisplayAccount'
import QRCard from './QRCard'

function App() {

// establish socket port
const socket = io();

const [userInfo, setUserInfo] = useState();
const [invoiceAndQuote, setInvoiceAndQuote] = useState();
const [paidIndicator, setPaidIndicator] = useState(false);

// paid invoices come through as {invoiceId: 1234fake-invoice-id, status: 'PAID'}
socket.on('message', (res) => {
  console.log(res);
  handleSocketMessage(res);
})

// process the socket message. Check if it's invoiceId matches current invoiceId and check if status is PAID.
const handleSocketMessage = (res) => {
  console.log(invoiceAndQuote);
  console.log(invoiceAndQuote.invoice.invoiceId);
  console.log(res.invoiceId);
  console.log(res.status);
  // check to see if invoiceId matches current invoiceId AND is PAID
  if (res.invoiceId == invoiceAndQuote.invoice.invoiceId && res.status == 'PAID') {
    console.log('PAAIIIIDDDDD!!!!!!!');
    // set paid indicator to true to trigger UI
    setPaidIndicator(true);

    // delete invoiceAndQuote object, triggers UI
    setInvoiceAndQuote(null);
  }
}

// accepts the userInfo from the GetAccount component
const acceptUserInfo = (uInfo) => {
  console.log(uInfo);

  // save the state of the passed up user's info
  setUserInfo(uInfo);
}

// receives the invoiceAndQuote data object from displayAccount
const acceptInvoiceAndQuote = (invoiceObject) => {
  console.log(invoiceObject);
  setInvoiceAndQuote(invoiceObject);

  // reset's the paid indicator so that it's no longer rendered.
  setPaidIndicator(false);
}

  return (
    <div className="App">
    <h1> STRIKE API </h1>
      <GetAccount passUpUserInfo={acceptUserInfo}/>
      {userInfo && <DisplayAccount passUpInvoice={acceptInvoiceAndQuote} userInfo = {userInfo} /> }
      {invoiceAndQuote && <QRCard invoiceAndQuote={invoiceAndQuote}/>}
      {paidIndicator && <h1> PAAIIIDDD!!!!!! </h1>}
    </div>
  );
}

export default App;