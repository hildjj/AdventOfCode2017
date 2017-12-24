'use strict'

const fs = require('fs')

class Chunk {
  constructor (inp, selector, offx = 0, offy = 0) {
    if (typeof inp === 'string') {
      this.str = inp
      this.cells = inp.split('/').map(s => s.split(''))
    } else if (Array.isArray(inp)) {
      this.cells = inp
      this.sz = inp[0].length
    } else {
      if (!selector) {
        throw new TypeError('need selector for Chunk')
      }
      this.cells = selector.map(r => r.map(([x, y]) => inp.cells[x + offx][y + offy]))
    }
    this.sz = this.cells[0].length
  }
  toString () {
    return this.str || this.cells.map(r => r.join('')).join('/')
  }
  rotate () {
    // to the left
    switch (this.sz) {
      case 2:
        // 0 1 => 1 4
        // 3 4    0 3
        return new Chunk(this, [
          [[0, 1], [1, 1]],
          [[0, 0], [1, 0]]
        ])
      case 3:
        // 0 1 2 => 2 6 t
        // 4 5 6    1 5 9
        // 8 9 t    0 4 8
        return new Chunk(this, [
          [[0, 2], [1, 2], [2, 2]],
          [[0, 1], [1, 1], [2, 1]],
          [[0, 0], [1, 0], [2, 0]]
        ])
      default:
        throw new Error('Unknown pattern length: ' + this.sz)
    }
  }

  flipH () {
    switch (this.sz) {
      case 2:
        // 0 1 => 1 0
        // 3 4    4 3
        return new Chunk(this, [
          [[0, 1], [0, 0]],
          [[1, 1], [1, 0]]
        ])
      case 3:
        // 0 1 2 => 2 1 0
        // 4 5 6    6 5 4
        // 8 9 t    t 9 8
        return new Chunk(this, [
          [[0, 2], [0, 1], [0, 0]],
          [[1, 2], [1, 1], [1, 0]],
          [[2, 2], [2, 1], [2, 0]]
        ])
      default:
        throw new Error('Unknown pattern length: ' + this.sz)
    }
  }

  flipV () {
    switch (this.sz) {
      case 2:
        // 0 1 => 3 4
        // 3 4    0 1
        return new Chunk(this, [
          [[1, 0], [1, 1]],
          [[0, 0], [0, 1]]
        ])
      case 3:
        // 0 1 2 => 8 9 t
        // 4 5 6    4 5 6
        // 8 9 t    0 1 2
        return new Chunk(this, [
          [[2, 0], [2, 1], [2, 2]],
          [[1, 0], [1, 1], [1, 2]],
          [[0, 0], [0, 1], [0, 2]]
        ])
      default:
        throw new Error('Unknown pattern length: ' + this.sz)
    }
  }

  permute () {
    const s = new Set()
    for (let i = 0, r = this; i < 4; i++, r = r.rotate()) {
      // overkill, but figure it out later.
      s.add(r.toString())
      s.add(r.flipH().toString())
      s.add(r.flipV().toString())
      s.add(r.flipH().flipV().toString())
      s.add(r.flipV().flipH().toString())
    }
    return Array.from(s)
  }

  chunks (chunkSize) {
    let result = []
    switch (chunkSize) {
      case 2:
        for (let i = 0; i < this.sz; i += chunkSize) {
          const row = []
          for (let j = 0; j < this.sz; j += chunkSize) {
            row.push(new Chunk(this, [
              [[0, 0], [0, 1]],
              [[1, 0], [1, 1]]
            ], i, j))
          }
          result.push(row)
        }
        break
      case 3:
        for (let i = 0; i < this.sz; i += chunkSize) {
          const row = []
          for (let j = 0; j < this.sz; j += chunkSize) {
            row.push(new Chunk(this, [
              [[0, 0], [0, 1], [0, 2]],
              [[1, 0], [1, 1], [1, 2]],
              [[2, 0], [2, 1], [2, 2]]
            ], i, j))
          }
          result.push(row)
        }
        break
      default:
        throw new Error('Invalid chunkSize: ' + chunkSize)
    }
    return result
  }

  forEach (f) {
    if (typeof f !== 'function') {
      throw new TypeError('f must be function')
    }
    this.cells.forEach((row, r) => {
      row.forEach((cell, c) => {
        f.call(this, cell, r, c)
      })
    })
  }

  static concat (chunks) {
    const res = []
    const sz = chunks[0][0].sz
    chunks.forEach((r, row) => {
      r.forEach((chunk, col) => {
        chunk.forEach((val, cr, cc) => {
          const x = (row * sz) + cr
          let a = res[x]
          if (!a) {
            a = res[x] = []
          }
          a[(col * sz) + cc] = val
        })
      })
    })
    return new Chunk(res)
  }
}

module.exports = Chunk

if (require.main === module) {
  const f = fs.readFileSync('day21.txt', {encoding: 'utf8'})
  const lines = f.split('\n').slice(0, -1)

  const patterns = {}
  for (const line of lines) {
    const [inp, outp] = line.split(' => ').map(s => new Chunk(s))
    for (const p of inp.permute()) {
      patterns[p] = outp
    }
  }

  let cur = new Chunk('.#./..#/###')
  for (let i = 0; i < 18; i++) {
    const s = cur.sz
    if (s % 2 === 0) {
      cur = Chunk.concat(cur.chunks(2).map(r => r.map(c => {
        if (!patterns[c]) throw new Error('Unknown pattern for: ' + c)
        return patterns[c]
      })))
    } else if (s % 3 === 0) {
      cur = Chunk.concat(cur.chunks(3).map(r => r.map(c => {
        if (!patterns[c]) throw new Error('Unknown pattern for: ' + c)
        return patterns[c]
      })))
    }
  }
  let count = 0
  cur.forEach(val => {
    if (val === '#') {
      count++
    }
  })
  console.log(count)
}
