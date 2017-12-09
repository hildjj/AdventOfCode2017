'use strict'

const fs = require('fs')
const peg = require('pegjs')

const f = fs.readFileSync('day9.pegjs', {encoding: 'utf8'})
const parser = peg.generate(f)

const tests = [
  '<>',
  '<random characters>',
  '<<<<>',
  '<{!>}>',
  '<!!>',
  '<!!!>>',
  '<{o"i!a,<{i<a>',

  '{}',
  '{{{}}}',
  '{{},{}}',
  '{{{},{},{{}}}}',
  '{<{},{},{{}}>}',
  '{<a>,<a>,<a>,<a>}',
  '{{<a>},{<a>},{<a>},{<a>}}',
  '{{<!>},{<!>},{<!>},{<a>}}',

  '{{<ab>},{<ab>},{<ab>},{<ab>}}',
  '{{<!!>},{<!!>},{<!!>},{<!!>}}',
  '{{<a!>},{<a!>},{<a!>},{<ab>}}'
]

for (const t of tests) {
  try {
    const inp = parser.parse(t)
    if (inp.score) {
      console.log(inp.score(), inp)
    } else {
      console.log(inp)
    }
  } catch (e) {
    console.log(e.message)
  }
}
