'use strict'

const fs = require('fs')
const f = fs.readFileSync('day7.txt', {encoding: 'utf8'})

const lines = f.split('\n').slice(0, -1)

const graf = {}
class Node {
  constructor (txt) {
    const m = txt.match(/^(\S+)\s*\(\s*(\d+)\s*\)(?:\s*->\s*(.*))?/)
    this.parent = null
    this.name = m[1]
    this.weight = parseInt(m[2])
    this.children = m[3] ? m[3].split(/\s*,\s*/) : []
  }
}

for (const line of lines) {
  const n = new Node(line)
  graf[n.name] = n
}

// set parents
for (const [k, v] of Object.entries(graf)) {
  for (const child of v.children) {
    graf[child].parent = k
  }
}

// find root
let root = null
for (const [k, v] of Object.entries(graf)) {
  if (!v.parent) {
    root = k
    break
  }
}

function partition (ary, fun) {
  const groups = [[], []]

  ary.every(c => groups[!fun(c) & 1].push(c))
  return groups
}

function check (n) {
  // n.children.length can't be:
  // 0: no chance for inbalance
  // 1: no chance for inbalance
  // 2: violates "exactly one" from the rules
  if (n.children.length < 3) {
    return true
  }

  // partition into two groups.
  // First group matches the first child's total
  const first = graf[n.children[0]].total
  const groups = partition(n.children, c => graf[c].total === first)
  let right, bad
  switch (groups[1].length) {
    case 0:
      return true
    case 1:
      bad = groups[1][0]
      right = first
      break
    default:
      bad = groups[0][0]
      right = graf[groups[1][0]].total
  }

  // One of these things is not like the other
  // https://www.youtube.com/watch?v=MdHvH2noS8U
  console.log(graf[bad].weight - graf[bad].total + right)
  return false
}

function depthFirst (nm) {
  const n = graf[nm]
  if (!n.children.every(c => depthFirst(c))) {
    return false
  }
  n.total = n.weight +
    n.children.reduce((p, c) => p + graf[c].total, 0)
  return check(n)
}

depthFirst(root)
