'use strict'

require('isomorphic-fetch')

const express = require('express')
const line = require('node-line-bot-api')
const bodyParser = require('body-parser')

const app = express()

const readTemperature = require('./api').readTemperature

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

// Event message handler
app.post('/webhook/', line.validator.validateSignature(), (request, response, next) => {
  // Get content from request body
  const promises = request.body.events.map(event => {
  	// Handle event message
    if (event.type === 'message') {
    	return 	
    		readTemperature()
					.then(json => line.client
						.replyMessage({
				      replyToken: event.replyToken,
				      messages: [
				        {
				          type: 'text',
				          text: `ตอนนี้อุณหภูมิอยู่ที่ ${json[0].payload} c`
				        }
				      ]
				    })
					)
    }
  })

  Promise
    .all(promises)
    .then(() => response.json({success: true}))
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Example app listening on port 3000!')
})