'use strict'

const fs = require('fs')
const { performance } = require('perf_hooks')
const f = fs.readFileSync('day5.txt', {encoding: 'utf8'})

performance.mark('parse start')
const instructions = f.split('\n').slice(0,-1).map(line => parseInt(line))
performance.mark('parse end')
performance.measure('parse time', 'parse start', 'parse end')
const n = performance.getEntriesByName('parse time')
console.log('parse', n[0].duration)

// const instructions = [
//   0,
//   3,
//   0,
//   1,
//   -3
// ]

function run() {
  let pc = 0
  let count = 0

  while ((pc >= 0) && (pc < instructions.length)) {
    count++
    // console.log(count, pc)
    const inst = instructions[pc]
    if (inst >= 3) {
      instructions[pc]--
    } else {
      instructions[pc]++
    }
    pc += inst
  }
  return count
}

for (let i = 0; i < 100; i++) {
  run()
}

performance.mark('start')
for (let i = 0; i < 1000; i++) {
  run()
}
performance.mark('end')
performance.measure('time', 'start', 'end')
const m = performance.getEntriesByName('time')
console.log(m[0].duration / 1000)
