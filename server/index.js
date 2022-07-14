// server/index.js

const express = require("express");
const path = require('path');
const bodyParser = require("body-parser")
require('dotenv').config();
const http = require('http');
const {Server} = require('socket.io');
const axios = require('axios');

const PORT = process.env.PORT || 3001;

const app = express();

const server = http.createServer(app);
const io = new Server(server);

// using this for reading webhook posts
app.use(bodyParser.json())

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// recieves the user handle from client, makes the api call to STrike and returns user details
app.post("/api/getAccount", (req, res) => {
	// use secret api keys with process.env.STRIKE_API_KEY
	  console.log(req.body);

	  // construct strike.api payload for getting account info by handle
	  let config = {
	  method: 'get',
	  url: `https://api.strike.me/v1/accounts/handle/${req.body.handle}/profile`,
	  headers: { 
	    'Accept': 'application/json', 
	    'Authorization': process.env.STRIKE_API_KEY
	  	}
	  };

	// handle api call and return response to front end
	axios(config)
	.then((response) => {
	  console.log(JSON.stringify(response.data));
	  res.json(response.data)
	})
	.catch((error) => {
	  console.log(error);
	  // responding with 'error' because the actual error displays the API token
	  res.json('error')
	});

});

// receives the user handle, currency, and amount to invoice. Makes api calls to Strike and returns a lnInvoice to front end
app.post("/api/createInvoice", async function(req, res) {
	console.log(req.body);
	let data = JSON.stringify({
		'correlationId' : Math.random()*1000,
		'description': req.body.description,
		'amount': {
			'currency': req.body.currency,
			'amount': req.body.amount
		}
	})

	let config = {
		method: 'post',
		url: `https://api.strike.me/v1/invoices/handle/${req.body.handle}`,
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': process.env.STRIKE_API_KEY
		},
		data : data
	}

	// make invoice api call and catch errors.
	try {
		let invoiceResponse = await axios(config);
		console.log(invoiceResponse.data);

		// use invoice number to create a quote
		let quoteResponse = await getQuote(invoiceResponse.data.invoiceId)
		console.log(quoteResponse)

		// combine the invoice response and quote response to return to the front end
		let invoiceAndQuote = {
			invoice: invoiceResponse.data,
			quote: quoteResponse
		}

		// return the combined invoiceAndQuote Object to the front end
		res.json(invoiceAndQuote)
		
	} catch(err) {
		console.log(err.response.config.data)
		res.json(err.response.config.data);
	}
})

// give an invoiceId and return an lnInvoice quote
const getQuote = async function(invoiceId) {

	let config = {
		method: 'post',
		url: `https://api.strike.me/v1/invoices/${invoiceId}/quote`,
		headers: {
			'Accept': 'application/json',
			'Content-Length': '0',
			'Authorization': process.env.STRIKE_API_KEY
		}
	}

	// make quote call and catch errors
	// return api response data to calling function
	try{
		let quoteResponse = await axios(config);
		return quoteResponse.data;

	} catch(err) {
		console.log(err.response.config.data)
		return err.response.config.data;
	}
}


// webhooks will be posted here
app.post("/hook", (req, res) => {
  console.log(req.body) // Call your action on the request here
  res.status(200).end() // Responding is important

  // Send a message up from the server to the clients. This will go to all connected clients
  io.emit('message', {message: req.body})
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// WEBSOCKETS!!!!
// on connection console log the unique id for the client
io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(socket.id);
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});