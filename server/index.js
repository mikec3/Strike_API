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

	  let config = {
	  method: 'get',
	  url: `https://api.strike.me/v1/accounts/handle/${req.body.handle}/profile`,
	  headers: { 
	    'Accept': 'application/json', 
	    'Authorization': process.env.STRIKE_API_KEY
	  }
	};


	axios(config)
	.then((response) => {
	  console.log(JSON.stringify(response.data));
	  res.json(response.data)
	})
	.catch((error) => {
	  console.log(error);
	  // responding with 'error' because that actual error displays the API token
	  res.json('error')
	});

});

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