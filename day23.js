'use strict'

const fs = require('fs')
const f = fs.readFileSync('day23.txt', {encoding: 'utf8'})

function parse (x) {
  let i = parseInt(x, 10)
  if (Number.isNaN(i)) {
    return x
  }
  return i
}

class Program {
  constructor (opText) {
    this.reg = {}
    for (const c of 'abcdefgh') {
      this.reg[c] = 0
    }
    this.reg.a = 1

    this.ops = []
    const lines = opText.slice(0, -1).split('\n')
    for (const line of lines) {
      if (line && !line.match(/\s*#/)) {
        const [op, a, b] = line.split(/\s+/)
        this.ops.push([op, parse(a), parse(b)])
      }
    }
  }

  get (x) {
    if (typeof x === 'number') {
      return x
    }
    return this.reg[x]
  }

  toC () {
    let pc = 0
    console.log(`
#include <stdio.h>

int main(int argc, char **argv) {
  long count = 0;
`)
    for (const c of 'abcdefgh') {
      console.log(`  long ${c} = 0;`)
    }
    console.log()
    for (const [op, a, b] of this.ops) {
      console.log(`line_${pc}:`)
      switch (op) {
        case 'set':
          console.log(`  ${a} = ${b};`)
          break
        case 'sub':
          console.log(`  ${a} -= ${b};`)
          break
        case 'mul':
          console.log(`  ${a} *= ${b}; count++;`)
          break
        case 'jnz':
          console.log(`  if (${a} != 0) {
    goto line_${pc + b};
  }`)
          break
        default:
          console.error(`invalid opcode: ${op}`)
          process.exit(1)
      }
      pc++
    }

    console.log(`
line_${pc}:
  printf("%ld\\n", count);
  return 0;
}
`)
  }

  run () {
    let pc = 0
    let count = 0
    while ((pc >= 0) && (pc < this.ops.length)) {
      const [op, a, b] = this.ops[pc]
      switch (op) {
        case 'print':
          console.log(this.reg)
          pc++
          continue
          break
        case 'nop':
          // nope: https://www.youtube.com/watch?v=KTc3PsW5ghQ
          break
        case 'set':
          this.reg[a] = this.get(b)
          break
        case 'sub':
          this.reg[a] -= this.get(b)
          break
        case 'mul':
          this.reg[a] *= this.get(b)
          count++
          break
        case 'jnz':
          if (this.get(a) !== 0) {
            //console.log(pc, op, a, b, '>>', pc + this.get(b))
            pc += this.get(b)
            continue
          }
          break
        default:
          console.error(`invalid opcode: ${op}`)
          process.exit(1)
      }
      if (a === 'h') {
        console.log('HHHHHHH', pc, this.reg.h)
      }
      // } else {
      //   console.log(pc, op, a, b, '=>', this.reg[a])
      // }
      pc++
    }
    return count
  }
}

const p = new Program(f)
p.toC()
//console.log(p.reg.h)
