'use strict'

// https://math.stackexchange.com/a/163101
function realSpiral (n) {
  const k = Math.ceil((Math.sqrt(n) - 1) / 2)
  let t = (2 * k) + 1
  let m = t ** 2
  t--
  if (n >= (m - t)) {
    return [k - (m - n), -k]
  } else {
    m -= t
  }
  if (n >= m - t) {
    return [-k, -k + (m - n)]
  } else {
    m -= t
  }
  if (n >= m - t) {
    return [-k + (m - n), k]
  } else {
    return [k, k - (m - n - t)]
  }
}

function spiral (n) {
  const [x, y] = realSpiral(n)
  return [x + 0, y + 0] // handle -0's
}

// part 1
// const tests = [
//   1,
//   12,
//   23,
//   1024,
//   277678
// ]
// for (const i of tests) {
//   const [x, y] = spiral(i)
//   console.log(x, y, Math.abs(x) + Math.abs(y))
// }

// string keys of "x,y"
const vals = { '0,0': 1 }
function get (x, y) {
  return vals[`${x},${y}`] || 0
}
function set (x, y, val) {
  return (vals[`${x},${y}`] = val)
}
function sumAdjacent (x, y) {
  function * adjacent () {
    const coord = [-1, 0, 1]
    for (const i of coord) {
      for (const j of coord) {
        if (i || j) { // not the center
          yield [x + i, y + j]
        }
      }
    }
  }
  return Array.from(adjacent())
    .map(([x, y]) => get(x, y))
    .reduce((p, v) => p + v, 0)
}

let last = 0
let i = 2
while (last < 277678) {
  let [x, y] = spiral(i)
  last = set(x, y, sumAdjacent(x, y))
  console.log(i, x, y, last)
  i++
}
