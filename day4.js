'use strict'

const fs = require('fs')
const f = fs.readFileSync('pw.txt', {encoding: 'utf8'})

let count = 0
for (const line of f.split('\n')) {
  if (!line) {
    continue
  }
  const words = line.split(/\s+/g).map(w => w.split('').sort().join(''))
  const st = new Set(words)
  if ((words.length > 0) && (words.length === st.size)) {
    count++
    console.log(words.sort())
  }
}
console.log(count)
