const hyperswarm = require('hyperswarm')
const crypto = require('crypto')
const treeNames = require('random-tree-names')

let connections = 0;
const swarm = new hyperswarm()
const topic = 'birch'

const k = crypto.createHash('sha256')
  .update(topic)
  .digest()

console.log(`Joining hyperswarm under the sha256(${topic}) topic`, k.toString('hex'))

swarm.on('peer', function (peer) {
  console.log('New peer!', Peer(peer))
  connections++
})

for(let i = 0; i < 17; i++ ){
	swarm.join(k, {
	  announce: true,
	  lookup: true
	}, (err) => {
	  if (err) console.error(figures.warning, 'Error while testing for connectivity', err)

	  var holepunchable = swarm.holepunchable()
	  if (holepunchable) console.log('Your network is hole-punchable!')

	  console.log('Waiting for connections...')
	})
	swarm.on('connection', function (socket, info) {
	  const {
	    priority,
	    status,
	    retries,
	    peer,
	    client
	  } = info
	  console.log('new connection!', `
	    priority: ${priority}
	    status: ${status}
	    retries: ${retries}
	    client: ${client}
	    peer: ${!peer ? peer : `
	      ${inspect(peer, { indentationLvl: 4 }).slice(2, -2)}
	      `}
	    `)
	  const treeSprouting = treeNames.random('en')
	  console.log(`Sprouting a tree from peer: ${treeSprouting}`)
	  socket.on('data', (data) => console.log(data.toString()))
	  socket.write(treeSprouting)
	})
}

swarm.on('disconnection', function (socket, info) {
  console.log('Connection has been dropped', Peer(info.peer))
})