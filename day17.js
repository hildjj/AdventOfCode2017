'use strict'

const steps = 382

const buf = [0]

let pos = 0

for (let i = 1; i <= 2017; i++) {
  pos = (pos + steps + 1) % buf.length
  buf.splice(pos + 1, 0, i) // splice is off-by-one in this coordinate system
}
console.log(buf[pos + 2])

let lastz = -1
for (let i = 2018; i <= 50000000; i++) {
  pos = (pos + steps + 1) % i
  // NOTE: don't bother to save the results anymore!
  // we only have to keep track of the last thing that
  // was inserted after the 0.
  if (!pos) {
    lastz = i
  }
}

console.log(lastz)
