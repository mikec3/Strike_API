# Testing STRIKE API with a React front end

# User Experience

## Enter Username
[Enter Username Screenshot!](/client/public/Enter_Username.png "Enter Username")

## Enter Invoice Details
[Enter Invoice Details Screenshot!](/client/public/Enter_Invoice.png "Enter Invoice Details")

## Pay Lightning Invoive QR Code
[Lightning Invoice QR Code Screenshot!](/client/public/QR_Code.png "Lightning Invoice QR Code")

## Payment Success
[Payment Success Screenshot!](/client/public/Payment_Success.png "Payment Success")

## Keeps API keys secret

#### Combines these tutorials:

##### websockets
* https://socket.io/get-started/chat
* https://www.youtube.com/watch?v=9HFwJ9hrmls

1. Install ngrok
`brew install ngrok/ngrok/ngrok`
2. Add auth-token
`ngrok config add-authtoken TOKEN`
3. Expose localport to ngrok tunnel
`ngrok http 3001`

##### deployment and api secrets
* https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/
* https://www.youtube.com/watch?v=FcwfjMebjTU
* https://github.com/kubowania/crypto-dashboard-react/blob/main/index.js


## Overview to deploy React/Node app to Heroku

1. create a new project folder
2. `npm init -y`
3. alter the package.json file
```
"scripts": {
	"start" : "node server/index.js",
	"build" : "cd client && npm install && npm run build"
},
"engines": {
	"node" : "16.3.0" // REPLACE_WITH_YOUR_VERSION
}
```
4. Create a front end & remove the default git repo (we're using git at the root folder of this project)
```
  npx create-react-app client
  cd client
  rm -rf .git
```
5. Create an account on Heroku.com and create a new app
6. Install heroku command line tool
```
sudo npm i -g heroku `
heroku login `
git init
heroku git:remote -a insert-your-app-name-here
git add .
git commit -m "Deploy app to Heroku"
git push heroku master
```
7. Create a github repo as well and copy the URL. You can check which remotes to send repo to by using `git remote -v `
```
git remote add <custom_name_for_this_remote> <github-url>
git push <custom_name_for_this_remote> master 
```
## Hide API Keys
1. Create a .env file and populate with API keys like so:
```
MY_SECRET_FAKE_API_KEY=secret_fake_api_key_1234
```
2. Create a .gitignore file and populate with:
```
.env
```
3. Add require dotenv to node scripts
```
require('dotenv').config()
```
4. Reference env variable in node scripts as:
```
process.env.MY_SECRET_FAKE_API_KEY
```
5. Update Heroku console with environment variable in -> Settings -> Config Vars
6. Now you can redeploy to heroku and your environment variables (api keys) will be hidden.
```
git add .
git commit -m "added environment variables"
git push heroku master
```
