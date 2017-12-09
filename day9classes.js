'use strict'

const util = require('util')
exports.Group = class Group {
  constructor (things) {
    // things is either: null or [thing, [thing, thing]]
    this.things = !things ? [] : [things[0]].concat(things[1])
  }
  [util.inspect.custom] () {
    return `[${this.things.length}: ${this.things.map(util.inspect).join(',')}]`
  }
  score (depth = 1) {
    let tot = depth
    for (const t of this.things) {
      if (t instanceof Group) {
        tot += t.score(depth + 1)
      }
    }
    return tot
  }
  cancelled () {
    return this.things.reduce((p, t) => {
      if (t instanceof Group) {
        return p + t.cancelled()
      } else {
        return p + t.length
      }
    }, 0)
  }
}

exports.Garbage = class Garbage {
  constructor (things) {
    this.things = things
  }
  toString () {
    return `<${this.things.join(',')}>`
  }
  [util.inspect.custom] () {
    return `<${this.things.join(',')}>`
  }
  get length () {
    return this.things.reduce((p, v) => p + v.length, 0)
  }
}

exports.Bang = class Bang {
  constructor (char) {
    this.char = char
  }
  get length () {
    return 0
  }
  toString () {
    return `!${this.char}`
  }
  [util.inspect.custom] () {
    return `!${this.char}`
  }
}
