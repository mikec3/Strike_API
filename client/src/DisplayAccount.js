import React, {useState, useEffect} from 'react'
import CreateInvoice from './CreateInvoice.js'
import QrDisplay from './QrDisplay.js'
import CountdownTimer from './CountdownTimer'

const DisplayAccount = props => {

	const [handle, setHandle] = useState();
	const [canReceive, setCanReceive] = useState();
	const [currencyDisplay, setCurrencyDisplay] = useState();
	const [qr, setqr] = useState();
	const [invoiceAndQuote, setInvoiceAndQuote] = useState();

	// receives the invoiceAndQuote data from CreateInvoice component
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

		// send the invoiceAndQuote object to parent component
		props.passUpInvoice(invoiceAndQuote);
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
		</div>
		)
}

export default DisplayAccount;