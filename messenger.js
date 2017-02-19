const api = require('./api')
const StatusTemplate = require('./components/StatusTemplate')


// Push message

const pushFinishingWateringMessage = (event, line) => line.client.replyMessage({
	to: event.source.userId,
	messages: [
		{
	    type: 'text',
	    text: 'รดน้ำเสร็จแล้ว'
  	}
	]
}) 



// Reply message

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
	.then(isSuccess => {
		if (isSuccess) {
			// Count time for 10 sec to push message 'waterring finished' to the user
			setTimeout(() => {
				console.log('Pust finished message')
				pushFinishingWateringMessage(event, line)
			}, 1000 * 10)
		}

		return line.client.replyMessage(
			{
				replyToken: event.replyToken,
				messages: [
					{
				    type: 'text',
				    text: isSuccess ? 'กำลังรดน้ำ' : 'ไม่สามารถทำการรดน้ำได้'
					}
				]
			}
		)
	})
	// .then(replyPromise => {
	// 	// Count time for 10 sec to push message 'waterring finished' to the user
	// 	setTimeout(() => pushFinishingWateringMessage(event, line), 1000 * 10)

	// 	return replyPromise
	// })

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
// module.exports.pushFinishingWateringMessage 	= pushFinishingWateringMessage
module.exports.replyTurningOnLightMessage 	= replyTurningOnLightMessage
module.exports.replyTurningOffLightMessage 	= replyTurningOffLightMessage
