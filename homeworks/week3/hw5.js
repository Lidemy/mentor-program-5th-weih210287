/* eslint-disable no-multi-spaces */
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
  for (let i = 1; i <= Number(lines[0]); i++) {
    const [a, b, k] = lines[i].split(' ')  // a b k 為字串
    console.log(compare(a, b, k))
  }
}

function compare(a, b, k) {
  if (a === b) return 'DRAW'

  if (k === '-1') {  // 當 k = -1 比小時就把 a b 值互換，這樣結果就可以相反
    const temp = a  // 先暫存一個 a 值在 temp 裡
    a = b  // 把 a 換成 b
    b = temp  // 再把 b 換成 temp 裡的 a (因為此時 a 已經 = b)
  }

  const lenA = a.length
  const lenB = b.length
  if (lenA !== lenB) {  // 位數不相等時，較多位數的比較大
    return lenA > lenB ? 'A' : 'B'
  }
  return a > b ? 'A' : 'B'
}
