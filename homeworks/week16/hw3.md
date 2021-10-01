請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

### 印出結果
依序為：
1. undefined
2. 5
3. 6
4. 20
5. 1
6. 10
7. 100

### Why?
1. 建立 global EC，global VO 初始化後宣告變數 a 及 fn()
```js
global EC {
  global VO {
    a: undefined,
    fn: function
  }
}
```
2. 執行賦值 a = 1
```js
global EC {
  global VO {
    a: 1,
    fn: function
  }
}
```
3. 建立 fnEC，fn VO 初始化後宣告變數 a 及 fn()
```js
fn EC {
  fn VO {
    a: undefined, // 因為 fn() 裡有宣告變數 a，宣告會提升至 fn() 開頭
    fn2: function
  }
}

global EC {
  global VO {
    a: 1,
    fn: function
  }
}
```
4. 執行 console.log(a)，此時 fn VO 的變數 a 為 undefined，印出結果為 undefined。
5. 執行賦值 a = 5
```js
fn EC {
  fn VO {
    a: 5,
    fn2: function
  }
}

global EC {
  global VO {
    a: 1,
    fn: function
  }
}
```
6. console.log(a)，此時 fn VO 裡的變數 a 為 5，印出 5。
7. 執行 a++，a 賦值 6。
```js
fn EC {
  fn VO {
    a: 6,
    fn2: function
  }
}

global EC {
  global VO {
    a: 1,
    fn: function
  }
}
```
var a，fn 裡重複宣告變數 a，忽略。

8. 建立 fn2EC，fn2 VO 初始化沒有宣告任何變數或函式，變數 b 之前從未被宣告過，所以其宣告提升至 global VO
```js
fn2 EC {
  fn2 VO {

  }
}

fn EC {
  fn VO {
    a: 6, 
    fn2: function
  }
}

global EC {
  global VO {
    a: 1,
    b: undefined,
    fn: function
  }
}
```

9. console.log(a)，fn VO 裡變數 a 值為 6，印出 6。

10. a = 20，a 賦值 20
```js
fn2 EC {
  fn2 VO {

  }
}

fn EC {
  fn VO {
    a: 20, 
    fn2: function
  }
}

global EC {
  global VO {
    a: 1,
    b: undefined,
    fn: function
  }
}
```
11. b = 100，b 賦值 100
```js
fn2 EC {
  fn2 VO {

  }
}

fn EC {
  fn VO {
    a: 20, 
    fn2: function
  }
}

global EC {
  global VO {
    a: 1,
    b: 100,
    fn: function
  }
}
```
fn2() 執行完畢，清空 fn2EC。
fn() 執行完畢，清空 fnEC。
12. console.log(a)，global VO 變數 a 為 1，印出 1。
```js
global EC {
  global VO {
    a: 1,
    b: 100,
    fn: function
  }
}
```
13. a = 10，a 賦值 10
```js
global EC {
  global VO {
    a: 10,
    b: 100,
    fn: function
  }
}
```
14. console.log(a)，global VO 變數 a 為 10，印出 10。
console.log(b)，global VO 變數 b 為 100，印出 100。