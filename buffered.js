const assert = require('assert');
const util = require('util');
const lo = require('@solana/buffer-layout');

let BEHN = 2**9, horo = 2**4, mods = 2**4, blocktime = 2**4

function getRan(min, max) {
	return Math.floor(Math.random()*max + min)
}

function wait(ms){
	return new Promise(resolve => setTimeout(() => resolve(), ms))
}

const db = [];
let counter = 0;

(() => {
	setInterval(() => {
		const ds = lo.seq(lo.s16(), 4);
		const b = Buffer.alloc(8);
		ds.encode([getRan(1,16), getRan(1,16), getRan(1,16), getRan(1,16)], b)
		const bytes = [...b.toString("hex")]
		bytes.forEach(async (ch) => {
			await wait(horo*mods*blocktime)
			// console.log(ch)
			db.push(ch)
			// console.log(db)
			ch != undefined ? db.push(ch) : null
		})
	}, BEHN)
	process.stdin.setEncoding("ascii");
	process.stdin.on('readable', () => {
	  let chunk;
	  let pointer = db.length - 1

	  // console.log(process.stdin.read())
	  // Use a loop to make sure we read all available data.
	  while ((chunk = process.stdin.read()) !== null) {
	  	console.log(`${chunk}` == 'a\n')
	  	if(`${chunk}` == 'a\n'){
	  		// console.log(db[pointer])
	   		console.log(db[pointer + counter]);
	  		counter--
	   		// db[pointer]
		}else {
	   		process.stdout.write(db[pointer + counter]);
	  		counter++
		}
	  }
	});
})()