'use strict'

const fs = require('fs')

function rotate (elems, start, length) {
  const num = Math.floor(length / 2)
  for (let i = 0; i < num; i++) {
    const first = (start + i) % elems.length
    const last = (start + length - i - 1) % elems.length
    ; [elems[first], elems[last]] = [elems[last], elems[first]]
  }
  return elems
}

function round (elems, lengths, pc, skip) {
  for (const l of lengths) {
    rotate(elems, pc, l)
    pc = (pc + l + skip) % elems.length
    skip++
  }
  return [pc, skip]
}

function init (n) {
  const elems = new Array(n)

  for (let i = 0; i < n; i++) {
    elems[i] = i
  }

  return elems
}

function hash (lengths) {
  let elems = init(256)
  let pc = 0
  let skip = 0
  const lens = lengths
    .split('')
    .map(c => c.charCodeAt(0))
    .concat([17, 31, 73, 47, 23])
  for (let i = 0; i < 64; i++) {
    [pc, skip] = round(elems, lens, pc, skip)
  }
  const h = Buffer.alloc(16, 0)
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
      h[i] ^= elems[(i * 16) + j]
    }
  }
  return h.toString('hex')
}

const f = fs.readFileSync('day10.txt', {encoding: 'utf8'})
const lengths = f.split(',').map(x => parseInt(x, 10))
const elems = init(256)
round(elems, lengths, 0, 0)
console.log(elems[0] * elems[1])

console.log(hash(''))
console.log(hash('AoC 2017'))
console.log(hash('1,2,3'))
console.log(hash('1,2,4'))
console.log(hash(f.trim()))
