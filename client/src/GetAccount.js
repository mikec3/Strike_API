import {useEffect, useState} from 'react'
import axios from 'axios'

const GetAccount = props => {

	const [userInfo, setUserInfo] = useState(false);
	const [error, setError] = useState(false);

	// send handle to server, server requests account info by handle and returns results
	const getAccountInfo = (e) => {
		e.preventDefault(); // prevent page re-load
		console.log(e.target.handleInput.value)
		let data = JSON.stringify({
			"handle": e.target.handleInput.value
		})

		let config = {
			method : 'post',
			url: '/api/getAccount',
			headers: {
				    'Content-Type': 'application/json', 
    				'Accept': 'application/json'
			},
			data : data
		};

		axios(config)
		.then((response) => {
			console.log(JSON.stringify(response.data))
			if (response.data != 'error') {
			setUserInfo(response.data);

			// send the userInfo back up to parent component
			props.passUpUserInfo(response.data);
			setError(false);
			} else {
			setUserInfo(false);
			setError('User not found')
			}
		})
		.catch((error) => {
  		console.log(error);
		});
	}
	
	return (
		<div>
			<form onSubmit={getAccountInfo}>
				<div className='InvoiceDetails'>
					<label> <p> Username </p>
						<input type='text' name='handleInput'/>
					</label>
				</div>
				<input type='submit' value='Get Account Info' name='submitButton'/>
				
			</form>
			{error}
		</div>
	)
}

export default GetAccount;