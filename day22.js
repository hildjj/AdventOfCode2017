'use strict'

const fs = require('fs')
const f = fs.readFileSync('day22.txt', {encoding: 'utf8'})

const lines = f.split('\n').slice(0, -1).map(l => l.split(''))
let offset = Math.floor(lines.length / 2)

const m = {}
lines.forEach((line, y) => {
  line.forEach((val, x) => {
    if (val === '#') {
      m[`${x - offset}|${y - offset}`] = 'I'
    }
  })
})

const DIR_OFF = [[0, -1], [1, 0], [0, 1], [-1, 0]]
let dir = 0 // URDL
let x = 0
let y = 0
let count = 0
let off = null

for (let b = 0; b < 10000000; b++) {
  switch (m[`${x}|${y}`]) {
    case 'I':
      m[`${x}|${y}`] = 'F'
      dir = (dir + 1) % 4 // right
      break
    case 'W':
      count++
      m[`${x}|${y}`] = 'I'
      break
    case 'F':
      delete m[`${x}|${y}`]
      dir = (dir + 2) % 4 // reverse
      break
    default: // clean
      m[`${x}|${y}`] = 'W'
      dir = (dir + 3) % 4 // left.  Thanks Karel.
  }
  off = DIR_OFF[dir]
  x += off[0]
  y += off[1]
}
console.log(count)
