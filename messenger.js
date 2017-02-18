const api = require('./api')
const StatusTemplate = require('./components/StatusTemplate')

const replyStatusTemplate = (event, line) => api.getSensorValues()
	.then(values => line.client.replyMessage(
		StatusTemplate(event.replyToken, values)
	))



module.exports.replyStatusTemplate = replyStatusTemplate