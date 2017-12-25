'use strict'

class Port {
  constructor (a, b) {
    this.a = a
    this.b = b
    this.str = a + b
    this.used = false
  }
  has (n) {
    return !this.used && ((this.a === n) || (this.b === n))
  }
  other (n) {
    return (this.a === n) ? this.b : this.a
  }
  static strength (ary) {
    return ary.reduce((p, v) => p + v.str, 0)
  }
}

const fs = require('fs')
const ports = fs.readFileSync('day24.txt', 'utf8')
  .slice(0, -1)
  .split('\n')
  .map(l => new Port(...l.split('/').map(n => parseInt(n))))

let maxStr = -Infinity
let maxLen = -Infinity
let max = -Infinity
function search (n, ancestors) {
  const str = Port.strength(ancestors)
  max = Math.max(max, str)
  if (ancestors.length > maxLen) {
    maxStr = str
    maxLen = ancestors.length
  } else if (ancestors.length === maxLen) {
    maxStr = Math.max(maxStr, Port.strength(ancestors))
  }
  for (const p of ports.filter(p => p.has(n))) {
    p.used = true
    search(p.other(n), ancestors.concat(p))
    p.used = false
  }
}

search(0, [])
console.log(max, maxStr)
