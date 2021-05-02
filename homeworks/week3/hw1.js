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
  let stars = ''
  if (Number(lines) === 0) return
  for (let i = 0; i < Number(lines); i++) {
    stars += '*'
    console.log(stars)
  }
}
