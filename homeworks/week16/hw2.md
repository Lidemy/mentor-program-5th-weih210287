## 題目 Event Loop + Scope
請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```javascript
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

## 執行結果
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5

## 執行流程
1. 把全域環境的 main() 加到 Call Stack 裡，之後將 for 迴圈加入到 Call Stack 裡，開始執行 for 迴圈。
2. 執行 i = 0，檢查 i < 5 沒錯，進入第一圈 for 迴圈，將 `console.log('i: ' + i)` 加到 Call Stack 裡並印出 `i: 0`，印出完將 `console.log('i: ' + i)` 從 stack 裡清除。
3. 將 setTimeout 加入到 Call Stack 中，並轉交給 WebAPI 處理同時從 Call Stack 裡清除，WebAPI 開始計時 `i * 1000(毫秒)` 也就是 `0 * 1000 = 0`，0 毫秒之後將此 setTimeout 裡的 callback 推送到 Task Queue 裡。
4. Call Stack 在送走第一圈的 setTimeout 後就會繼續往下執行，來到第二圈迴圈，i = 1，檢查 i < 5 沒錯，進入第二圈，執行 `console.log('i: ' + i)`，印出 `i: 1`，印出結束後從 Call Stack 裡清除。
5. 將 setTimeout 加入到 Call Stack 中，轉交給 WebAPI 處理同時從 Call Stack 裡清除，WebAPI 開始計時 `1 * 1000 = 1000`，1000 毫秒之後將此 setTimeout 裡的 callback 推送到 Task Queue 裡。
6. 重複 4.，i = 2，i < 5，印出 `i: 2`，結束後從 Call Stack 裡清除。
7. 重複 5. 轉交給 WebAPI 後開始計時 `2 * 1000 = 2000`，2000 毫秒後將 callback 推送到 Task Queue。(之後隨著 i 的改變分別計時 3000 和 4000 毫秒)
8. 一直重複上述兩點動作直到第五圈結束準備進入第六圈時，i = 5，i < 5 錯誤，結束迴圈，將迴圈從 Call Stack 清除。
9. 將 main() 從 Call Stack 中清除，此時 Event Loop 檢查到 Call Stack 空了，於是依序將 Task Queue 裡的 callback 推入 Call Stack 並執行，印出 i = 5，執行結束清空 Call Stack。
10. 隨著 Event Loop 每次檢查到 Call Stack 清空就會推入下一個 callback，執行完畢再次清空 Call Stack，重複 5 次直到 Task Queue 裡沒有任何待執行的 callback，到這邊全部執行完畢。

## Scope
如果把 for 迴圈的 `var i = 0` 改成 `let i = 0` 的話，最後 setTimeout 印出就不會全部都是 5，而是 0 ~ 4，原因是因為 let 和 var 的作用域不同。

使用 var 時，i 會被宣告為全域變數，可以想成是 i 在迴圈外就宣告過了，只是在執行 for 迴圈之前 i = undefined，而最後跳出 for 迴圈時 i 的值為 5，這時印出的 i 值就會是 5。

可以想成這樣就會比較好理解：
```javascript
var i
for(i=0; i<5; i++) {
  console.log('i: ' + i)
}

// 而 setTimeout 的 callback 是在 for 迴圈結束才執行印出 i
console.log(i) // 5
```
但如果是使用 let 的話，let 的作用域只在當前的 for 迴圈裡，所以每次的 i 都是獨立的，所以雖然一樣都是在 for 迴圈結束才會執行 setTimeout 裡的 callback 印出 i，因為 setTimeout 的 callback AO 會記錄當時該圈裡的 i 值，所以最後即使迴圈結束了 javaScript 還是知道 i 要印出 0 ~ 4。