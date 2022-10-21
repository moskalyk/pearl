import { FluencePeer } from "@fluencelabs/fluence";
import { krasnodar } from "@fluencelabs/fluence-network-environment";

async function randomShutdown(connections: FluencePeer[], connectionShutdowns: number) {
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

(async () => {
	console.log(krasnodar.length)
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
	console.log(`Connected with ${connections.length} # of peers`)
})()