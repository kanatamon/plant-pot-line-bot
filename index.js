'use strict'

const express = require('express')
const app = express()

app.get('/', (request, response) => {
	response.send(`Hello, I'am bot`)
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Example app listening on port 3000!')
})