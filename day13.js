'use strict'

const fs = require('fs')
const f = fs.readFileSync('day13.txt', {encoding: 'utf8'})

const lines = f.slice(0, -1).split('\n')
const layers = new Map()
let sev = 0
for (const line of lines) {
  const [layer, range] = line.split(/:\s*/).map(x => parseInt(x))
  layers.set(layer, range)
  if ((layer % (2 * (range - 1))) === 0) {
    sev += layer * range
  }
}
console.log(sev)

function pass (delay) {
  for (const [layer, range] of layers) {
    if (((layer + delay) % (2 * (range - 1))) === 0) {
      return false
    }
  }
  return true
}

let delay = 0
while (!pass(delay)) {
  delay++
}
console.log(delay)
