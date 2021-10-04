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
