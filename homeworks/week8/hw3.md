## 什麼是 Ajax？
全名 Asynchronous JavaScript and XML 是一種創建互動式網頁的網頁開發技術。
特色是可以將 Server 回傳的資料交給 JavaScript 處理和操作 DOM 來執行進一步的動作。
簡單來說，任何用 JavaScript 和伺服器做的非同步資料交換都可以叫 Ajax，但因為早期的資料交換的格式是用 XML，所以才叫 Ajax，現在已經多了很多種其他資料交換的格式。
而所謂的非同步就是指當我向 Server 發送請求時，我可以同時處理其他事，不用等到有了 Response 後才執行下一步的動作，也就是說如果是同步的話，在還沒有收到 Response 前我的網頁可能就會死在那邊直到它接收到結果才會繼續執行下一步。


## 用 Ajax 與我們用表單送出資料的差別在哪？
和傳統表單交換資料不同，用表單交換資料的話，資料從 Server 回傳時會回傳一個新的網頁給瀏覽器，瀏覽器再將結果渲染出來，但因為傳送出去的 Request 和回傳回來的 Response 大部分的 HTML 都是重複的，而且每次要取得資料都要再重新送一次 Request 給 Sever ，所以這樣會很仰賴 server 回覆時間，處理資料會比較沒效率。
而 Ajax 則是可以只向 Server 請求並回傳需要的資料，直接傳給 client 的 JavaScript 處理，所以 Server 和瀏覽器間需要交換的資料便大大減少了，於是 Server 的 Response 就會更快，因此也更有效率。

## JSONP 是什麼？
JSON with Padding 和 Ajax 類似，也是一種資料交換的方式。只是和 Ajax 不同的是 JSONP 可以不受同源政策的限制來達到資料交換的目的。
同源政策就是指不允許跨域的資料交換請求，因為跨域的資料交換會有安全性上的風險。也就是說必須同時滿足協議、域名、埠，三個元素都相同才算同源。舉例來說，`http://www.hello.com` 和 `https://www.hello.com` 就屬於不同源，雖然域名跟埠都相同但是 http 和 https 是不同協議，所以不同源。

而 JSONP 就是利用了 HTML 中 <script> 裡的 src 屬性巧妙地規避同源政策的限制，也就是用 src 之前的 <script> 製作一個函式處理跨域的資料並將取得的資料整理成 JSON 最後當成參數回傳，所以當我用 src 呼叫這個函式時就會得到一串 JSON 格式的資料。也就是為甚麼這種方式會叫 JSON Padding 的原因，因為它是在一個函式裡塞入 JSON 資料回傳給 src。
除了 <script> 以外，其他像 <img> 或 <iframe> 也都可以使用 src。


## 要如何存取跨網域的 API？
在同源政策的限制下，來自不同源的請求會被擋下，而跨來源資料共享 CORS(Cross-Origin Resource Sharing) 則規範了一個方式讓瀏覽器和 Server 間能夠互相確認彼此是否足夠安全進行資料交換。

也就是 Server 的 Response Header 需含有 Access-Control-Allow-Origin，如果沒有的話就會因為同源政策被接收 Response 的瀏覽器給擋下，拒絕不同源的伺服器存取或取得資料的權限。

舉例來說就像是做作業二在存取 Twitch 資料時必須先在我的 Request Header 加上 Client-ID 和 Accept，Twitch 才會接受我的 GET 請求。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
主要是因為安全性的問題，必須要加上一些限制才能避免陌生的瀏覽器任意地存取或修改資料。像同源政策主要是針對用瀏覽器做資料交換時才會有的限制，而第四週時是在本機上使用 node.js 就不會受到這個限制。

