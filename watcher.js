const hyperswarm = require('hyperswarm')
const crypto = require('crypto')
const treeNames = require('random-tree-names')

let connections = 0;
const swarm = new hyperswarm()
const INTERSECTION = 'PEARL_STREET'

const k = crypto.createHash('sha256')
  .update(INTERSECTION)
  .digest();


(async () => {
	console.log(`Joining hyperswarm under the sha256(${INTERSECTION}) INTERSECTION`, k.toString('hex'))
	swarm.on('peer', function (peer) {
	  console.log('New peer!', Peer(peer))
	})

	swarm.join(k, {
		server: true, 
		client: false,
	  announce: true,
	  lookup: true
	}, (err) => {
	  if (err) console.error('Error while testing for connectivity', err)

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
	  console.log('new connection!', client
	    )
	  // const treeSprouting = treeNames.random('en')
	  // console.log(`Sprouting a tree from peer: ${treeSprouting}`)
	  socket.on('data', (data) => console.log(data.toString()))
	  // socket.write(treeSprouting)
	})

	// await swarm.listen()

	swarm.on('disconnection', function (socket, info) {
	  console.log('Connection has been dropped', Peer(info.peer))
	})
})()
