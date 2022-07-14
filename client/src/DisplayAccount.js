import React, {useState, useEffect} from 'react'
import CreateInvoice from './CreateInvoice.js'
import QrDisplay from './QrDisplay.js'

const DisplayAccount = props => {

	const [handle, setHandle] = useState();
	const [canReceive, setCanReceive] = useState();
	const [currencyDisplay, setCurrencyDisplay] = useState();
	const [qr, setqr] = useState();

	const passUpInvoice = (invoiceAndQuote) => {
		//console.log(invoiceAndQuote)
		//console.log(invoiceAndQuote.invoice.invoiceId)
		//console.log(invoiceAndQuote.quote.lnInvoice)
		//console.log(invoiceAndQuote.quote.expirationInSec)
		//console.log(invoiceAndQuote.quote.targetAmount.amount)
		//console.log(invoiceAndQuote.quote.targetAmount.currency)

		setqr(
			<div>
				<p> {invoiceAndQuote.quote.targetAmount.currency} : {invoiceAndQuote.quote.targetAmount.amount} </p>
				<QrDisplay lnInvoice={invoiceAndQuote.quote.lnInvoice}/>
				<p> invoiceAndQuote.invoice.state </p>
				<p> Expires in: {invoiceAndQuote.quote.expirationInSec} </p>
			</div>
		)
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
	}, [props])

	return (
		<div>
		<p> User Handle: {handle} </p>
		<p> Can Receive: {canReceive} </p>
		{currencyDisplay}
		{qr}
		</div>
		)
}

export default DisplayAccount;