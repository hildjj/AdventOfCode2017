'use strict'

const steps = 382

const buf = [0]

let pos = 0

for (let i = 1; i <= 2017; i++) {
  pos = (pos + steps + 1) % buf.length
  buf.splice(pos + 1, 0, i)
}
console.log(buf[pos+2])

pos = 0
let lastz = -1
for (let i = 1; i <= 50000000; i++) {
  pos = (pos + steps + 1) % i
  if (!pos) {
    lastz = i
  }
}

console.log(lastz)
