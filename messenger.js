const api = require('./api')
const StatusTemplate = require('./components/StatusTemplate')



const replyStatusTemplate = (event, line) => api.getSensorValues()
	.then(values => line.client.replyMessage(
		{
			replyToken: event.replyToken,
			messages: [StatusTemplate(values)]
		}
	))

// Need implement
const replyWateringProcessMessage = (event, line) => line.client.replyMessage({
	replyToken: event.replyToken,
	messages: [
		{
	    type: "text",
	    text: "กำลังรดน้ำ"
  	}
	]
}) 

// Need implement
const replyFinishingWateringMessage = (event, line) => line.client.replyMessage({
	replyToken: event.replyToken,
	messages: [
		{
	    type: "text",
	    text: "รดน้ำเสร็จแล้ว"
  	}
	]
}) 

// Need implement
const replyTurningOnLightMessage = (event, line) => line.client.replyMessage({
	replyToken: event.replyToken,
	messages: [
		{
	    type: "text",
	    text: "เปิดไฟแล้ว"
  	}
	]
}) 

// Need implement
const replyTurningOffLightMessage = (event, line) => line.client.replyMessage({
	replyToken: event.replyToken,
	messages: [
		{
	    type: "text",
	    text: "ปิดไฟแล้ว"
  	}
	]
}) 



module.exports.replyStatusTemplate = replyStatusTemplate
module.exports.replyWateringProcessMessage 		= replyWateringProcessMessage
module.exports.replyFinishingWateringMessage 	= replyFinishingWateringMessage
module.exports.replyTurningOnLightMessage 	= replyTurningOnLightMessage
module.exports.replyTurningOffLightMessage 	= replyTurningOffLightMessage
