import React, {useState, useEffect} from 'react'

const DisplayAccount = props => {

	const [handle, setHandle] = useState();
	const [canReceive, setCanReceive] = useState();
	const [currencyDisplay, setCurrencyDisplay] = useState();

	useEffect(()=>{
		// only set variables if a user is present
		if (props.userInfo) {
			console.log(props.userInfo);
			setHandle(props.userInfo.handle);
			setCanReceive(props.userInfo.canReceive? 'True' : 'False');

			setCurrencyDisplay(
				props.userInfo.currencies.map(curr=> {
					let invoiceable = curr.isInvoiceable? 'Invoiceable' : 'Not Invoiceable';
					return (
						<div key={curr.currency}>
							<p> {curr.currency} : {invoiceable} </p>
						</div>
						)
				})
			)
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