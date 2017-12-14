'use strict'

const hash = require('./day10')

// nibbles -> numbits
const numBits = {
  0: 0, // 0
  1: 1, // 1
  2: 1, // 10
  3: 2, // 11
  4: 1, // 100
  5: 2, // 101
  6: 2, // 110
  7: 3, // 111
  8: 1, // 1000
  9: 2, // 1001
  a: 2, // 1010
  b: 3, // 1011
  c: 2, // 1100
  d: 3, // 1101
  e: 3, // 1110
  f: 4  // 1111
}

const bufs = []

// const inp = 'flqrgnkx'
const inp = 'hwlqcszp'
let sum = 0
for (let i = 0; i < 128; i++) {
  const b = hash(`${inp}-${i}`)
  const nibbles = b.split('')
  sum += nibbles.reduce((p, v) => p + numBits[v], 0)
  bufs[i] = Buffer.from(b, 'hex')
}

console.log(sum)

function get (x, y) {
  if ((x < 0) || (y < 0) || (x > 127) || (y > 127)) return false
  const b = bufs[y]
  return !!(b[Math.floor(x / 8)] & (1 << (7 - (x % 8))))
}

function clear (x, y) {
  const b = bufs[y]
  b[Math.floor(x / 8)] &= 0xff ^ (1 << (7 - (x % 8)))
}

function clearBlock (x, y) {
  if (!get(x, y)) return

  clear(x, y)
  clearBlock(x + 1, y)
  clearBlock(x - 1, y)
  clearBlock(x, y + 1)
  clearBlock(x, y - 1)
}

let blocks = 0
for (let i = 0; i < 128; i++) {
  for (let j = 0; j < 128; j++) {
    if (!get(i, j)) continue

    // new block!
    blocks++
    clearBlock(i, j)
  }
}

console.log(blocks)
