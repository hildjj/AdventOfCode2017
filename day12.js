'use strict'

const fs = require('fs')
const f = fs.readFileSync('day12.txt', {encoding: 'utf8'})

const lines = f.slice(0, -1).split('\n')

const routes = {}
for (const line of lines) {
  const m = line.match(/^(\d+)\s*<->\s*([0-9, ]+)/)
  if (!m) continue
  const ends = m[2].split(/\s*,\s*/)
  const r = routes[m[1]]
  routes[m[1]] = r ? new Set(...r, ...ends) : new Set(ends)
}

const VISITED = Symbol('VISITED')

function getLen (start) {
  const stack = [start]
  let c = 0
  while (stack.length > 0) {
    const p = stack.shift()
    if (routes[p][VISITED]) continue
    routes[p][VISITED] = true
    c++
    stack.push(...routes[p])
  }
  return c
}

console.log(getLen('0'))
let groups = 1
for (const k of Object.keys(routes)) {
  if (routes[k][VISITED]) continue
  groups++
  getLen(k)
}
console.log(groups)
