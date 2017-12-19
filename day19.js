'use strict'
const fs = require('fs')
const AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const f = fs.readFileSync('day19.txt', {encoding: 'utf8'})
const rows = f.split('\n').slice(0, -1)

let y = 0
let x = rows[y].indexOf('|')
let dir = [0, 1]

function get (u, v) {
  if ((u < 0) || (u >= rows[y].length) ||
      (v < 0) || (v >= rows.length)) {
    return ' '
  }
  return rows[v][u]
}

function go () {
  x += dir[0]
  y += dir[1]
}

let len = 0
const path = []
while (true) {
  const cur = get(x, y)
  if (cur === ' ') {
    break
  } else if (cur === '+') {
    const [xd, yd] = dir
    dir = [xd ? 0 : 1, yd ? 0 : 1]
    // It's just a jump to the left
    if (get(x + dir[0], y + dir[1]) === ' ') {
      // And then a step to the right
      dir[0] *= -1
      dir[1] *= -1
    }
  } else if (AZ.indexOf(cur) >= 0) {
    path.push(cur)
  }
  len++
  go() // proceed turtle-wise
}
console.log(path.join(''), len)
