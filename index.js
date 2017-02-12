'use strict'

require('isomorphic-fetch')

const express = require('express')
const line = require('node-line-bot-api')
const bodyParser = require('body-parser')

const app = express()

const channelSecret = 'c4e4bee94a4699fafc214a5a725fb3f9'
const chanelAccessToken = '30oK3U/OYhAREtjGPWjZlQ5ecHRO+w5NmJBBrAT7fysZzfWeeHSRVrcBw5Nx/whRPN13sBSzINT78OyWuL5oRqUNet3qeqbsqEpzBspTmXz/YE5leFQqaCAk/PgyjsRz/pBjApw3ggH8iib1TnMfjQdB04t89/1O/w1cDnyilFU='


const readTemperature = () => {
	return fetch('https://api.netpie.io/topic/PlantPot2/sensor/LightLevel?auth=Y35OK6MFGX5TQm1:eIjiYDLmUhznX6xMPVCLsVGRg')
				  .then((response) => {
			      if (response.status >= 400) {
		          throw new Error("Bad response from server");
			      }
			      return response.json();
				  })
}

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
    // Reply message
    if (event.message.text === 'temperature') {
    	return readTemperature( json => {
    		return line.client
					      .replyMessage({
					        replyToken: event.replyToken,
					        messages: [
					          {
					            type: 'text',
					            text: json[0].payload
					          }
					        ]
					      })	
    	})
    	
    }

  })

  Promise
    .all(promises)
    .then(() => response.json({success: true}))
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Example app listening on port 3000!')
})