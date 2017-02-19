'use strict'

require('isomorphic-fetch')

const express = require('express')
const line = require('node-line-bot-api')
const bodyParser = require('body-parser')

const messeger = require('./messenger')

const app = express()

const channelSecret = 'c4e4bee94a4699fafc214a5a725fb3f9'
const chanelAccessToken = '30oK3U/OYhAREtjGPWjZlQ5ecHRO+w5NmJBBrAT7fysZzfWeeHSRVrcBw5Nx/whRPN13sBSzINT78OyWuL5oRqUNet3qeqbsqEpzBspTmXz/YE5leFQqaCAk/PgyjsRz/pBjApw3ggH8iib1TnMfjQdB04t89/1O/w1cDnyilFU='

app.use(bodyParser.json({
  verify (request, response, buffer) {
    request.rawBody = buffer
  }
}))

// Initialize authentication
line.init({
	accessToken: chanelAccessToken,
	channelSecret: channelSecret
})

// Event handler
app.post('/webhook/', line.validator.validateSignature(), (request, response, next) => {
	// Your code here 

  // Get content from request body
  const promises = request.body.events
  	.map(event => {
	  	// Destruct used value from event(object)
	  	const { type, message: { text } } = event

	  	switch(true) {
	  		case type === 'message' && text.includes('สถานะ') : 
	  			return messeger.replyStatusTemplate(event, line)
	  		
	  		case event.type === 'message' && userMessage.includes('รดน้ำ') : 
	  			return messenger.replyWateringProcessMessage(event, line)
	  		
	  		case event.type === 'message' && userMessage.includes('เปิดไฟ') : 
	  			return messenger.replyTurningOnLightMessage(event, line)
	  		
	  		case event.type === 'message' && userMessage.includes('ปิดไฟ') : 
	  			return messenger.replyTurningOffLightMessage(event, line)

	  		default :
	  			return null
	  	}
  	})
  	.filter(x => x != null)

  Promise
    .all(promises)
    .then(() => response.json({success: true}))
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Example app listening on port 3000!')
})