'use strict'

const fs = require('fs')
const f = fs.readFileSync('day6.txt', {encoding: 'utf8'})

const banks = f.split(/\s+/g).slice(0, -1).map(x => parseInt(x))

function run () {
  const seen = new Set()
  let i = 0
  while (true) {
    const cur = banks.join('\t')
    if (seen.has(cur)) {
      break
    }
    seen.add(cur)
    let count = Math.max.apply(Math, banks)
    let pc = banks.indexOf(count) // first match
    banks[pc] = 0
    while (count > 0) {
      pc = (pc + 1) % banks.length
      banks[pc]++
      count--
    }
    i++
  }
  return i
}
run()
console.log(run())
