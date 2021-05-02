/* eslint-disable no-trailing-spaces */
const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => {
  lines.push(line)
})

rl.on('close', () => {
  solve(lines)
})

function solve(lines) {
  const c = Number(lines[0])
  const n = Number(lines[1])
  const arr = []
  for (let i = 2; i < lines.length; i++) {
    arr.push(lines[i])
  }
  
  arr.sort((a, b) => b - a)

  let max = 0
  if (c > n) {
    for (let j = 0; j < arr.length; j++) {
      max += Number(arr[j])
    }
  } else {
    for (let k = 0; k < c; k++) {
      max += Number(arr[k])
    }
  }
  console.log(max)
}
