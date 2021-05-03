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
    // a b k 為字串
    const [a, b, k] = lines[i].split(' ')
    console.log(compare(a, b, k))
  }
}

function compare(a, b, k) {
  if (a === b) return 'DRAW'

  // 當 k = -1 比小時就把 a b 值互換，這樣結果就可以相反
  // 先暫存一個 a 值在 temp 裡
  // 把 a 換成 b
  // 再把 b 換成 temp 裡的 a (因為此時 a 已經 = b)
  if (k === '-1') {
    const temp = a
    a = b
    b = temp
  }

  const lenA = a.length
  const lenB = b.length

  // 位數不相等時，較多位數的比較大
  if (lenA !== lenB) {
    return lenA > lenB ? 'A' : 'B'
  }
  return a > b ? 'A' : 'B'
}
