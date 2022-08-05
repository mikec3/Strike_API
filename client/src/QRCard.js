import React, {useState, useEffect} from 'react'
import QrDisplay from './QrDisplay.js'
import CountdownTimer from './CountdownTimer'

//QRCard displays the QRCode and details like expiration countdown, amount, etc...
const QRCard = (props) => {

	const [expired, setExpired] = useState(false);
	console.log(props);

	const timeInSeconds = props.invoiceAndQuote.quote.expirationInSec*1000;
  	const NOW_IN_MS = new Date().getTime();

  	const targetDate = NOW_IN_MS + timeInSeconds;

  	// receives a TRUE when the quote expires, this will conditionally render the QrDisplay
  	const receiveExpiredNotice = (isExpired) => {
  		setExpired(isExpired);
  	}

	return (
		<div>
			{!expired &&
				<React.Fragment>
					<h3> {props.invoiceAndQuote.quote.targetAmount.currency} : {props.invoiceAndQuote.quote.targetAmount.amount} </h3>
					<div className = 'QR'>
						<QrDisplay lnInvoice={props.invoiceAndQuote.quote.lnInvoice}/>
					</div>
					<h3> {props.invoiceAndQuote.invoice.state}</h3>
				</React.Fragment>
			}
			<CountdownTimer targetDate={targetDate} floatUpExpiredNotice={receiveExpiredNotice} />
		</div>
		)
}

export default QRCard;

