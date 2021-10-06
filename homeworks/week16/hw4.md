## 題目 What is this?
請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。
```javascript
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

## 執行結果
1. obj.inner.hello() => 2
2. obj2.hello()
3. hello()

## 執行流程
1. 因為 obj 是一個物件，所以可以將 `obj.inner.hello(obj.inner)` 看成 `obj.inner.hello.call()` 於是就可以推出 this 值為 `obj.inner`，而這邊 inner 裡的 hello 要印出 `this.value`，inner 裡的 value 值為 2，所以 `obj.inner.hello()` 結果印出 2。

2. 同上，可以將 `obj2.hello()` 看成 `obj2.hello.call(obj2)` 所以 this 值為 obj2 ，從題目變數宣告中可得知 obj2 = obj.inner，也就是 `{ value: 2, hello: [Function: hello] }`，所以看第一題一樣，這邊 hello() 要印出 `this.value`，inner 裡的 value 值為 2，所以 `obj2.hello()` 結果印出 2。

3. 這邊一樣可以將 `hello()` 看成 `hello.call(undefined)` 可以看到 hello 前面沒有東西 call，所以 this 的值為 global(依當下環境模式而改變)，而這邊 inner 裡的 hello 函式要印出 `this.value`，global 裡沒有 value 這個值所以印出 undefined。