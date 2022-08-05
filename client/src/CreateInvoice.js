import React, {useState, useEffect} from 'react'
import axios from 'axios';

const CreateInvoice = props => {

	// call backend to create an invoice and quote, return lnInvoice
	const getInvoice = (e) => {
		e.preventDefault();
		console.log(e.target.amountInput.value)

		let data = JSON.stringify({
			"handle": props.handle,
			"description": e.target.description.value,
			"amount": e.target.amountInput.value,
			"currency": props.currency
		})

		let config = {
			method: 'post',
			url: '/api/createInvoice',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			data : data
		}

		axios(config)
		.then((response) => {
			console.log(JSON.stringify(response.data))
			// TODO something with response.data.lnInvoice
			// create the qr-code and display it
			props.passUpInvoice(response.data);
		})
		.catch((error) => {
			console.log(error)
		})
	}
	
	return (
		<div className="CreateInvoice">
			<form onSubmit={getInvoice}>
				<div className="InvoiceDetails">
				<label> <p>{props.currency} to Send </p>
					<input type='number' step='.00000001' name='amountInput'/>
				</label>
				<label> <p> Description </p>
					<input id='description' type='text' name='description'/>
				</label>
				</div>
				<input type='submit' value='Create Invoice' name='submitButton'/>
			</form>
		</div>
		)
}

export default CreateInvoice;