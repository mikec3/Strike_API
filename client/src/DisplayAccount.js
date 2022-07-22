import React, {useState, useEffect} from 'react'
import CreateInvoice from './CreateInvoice.js'
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

const DisplayAccount = props => {

	const [handle, setHandle] = useState();
	const [canReceive, setCanReceive] = useState();
	const [currencyDisplay, setCurrencyDisplay] = useState();
	const [qr, setqr] = useState();
	const [invoiceAndQuote, setInvoiceAndQuote] = useState();

	const passUpInvoice = (invoiceAndQuote) => {
		//console.log(invoiceAndQuote)
		//console.log(invoiceAndQuote.invoice.invoiceId)
		//console.log(invoiceAndQuote.quote.lnInvoice)
		//console.log(invoiceAndQuote.quote.expirationInSec)
		//console.log(invoiceAndQuote.quote.targetAmount.amount)
		//console.log(invoiceAndQuote.quote.targetAmount.currency)

		// set the invoice and quote object to the invoiceAndQuote reference, 
		// will be passed as props and checked for conditional rendering
		setInvoiceAndQuote(invoiceAndQuote);
	}

	useEffect(()=>{
		// only set variables if a user is present
		if (props.userInfo) {
			console.log(props.userInfo);
			setHandle(props.userInfo.handle);
			setCanReceive(props.userInfo.canReceive? 'True' : 'False');

			setCurrencyDisplay(
				props.userInfo.currencies.map(curr=> {
					if (curr.isInvoiceable){
					return (
						<div key={curr.currency}>
							<p> {curr.currency} : </p>
							<CreateInvoice currency={curr.currency} 
								handle={props.userInfo.handle}
								passUpInvoice={passUpInvoice}
								/>
						</div>
						)
					} 
				}))
		}
		// if an invoiceAndQuote have been recieved by this component, display the QR card
		if (invoiceAndQuote) {
			// maybe delete this
			console.log('invoiceAndQuote has been received')
		}
	}, [props])

	return (
		<div>
		<p> User Handle: {handle} </p>
		<p> Can Receive: {canReceive} </p>
		{currencyDisplay}
		{invoiceAndQuote && <QRCard invoiceAndQuote={invoiceAndQuote}/>}
		</div>
		)
}

export default DisplayAccount;