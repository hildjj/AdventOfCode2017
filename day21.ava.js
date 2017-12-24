'use strict'

const test = require('ava')
const Chunk = require('./day21')

test('chunks', t => {
  const c = new Chunk('1234/5678/abcd/efgh')
  const res1 = c.chunks(2)
  t.deepEqual(res1.map(r => r.map(s => s.toString())), [
    ['12/56',
     '34/78'],
    ['ab/ef',
     'cd/gh']
  ])

  const res2 = new Chunk('123456/67890z/abcdef/ghijkl/mnopqr/stuvwx').chunks(3)
  t.deepEqual(res2.map(r => r.map(s => s.toString())), [
    ['123/678/abc',
     '456/90z/def'],
    ['ghi/mno/stu',
    'jkl/pqr/vwx']
  ])
})

test('concat', t => {
  const c = new Chunk('1234/5678/abcd/efgh')
  const chunks = c.chunks(2)
  const res = Chunk.concat(chunks)
  t.is(res.sz, 4)
  t.is(res.toString(), '1234/5678/abcd/efgh')
})
