import React, {useState, useEffect} from 'react'
import QrDisplay from './QrDisplay.js'
import CountdownTimer from './CountdownTimer'

//QRCard displays the QRCode and details like expiration countdown, amount, etc...
const QRCard = (props) => {
	console.log(props);

	const timeInSeconds = props.invoiceAndQuote.quote.expirationInSec*1000;
  	const NOW_IN_MS = new Date().getTime();

  	const targetDate = NOW_IN_MS + timeInSeconds;

	return (
		<div>
			<p> {props.invoiceAndQuote.quote.targetAmount.currency} : {props.invoiceAndQuote.quote.targetAmount.amount} </p>
			<QrDisplay lnInvoice={props.invoiceAndQuote.quote.lnInvoice}/>
			<p> {props.invoiceAndQuote.invoice.state}</p>
			<CountdownTimer targetDate={targetDate} />
		</div>
		)
}

export default QRCard;