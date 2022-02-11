# README

## Langauges & Plugins
* node.js
* React
* MoonPay - https://www.moonpay.com/
* AWS KMS 

## Strucutre
* /api : this runs the backend portion - javascript
* /web : This is the front end - node, express, onflow, 

## Branches
* / feature 
    * / uiux-design : used to implement front end design and graphics
    * / moonpay : used to implment Moonpay on front end
    * / FlowSmartContracts : Lets keep the smart contracts just in this branch
* / development : all approved pulls will come in here
* / production : only approved development will be merged in here
    * / demo-nft-sportscast-net : this is only for the demo.nft.sportscast.net

## AWS KMS
You can use plaintext or encrypt the secrets to be more secure
you will find documentation
file: /api/src/utils/encrypt.js

## Setup
 * 1 - Generate Private/Public keys
 	* > flow keys generate
 * 2 - Create wallet
	* https://testnet-faucet.onflow.org
 * 3 enable FUSD value?
 * 4 Deploy SmartContracts
	* https://docs.onflow.org/flow-cli/account-add-contract/
	* > flow project deploy --network=testnet
 * 5 update StoreFront code
	* > .env files
 * 6  use the MintPanel to setup everything
	* > https://demo.nft.sportscast.net/mintpanel 
		* a) Upload Assets to IPFS (Series + Editions)
		* b) Create Series (eg. Zeb Nolan)
		* c) Create Edition (eg. White, Pink, Orange, Prizm, Gold)


## Install
npm run start
 To run this project you should build via lerna (monorepo tool)

Run this commands:

```
npm install
npm run build
npm run start
```

if npm alias does not work for any problem on package.json

```
npm install
npx lerna exec npm install && npx lerna exec npm run build
node api/dist/index.js
```

## EXECUTE
http://url.com:3003
eg: http://demonftsportscastnet-env.eba-hvmrz7hu.us-west-2.elasticbeanstalk.com:3003


## MoonPay

1. create moonpay account with business email by following link
		https://share.hsforms.com/1NFGIjk8zSy2wcL78W9izSA8mobe

2. Get api key using following link
		https://www.moonpay.com/dashboard/developers/

		test net publishable api key: "pk_test_HujosrJl5vx5M0M043cTD0qfgioJobiM"

3. test moonpay Integration with Flow Network

	creat and link Flow wallet with your email
		open https://nft.ikonicc.ca/
		and touch "Connect" button, then touch "Blocto Testnet"
		create flow wallet with your own email
	Funding Flow/FUSD coins to my flow wallet using following service
		https://testnet-faucet.onflow.org/fund-account
		you can deposit 1000 Flow coins and 300 FUSD to your wallet
		when you deposit test coin, you need to fill verification code from your email.
	call following request on click "Deposit" button
		for test net
		"https://buy-sandbox.moonpay.com/?apiKey=pk_test_HujosrJl5vx5M0M043cTD0qfgioJobiM&defaultCurrencyCode=flow&showOnlyCurrencies=flow%2Cfusd";

		for live net
		"https://buy.moonpay.com/?apiKey=pk_live_HujosrJl5vx5M0M043cTD0qfgioJobiM&defaultCurrencyCode=flow&showOnlyCurrencies=flow%2Cfusd";

		how to update Code from our project
			web\src\pages\navbar.js
				line 30: handleDeposit function
					window.open("https://buy-sandbox.moonpay.com/?apiKey=pk_test_HujosrJl5vx5M0M043cTD0qfgioJobiM&defaultCurrencyCode=flow&showOnlyCurrencies=flow%2Cfusd", "deposit", "width=600,height=400");
		If you need to deposit again, you need to verify your account using your passport.
		You can use test visa card for test. VISA Card No : 4242 4242 4242 4242

4. purchasing test the NFT item
	1) open https://demo.nft.sportscast.net
	2) connect wallet
	3) select your preferred item, and touch "purchase" button

5. Switch to production mode

	Once you're happy with the integration, open following link and fill out affiliate form to enable your account for production.
		https://share.hsforms.com/1NC0xe6fgTEehfASP2dArRA8mobe
	After your account has been enabled, your live widget URL will appear here in the following format:
		https://buy.moonpay.com?apiKey={{yourLiveApiKey}}
