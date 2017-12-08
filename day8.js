'use strict'
const assert = require('assert')
const fs = require('fs')
const f = fs.readFileSync('day8.txt', {encoding: 'utf8'})

const lines = f.split('\n').slice(0, -1)

class Registers {
  constructor () {
    this.reg = {}
    this.max = -Infinity
  }
  get (nm) {
    return this.reg[nm] || 0
  }
  inc (nm, val) {
    const v = this.reg[nm] = this.get(nm) + val
    if (v > this.max) {
      this.max = v
    }
  }
  dec (nm, val) {
    const v = this.reg[nm] = this.get(nm) - val
    if (v > this.max) {
      this.max = v
    }
  }
}

const regs = new Registers()
class Instruction {
  constructor (line, r) {
    let _if, val, testVal
    [this.reg, this.op, val, _if, this.testReg, this.comp, testVal] = line.split(/\s+/g)
    assert(_if === 'if', _if)
    this.val = parseInt(val)
    this.testVal = parseInt(testVal)
  }
  test () {
    const v = regs.get(this.testReg)
    switch (this.comp) {
      case '<':
        return v < this.testVal
      case '<=':
        return v <= this.testVal
      case '>':
        return v > this.testVal
      case '>=':
        return v >= this.testVal
      case '==':
        return v === this.testVal
      case '!=':
        return v !== this.testVal
      default:
        throw new Error(`Unknown comparison ${this.comp}`)
    }
  }
  operate () {
    regs[this.op](this.reg, this.val)
  }
}

for (const line of lines) {
  const i = new Instruction(line)
  if (i.test()) {
    i.operate()
  }
}

console.log(Math.max.apply(Math, Object.values(regs.reg)), regs.max)
