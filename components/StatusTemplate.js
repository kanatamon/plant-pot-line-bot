module.exports = (replyToken, values) => ({
	replyToken: replyToken,
	messages: [
	  {
		  "type": "template",
		  "altText": "this is a buttons template",
		  "template": {
		      "type": "buttons",
		      "thumbnailImageUrl": "https://img.clipartfest.com/e266a3b3df8e0180e112aede38a8fdc3_rain-pictures-clip-art-google-raining-cloud-clipart_533-381.jpeg",
		      "title": "ต้นผักกาด",
		      "text": `ตอนนี้ อุณหภูมิอยู่ที่ ${values.temperature} c ระดับแสงอยู่ที่ ${values.lightLevel} และความชื้นอยู่ที่ ${values.humidity} %`,
		      "actions": [
		          {
		            "type": "message",
		            "label": "ลดน้ำ",
		            "text": "water"
		          },
		          {
		          	"type": "postback",
		          	"label": "ให้แสง",
		          	"data": "action=add&itemid=123"
		          }
		      ]
		  }
		}
	]
})