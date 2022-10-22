const giniSS = require('gini-ss');
const treeNames = require('random-tree-names')
const ob = require('urbit-ob')
const hyperswarm = require('hyperswarm')
const crypto = require('crypto')
const random = require('math-random-seed')
const rand = random('6')
const population = {
    1: 100,
    2: 100,
    3: 100,
    4: 100,
    5: 100,
    6: 100,
    7: 100,
    8: 100,
    9: 100,
    10: 100,
}
const discounts = {
      0: '🃟_COFFEE_MEAL',
      1: '⚚_TAXIS_MEDECINE_GROCERIES',
      2: '♕_MUSIC_BOOKS_GAMES',
      3: '⚘_FASHION_ELECTRONICS_MOVIES',
      4: '♖_EDUCATION_CARS',
      5: '♔_TRAVEL_HOME',
}
const roads = []
let connections = []
let bots = 0
let scooters = 0
// reverse
import { returnsConnectionsSourcedFromMatterDirectRan } from './flu'
let i = 0;
// const swarm = new hyperswarm()
const INTERSECTION = 'PEARL_STREET'

// const k = crypto.createHash('sha256')
//   .update(INTERSECTION)
//   .digest()

// function Peer (peer) {
//   return peer && `${peer.host}:${peer.port}`
// }

function join(){
    returnsConnectionsSourcedFromMatterDirectRan()

    // swarm.join(topic, {
    //   announce: true,
    //   lookup: true
    // }, (err) => {
    //   if (err) console.error(figures.warning, 'Error while testing for connectivity', err)

    //   var holepunchable = swarm.holepunchable()
    //   if (holepunchable) console.log('Your network is hole-punchable!')

    //   console.log('Waiting for connections...')
    // })
    // swarm.on('connection', function (conn, info) {
    //   connections.push(conn)
    //     // connections++
    //     const {
    //         priority,
    //         status,
    //         retries,
    //         peer,
    //         client
    //     } = info
    //         console.log('new connection!', `
    //         priority: ${priority}
    //         status: ${status}
    //         retries: ${retries}
    //         client: ${client}
    //         peer: ${!peer ? peer : `
    //           ${inspect(peer, { indentationLvl: 4 }).slice(2, -2)}
    //           `}
    //     `)
    //     // // check if length of scooters <= 7
    //     // if(scooters < 7 ){
    //       const peerName = ob.patp(String(Math.floor(Math.random() * 2**32)))
    //     //   console.log(`Planting a flower from peer: ${peerName}`)
    //     //   scooters ++
    //     // } else {
    //     // // check if length of bots <= 3
    //     //   const treeSprouting = treeNames.random('en')
    //     //   console.log(`Sprouting a robo-tree from peer: ${treeSprouting}`)
    //     conn.write(peerName)
    //     // }
    //     conn.on('data', (data) => console.log(data.toString()))
    //     conn.on('close', () => {
    //         // clearInterval(timer)
    //         const idx = connections.indexOf(conn)
    //         console.log(`closing connection: ${idx}`)
    //         if (idx === -1) return
    //         connections.splice(idx, 1)
    //     })
    // })
}
// function createSwarm(){
//     swarm.on('peer', function (peer) {
//       console.log('New peer!', Peer(peer))
//     })
    
//     swarm.on('disconnection', function (socket, info) {
//       console.log('Connection has been dropped', Peer(info.peer))
//     })
// }

// function removePeers(){
//     // Randomly destroy connections during the chaos period.
//     const REMOVAL_NUM = Math.min(connections.length, Math.floor(Math.random() * 2))
//     console.log(`Removing Peers: ${REMOVAL_NUM}`)
//     for (let i = 0; i < REMOVAL_NUM; i++) {
//         const timeout = Math.floor(rand() * 12600) // Leave a lot of room at the end for reestablishing connections (timeouts)
//         setTimeout(() => {
//           if (!connections.length) return
//           const idx = Math.floor(rand() * connections.length)
//           const conn = connections[idx]
//           connections.splice(idx, 1)

//           // conn.destroy()
//           // scooters--;
//         }, timeout)
//     }
// }
// function addPeers(){
//     const ADD_NUM = Math.min(10 - connections.length, Math.floor(Math.random() * 10))
//     console.log(`Adding ${ADD_NUM} peers`)
//     for(let i = 0; i < ADD_NUM; i++){
//         join(k)
//     }
// }

function jiggle(population_: any){
    for(let i = 1; i <= Object.values(population_).length; i++){
        if(Math.random() > 0.5) {
            population_[i] = population_[i] * 1.034
        } else {
            population_[i] = population_[i] * 0.964
        }
    }
}

function arrayAverage(arr: any){
    //Find the sum
    arr = Object.values(arr)
    var sum = 0;
    for(var i in arr) {
        sum += arr[i];
    }
    //Get the length of the array
    var numbersCnt = arr.length;
    //Return the average / mean.
    return (sum / numbersCnt);
}

function discount(population_: any, connections: any, max: number){
    // connections, discount max, take from apwine futures yield
    const multiplier = .07 * connections / max
    const average = arrayAverage(population_)

    for(let i = 1; i <= Object.values(population_).length; i++){
        if(population_[i] < average) {
            population_[i] = population_[i] * (1 + multiplier)
            // send alert to bby
        }
    }
}

// addPeers()
// let connections = []

setInterval(async () => {
  console.log(`Connections ${connections.length}`)
  // get number of connections from flu
  // const connections = 2**8
  // const connections = bots + scooters
  // 
  // addPeers()
  connections = await returnsConnectionsSourcedFromMatterDirectRan()
  // removePeers()

  jiggle(population)
  discount(population, connections.length, 2**4)

  // get gini
  const gini = giniSS(Object.values(population))
  const tresh = .002

  if(gini > 0.001 && gini < tresh){
      console.log(discounts[0])
  }else if(gini > tresh && gini < tresh*2){
      console.log(discounts[1])
  }else if(gini > tresh*2 && gini < tresh*3){
      console.log(discounts[2])
  }else if(gini > tresh*3&& gini < tresh*4){
      console.log(discounts[3])
  }else if(gini > tresh*4 && gini < tresh*5){
      console.log(discounts[4])
  }else if(gini > tresh*5){
      console.log(discounts[5])
  }

  process.stdout.write(giniSS(Object.values(population)) + '\n');
}, 12600);