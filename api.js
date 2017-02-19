const endpoint = 'https://api.netpie.io'
const appId = 'PlantPot3'
const auth = 'KGpw9EHemes8HO8:nUXysleIgAJT5ZD6xoZ8V871H'



// Generic-http function

const getSensorValue = (sensorName) => fetch(`${endpoint}/topic/${appId}/sensor/${sensorName}?auth=${auth}`)
	.then(response => {
	  if (response.status >= 400) {
	    throw new Error('Bad response from server')
	  }
	  return response.json();
	})

const sendMessageToMicrogear = (message) => fetch(`${endpoint}/microgear/${appId}/sensor?auth=${auth}`, {
  method: 'PUT',
  body: message,
  headers: {
  	'Content-Type': 'text/plain'
  }
})
	.then(response => response.json())
	.then(json => json.code === 200)



const getTemperature 	= () => getSensorValue('Temperature')

const getLightLevel 	= () => getSensorValue('LightLevel')

const getHumidity 		= () => getSensorValue('Humidity')

const getSensorValues = () => {
	let promises = [
		'Temperature', 
		'LightLevel', 
		'Humidity',
		'LightStatus'
	].map(getSensorValue)

	return	Promise.all(promises)
		.then(values => ({
			temperature : values[0][0].payload,
			lightLevel 	: values[1][0].payload,
			humidity 		: values[2][0].payload,
			lightStatus : values[3][0].payload
		}))
}

// Need implement
// const getLightSwitchStatus = () => { }

// Start watering process
const startWatering = () => sendMessageToMicrogear('ONWater')

// Turn on/off light switch
const turnLightSwitch = (isOn) => sendMessageToMicrogear(isOn ? 'ONLight' : 'OFFLight')



module.exports.getTemperature = getTemperature
module.exports.getLightLevel 	= getLightLevel
module.exports.getHumidity 		= getHumidity
module.exports.getSensorValues = getSensorValues
module.exports.startWatering		= startWatering
module.exports.turnLightSwitch 	= turnLightSwitch
		
