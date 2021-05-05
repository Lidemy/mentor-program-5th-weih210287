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
  const tmp = lines[0].split(' ')
  for (let i = Number(tmp[0]); i <= Number(tmp[1]); i++) {
    if (isNarcissistic(i)) {
      console.log(i)
    }
  }
}

// 判斷數字 n 有幾位
function digitsCount(n) {
  if (n === 0) return 1

  // 看除以 10 多少次才會是 0
  let result = 0
  while (n !== 0) {
    n = Math.floor(n / 10)
    result++
  }
  return result
}

// 是否為水仙花數
function isNarcissistic(n) {
  // 複製一個 n => m，之後判斷比較方便
  let m = n

  const digits = digitsCount(m)
  let sum = 0
  // 用每次除 10 的餘數來取出各個位數
  while (m !== 0) {
    const num = m % 10
    sum += num ** digits
    m = Math.floor(m / 10)
  }
  return sum === n
}
