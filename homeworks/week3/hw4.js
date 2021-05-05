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
  const tmp = lines[0].split('')
  let reverse = ''
  for (let i = tmp.length - 1; i >= 0; i--) {
    reverse += tmp[i]
  }
  if (reverse === lines[0]) {
    console.log('True')
  } else {
    console.log('False')
  }
}
