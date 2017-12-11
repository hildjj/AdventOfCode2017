'use strict'

const fs = require('fs')
const f = fs.readFileSync('day11.txt', {encoding: 'utf8'})

const steps = f.slice(0, -1).split(/\s*,\s*/g);

const dirs = {
  n:  [0, 1, -1],
  ne: [1, 0, -1],
  se: [1, -1, 0],
  s:  [0, -1, 1],
  sw: [-1, 0, 1],
  nw: [-1, 1, 0]
}
function cubeDistance (a) {
  // https://www.redblobgames.com/grids/hexagons/
  return (Math.abs(a[0]) + Math.abs(a[1]) + Math.abs(a[2])) / 2
}
const cur = [0, 0, 0]
let max = -Infinity
for (const step of steps) {
  const d = dirs[step]
  for (let i = 0; i < cur.length; i++) {
    cur[i] += d[i]
  }
  max = Math.max(max, cubeDistance(cur))
}
console.log(cur, cubeDistance(cur), max)
