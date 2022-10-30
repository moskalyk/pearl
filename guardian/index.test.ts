// import test from 'tape'
const TH = require('../index')
// import naive from '../naive'
// import crypto from 'crypto'

// function hash (a, b='') {
//   return crypto.createHash('sha256').update(a).update(b).digest()
// }

var zeros_1mb = Buffer.alloc(1024*1024).fill(0)
var vectors = [
  {
    input: '9',
  },
  {
    //on a short input, the result is just the sha256 hash
    input: '1',
  },{
    //on a short input, the result is just the sha256 hash
    input: '4',
  },
  // {
  //   input: Buffer.alloc(1024*1024*2).fill(0),
  //   hash: '861890b487038d840e9d71d43bbc0fd4571453fb9d9b1f370caa3582a29b0ec7'
  // },
  // {
  //   input: Buffer.alloc(1024*1024*2).fill(0),
  //   hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
  // },
  // {
  //   //trailing blocks are promoted
  //   input: Buffer.alloc(1024*1024*3).fill(0),
  //   hash:
  //     '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
    
  // },
  // {
  //   //if input is less than the block size, partical block is hashad at the end.
  //   input: Buffer.alloc(1024*1024*2.5).fill(0),
  //   hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
  // }
];

(async () => {

  let bls = (await import("../node_modules/@chainsafe/bls/lib/blst-native/index.js")).default
  const secretKey = bls.SecretKey.fromKeygen()
  const trees = []
  for(var i = 0 ; i < vectors.length; i++) {
    const tree = new TH(1024*1024, secretKey)
    const update = await tree.update(vectors[i].input)
    const digest = await tree.digest()
    trees.push(digest)
    if(digest != undefined) console.log(digest.toBytes().toString())
    // console.log(update.tree[i])
    // console.log(digest)
  }
  console.log('why arent these different? naive.')
  console.log(trees[0].toHex() )
  console.log(trees[1].toHex() )
  console.log(trees[2].toHex() )
  console.log(trees[0].toHex() == trees[1].toHex())
  console.log(trees[1].toHex() == trees[2].toHex())
})()
