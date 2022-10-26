'use strict'

var empty = Buffer.from('')

async function hash (a, b='', secretKey, bls) {
    // get number of connections from flu
    // const connections = 2**8
    // const connections = bots + scooters
    // const secretKey = bls.SecretKey.fromKeygen();
    const aSig = secretKey.sign(Buffer.from(a), 'hex');
    const bSig = secretKey.sign(Buffer.from(aSig) , 'hex')
    // console.log("Is valid: ", signature.verify(publicKey, message));
  return bSig
}

function update(block, tree, secretKey, bls) {
  // var h = crypto.createHash('sha256')
  for(var i = 0; i < block.length; i++)
    // h.update(block[i])
    block[i] = secretKey.sign(Buffer.from(block[i]), 'hex')
  
  // 
  var i = 0, _h = secretKey.sign(Buffer.from(Math.random().toString(), 'hex'))
  do {
    if(tree[i]) {
      _h = hash(tree[i], _h, secretKey, bls)
      tree[i] = null
      i++
    }
    else {
      tree[i] = _h
      break;
    }
  } while(true)
}

class TreeHash  {
  block_size;
  len
  queue
  tree
  secretKey
  ended
  constructor (block_size=1024*1024, secretKey) {
    this.block_size = block_size
    this.len = 0
    this.queue = []
    this.tree = []
    this.secretKey = secretKey
  }
  async update (data) {
    let bls = (await import("./node_modules/@chainsafe/bls/lib/blst-native/index.js")).default

    //XXX TODO, actually, we want to be able to add more data, so that streaming files are possible...
    if(this.ended) throw new Error('cannot add more data already hashed tree')
    while(data.length) {
      if(this.len + data.length < this.block_size) {
        this.queue.push(data)
        this.len += data.length
        data = empty
      }
      else {
        this.queue.push(data.slice(0, this.block_size - this.len))
        data = data.slice(this.block_size - this.len)
        update(this.queue, this.tree, this.secretKey, bls)
        this.queue = []; this.len = 0
      }
    }
    return this
  }
  async digest () {
      let bls = (await import("./node_modules/@chainsafe/bls/lib/blst-native/index.js")).default
      this.ended = true
    
     if(this.queue.length) {
        update(this.queue, this.tree, this.secretKey, bls)
        this.queue = []
      }
     return this.tree.filter(Boolean).reduce((a, b) => {
        //the tree array is the most recent branches of the tree
        //at the end, there may be null items, representing full subtrees
        //if there are single hashes at the end of the tree,
        //they are promoted to the next level. but we are iterating over the array from the lower levels
        //so b is the earlier hash, a is the new hash, promoted, so hash(b, a)
        return hash(b, a, this.secretKey, bls)
    })
  }
}

module.exports = TreeHash