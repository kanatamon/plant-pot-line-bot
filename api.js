const endpoint = 'https://api.netpie.io'
const appId = 'PlantPot2'
const auth = 'Y35OK6MFGX5TQm1:eIjiYDLmUhznX6xMPVCLsVGRg'

const getSensorValue = (sensorName) => 
	fetch(`${endpoint}/topic/${appId}/sensor/${sensorName}?auth=${auth}`)
		.then((response) => {
		  if (response.status >= 400) {
		    throw new Error("Bad response from server")
		  }
		  return response.json();
		})

const getTemperature 	= () => getSensorValue('Temperature')

const getLightLevel 	= () => getSensorValue('LightLevel')

const getHumidity 		= () => getSensorValue('Humidity')

const getSensorValues = () => {
	let promises = [
		'Temperature', 
		'LightLevel', 
		'Humidity'
	].map(getSensorValue)

	return	Promise.all(promises)
		.then(values => ({
			temperature : values[0][0].payload,
			lightLevel 	: values[1][0].payload,
			humidity 		: values[2][0].payload
		}))
}

// Need implement
// const getLightSwitchStatus = () => { }

// Start watering process
// const startWatering = () => { }

// Turn on/off light switch
// const turnLightSwitch = (isOn) => { }



module.exports.getTemperature = getTemperature
module.exports.getLightLevel 	= getLightLevel
module.exports.getHumidity 		= getHumidity
module.exports.getSensorValues = getSensorValues
		
