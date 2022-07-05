import {useEffect, useState} from 'react'
import axios from 'axios'

const GetAccount = props => {

	const [userInfo, setUserInfo] = useState();

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
			setUserInfo(JSON.stringify(response.data));
		})
		.catch((error) => {
  		console.log(error);
		});

	}
	
	return (
		<div>
			<form onSubmit={getAccountInfo}>
				<input type='text' name='handleInput'/>
				<input type='submit' value='Get Account Info' name='submitButton'/>
			</form>
			<p> {!userInfo ? "No User Loaded..." : userInfo} </p>
		</div>
	)
}

export default GetAccount;