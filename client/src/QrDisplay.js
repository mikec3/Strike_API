import React, {useState, useEffect} from 'react'
import QRCode from 'react-qr-code'

const QrDisplay = props => {
	
	return (
		<div>
			<QRCode
			value={props.lnInvoice}
			/>
		</div>
	)
}

export default QrDisplay;