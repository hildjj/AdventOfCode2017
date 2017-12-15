'use strict'

const A_MULT = 16807
const B_MULT = 48271

function * gen (mult, val, div) {
  while (true) {
    val = (val * mult) % 2147483647
    if (!div || ((val % div) === 0)) {
      yield val
    }
  }
}

function compare (a, b, times) {
  let count = 0
  for (let i = 0; i < times; i++) {
    if ((a.next().value & 0xffff) ===
        (b.next().value & 0xffff)) {
      count++
    }
  }
  return count
}

let a = gen(A_MULT, 277)
let b = gen(B_MULT, 349)
console.log(compare(a, b, 40000000))

a = gen(A_MULT, 277, 4)
b = gen(B_MULT, 349, 8)
console.log(compare(a, b, 5000000))
