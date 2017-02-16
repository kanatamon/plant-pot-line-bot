const endpoint = 'https://api.netpie.io'
const appId = 'PlantPot2'
const auth = 'Y35OK6MFGX5TQm1:eIjiYDLmUhznX6xMPVCLsVGRg'

module.exports.readTemperature = () =>
	fetch(`${endpoint}/topic/${appId}/sensor/Temperature?auth=${auth}`)
		.then((response) => {
		  if (response.status >= 400) {
		    throw new Error("Bad response from server")
		  }
		  return response.json();
		})