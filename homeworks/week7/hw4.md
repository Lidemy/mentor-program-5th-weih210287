## 什麼是 DOM？
Document Object Model，是一個把 html 文件內的各個元素轉換成物件的模型，也就是把所有標籤以及內容都轉成一個節點，然後由最上層往下延伸的樹狀模型。例如最上層頂端是節點 <html>，下一層分別是 <head> 和 <body>，<head> 下一層又有 <meta>, <title> 跟 <link>，而 <title> 底下又會有文字，<body> 也可以這樣一層層拆下去。
因為有許多不同的瀏覽器可以使用，如果沒有一個統一規則讓瀏覽器去編譯我們寫的網頁程式的話就會很麻煩，DOM 就是其中一種規則，方便我們利用 JavaScript 去改變 html 裡的內容，進而對網頁畫面做出改變。


## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
事件傳遞機制就是事件在 DOM 裡面傳遞的順序，可以分為三個階段順序分別為：捕獲、目標和冒泡。

捕獲：
是指 DOM 事件從最上層 window 開始往下一層層的跑直到抓到目標為止，此過程就就捕獲。
目標：
找到目標本身時，就是所謂的目標階段。
冒泡：
找到目標後，沿路返回到最上層就是冒泡。

例如今天的 html 長這樣：
```
<div class="all">
      <div class="outter">
        <div class="inner">
          <button class="core">
            click me
          </button>
        </div>
      </div>
    </div>
```

如果監聽 ".core" 捕獲的話，那麼就會從 outert 往下傳到 inner 最後傳到 core；如果監聽 ".core" 冒泡的話，就會變成從 core 往上傳到 inne 最後到 outter。

## 什麼是 event delegation，為什麼我們需要它？


## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
stopPropagation() 會阻止事件繼續往下或往上傳遞。而 preventDefault() 則是取消事件執行原本要執行的動作，例如原本要提交的東西就不會提交，原本要變色的東西竟不會變色，也就是說連開始執行都沒有， stopPropagation() 有開始執行，只是到一個階段就被停止了。

例如說我監聽 ".core"，設定點擊 core button 就會 alert "click!" 的話，加入 
event.preventDefault() 不管多用力點都不會有 alert。
同樣監聽 ".core"，如果我設定點擊任一 button 就會印出他的 class 的話，那麼原始情況下點擊 core 會顯示 core -> inner -> outter，但加入 event.stopPropagation() 就會只顯示 core，因為再繼續往上傳遞的動作就被阻止了。