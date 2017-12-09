'use strict'

const fs = require('fs')
const peg = require('pegjs')

const f = fs.readFileSync('day9.pegjs', {encoding: 'utf8'})
const parser = peg.generate(f)

const inp = fs.readFileSync('day9.txt', {encoding: 'utf8'})
const res = parser.parse(inp)
console.log(res.score(), res.cancelled())
