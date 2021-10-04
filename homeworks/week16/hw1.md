## 題目 Event Loop
在 JavaScript 裡面，一個很重要的概念就是 Event Loop，是 JavaScript 底層在執行程式碼時的運作方式。請你說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```javascript
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

## 執行結果
1
3
5
2
4

## 執行過程
1. 把檔案的 main() 加入 stack，把 `console.log(1)` 加到 stack 裡並執行印出，結束後從 stack 裡清除。
2. 之後往下執行將第一個遇到的 setTimeout 加入 stack 疊在 main() 之上。
3. setTimeout 在 JavaScript 的 V8 引擎不支援，在瀏覽器上的話由 WebAPI 提供，所以當 JavaScript 執行到這裡時會將此 setTimeout 從原本的 stack 清除掉然後轉交給 WebAPI 處理。
4. WebAPI 開始計時 0 秒，0 秒過後將此 setTimeout 的 callback 推送到 Task Queue。
5. 將 setTimeout 交給 WebAPI 後 stack 就繼續往下執行，將 `console.log(3)` 堆疊到 stack 上方、印出 3、結束後從 stack 裡清除。
6. 往下執行將第二個 setTimeout 堆疊到 stack 上方，轉交給 WebAPI 處理並從 stack 裡清除
7. WebAPI 開始計時 0 秒，0 秒過後將此 setTimeout 的 callback 推送到 Task Queue，並排序在前一個 callback 之後。
8. 同時間 stack 這邊將往下執行遇到的 `console.log(5)` 堆疊在 stack 上方、印出 5、結束後從 stack 裡清除。
9. 沒有其他的程式碼要執行後將 main() 也從 stack 裡清除，stack 暫時全部清空。
10. 在檔案一開始執行時，Event Loop 便會不斷的檢查當前執行環境裡的 stack 是否是空的，現在 stack 已經清空了，Event Loop 就會檢查 Task Queue 裡有沒有函式待執行，而目前有兩個 callback 在 Task Queue 裡，於是 Event Loop 就會依序將這兩個 callback 推送到 stack 裡執行。
11. 將 callback `console.log(2)` 推送到 stack 執行、完成、清空。
12. Event Loop 發現 stack 又空了，把最後一個 callback `console.log(4)` 推送到 stack 裡。
13. `console.log(4)` 執行、完成、清空，Event Loop 檢查 stack 和 Task Queue 兩邊都沒東西了，檔案執行完畢。
