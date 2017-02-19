const api = require('./api')
const StatusTemplate = require('./components/StatusTemplate')



const replyStatusTemplate = (event, line) => api.getSensorValues()
	.then(values => line.client.replyMessage(
		{
			replyToken: event.replyToken,
			messages: [
				StatusTemplate(values)
			]
		}
	))

const replyWateringProcessMessage = (event, line) => api.startWatering()
	.then(isSuccess => line.client.replyMessage(
		{
			replyToken: event.replyToken,
			messages: [
				{
			    type: 'text',
			    text: isSuccess ? 'กำลังรดน้ำ' : 'ไม่สามารถทำการรดน้ำได้'
				}
			]
		}
	))


// Need implement
const replyFinishingWateringMessage = (event, line) => line.client.replyMessage({
	replyToken: event.replyToken,
	messages: [
		{
	    type: 'text',
	    text: 'รดน้ำเสร็จแล้ว'
  	}
	]
}) 

const replyTurningOnLightMessage = (event, line) => api.turnLightSwitch(true)
	.then(isSuccess => line.client.replyMessage(
		{
			replyToken: event.replyToken,
			messages: [
				{
			    type: 'text',
			    text: isSuccess ? 'เปิดไฟแล้ว' : 'ไม่สามารถเปิดไฟได้'
		  	}
			]
		}
	))

const replyTurningOffLightMessage = (event, line) => api.turnLightSwitch(false)
	.then(isSuccess => line.client.replyMessage(
		{
			replyToken: event.replyToken,
			messages: [
				{
			    type: 'text',
			    text: isSuccess ? 'ปิดไฟแล้ว' : 'ไม่สามารถปิดไฟได้'
		  	}
			]
		}
	))



module.exports.replyStatusTemplate = replyStatusTemplate
module.exports.replyWateringProcessMessage 		= replyWateringProcessMessage
module.exports.replyFinishingWateringMessage 	= replyFinishingWateringMessage
module.exports.replyTurningOnLightMessage 	= replyTurningOnLightMessage
module.exports.replyTurningOffLightMessage 	= replyTurningOffLightMessage
