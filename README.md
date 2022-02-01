<<<<<<< HEAD
<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">Moonpay integration</h3>

  <p align="center">
    Method of Moonpay integration
  </p>
</div>



<!-- ABOUT THE PROJECT -->
## About The Project

1. create moonpay account with business email by following link
		https://share.hsforms.com/1NFGIjk8zSy2wcL78W9izSA8mobe

2. Get api key using following link
		https://www.moonpay.com/dashboard/developers/

		test net publishable api key: "pk_test_HujosrJl5vx5M0M043cTD0qfgioJobiM"

3. test moonpay Integration with Flow Network

	creat and link Flow wallet with your email.
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
	1) open https://nft.ikonicc.ca/
	2) connect wallet
	3) select your preferred item, and touch "purchase" button

5. Switch to production mode

	Once you're happy with the integration, open following link and fill out affiliate form to enable your account for production.
		https://share.hsforms.com/1NC0xe6fgTEehfASP2dArRA8mobe
	After your account has been enabled, your live widget URL will appear here in the following format:
		https://buy.moonpay.com?apiKey={{yourLiveApiKey}}

	


<p align="right">(<a href="#top">back to top</a>)</p>
=======
# README =)

## Langauges & Plugins
* node.js
* React

## Strucutre
* /api : this runs the backend portion - javascript
* /web : This is the front end - node, express, onflow, 

## Branches
* / feature 
    * / uiux-design : used to implement front end design and graphics
    * / moonpay : used to implment Moonpay on front end
        * / purchase crypto
        * / purchase NFT direct
    * / FlowSmartContracts : Lets keep the smart contracts just in this branch
    * / development : all approved pulls will come in here
    * / production : only approved development will be merged in here
    * / demo-nft-sportscast-net : this is only for the demo.nft.sportscast.net

## Install
npm run build
npm run start

## EXECUTE
http://url.com:3003
eg: http://demonftsportscastnet-env.eba-hvmrz7hu.us-west-2.elasticbeanstalk.com:3003
>>>>>>> 85af9922f6f20dda6fb45408fa238adeb741925d
