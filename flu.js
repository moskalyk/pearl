const flu =  require("./node_modules/@fluencelabs/fluence/dist/index.js");
const env =  require("./node_modules/@fluencelabs/fluence-network-environment/dist/index.js")

const FluencePeer = flu.FluencePeer
const krasnodar = env.krasnodar

async function randomShutdown(connections, connectionShutdowns) {
	console.log(`Before Slice: ${connections.length}`)
	for(let i = 0; i < connectionShutdowns; i++){
		const rand = Math.floor(Math.random() * connections.length)
		await connections[rand].stop()
		connections.splice(rand)
	}
	console.log(`After Slice: ${connections.length}`)
	console.log(connections.length)
	return connections
}

async function returnsConnectionsSourcedFromMatterDirectRan(){
	// const angularVelocity = BravaisGroup * velocityOfChangeOfAlgorithm / --> taking fromRatiedSetsOfNumeric --> FractalLukso
	// timerRate -> transacationSpeed in variance
	const connections = []

	for(let i = 0; i < 10; i++) {
		const flu = new FluencePeer()
		await flu.start({
			connectTo: krasnodar[i]
		})
		console.log(`PeerId: ${flu.getStatus().peerId}`)
		connections.push(flu)
	}

	await randomShutdown(connections, Math.floor(connections.length)*.2)

	return connections
}

module.exports = returnsConnectionsSourcedFromMatterDirectRan;