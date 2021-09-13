## Webpack 是做什麼用的？可以不用它嗎？
Webpack 是一個 Bundler，也就是可以把眾多模組及資源等等打包成一包上傳到 Server 的工具。

為了更瞭解 Webpack 是甚麼，首先就要先了解什麼是模組化。舉例來說當我在寫作業留言版的 JavaScript 時，可能為了不同的功能寫了各種琳瑯滿目的 function，但隨著功能越來越多程式也就越看越眼花撩亂，管理起來也很不方便。所以為了更好的維護這些程式碼，可以依功能將程式碼切分成一個個的小模組，這個過程就叫模組化。
但問題來了，當我將這些模組化的檔案放到網頁上運行時才發現瀏覽器不支援我的模組，這時就可以利用 Webpack 來幫我編譯和打包檔案以順利放到網頁上運行。Webpack 可以將任何類類型的檔案都看做是一個模組，也就是說它能編譯和打包的檔案並不僅限於 JavaScript，諸如圖片、CSS、Sass 等都可以是一個模組。解決了模組化的問題後還是會碰到其他問題，例如如果我的檔案使用了如 ES6 這種較新的語法時，有些瀏覽器是無法支援的，而 Webpack 也可以幫我在打包文件前先使用 loader （例如 Babel-loader）將檔案編譯成瀏覽器看得懂的語法後，再打包起來放到網頁上運行。而除了 loader 外，Webpack 也提供許多 plugin 來支援使用者寫程式上的各種需求，例如可以壓縮檔案大小的 minify。

至於是不是一定要使用 Webpack 其實視專案的情況而定，Webpack 是一種工具，可以讓較大型且複雜的專案維護起來更方便，尤其是多人協作的時候，透過模組化可以讓程式碼更一目瞭然，也可以透過編譯解決瀏覽器不支援的部分，但如果是一些小型的專案的話，其實也沒有一定要使用 Webpack，有時也不會比較方便。

### 參考資源
[Webpack 新手入門](https://tw.alphacamp.co/blog/webpack-introduction)


## gulp 跟 webpack 有什麼不一樣？
如前者所述，Webpack 是一個 Bundler，用來打包眾多模組。
而 Gulp 則是一個 task manager，可以用來處理各種重複度高的 task 以達到簡化工作量及提高效率。舉例來說，我的專案裡有許多檔案，每個檔案都各司其職也就是說各自都分別不同的任務，所以每個檔案都可以視作是一個 task，然後我可以自訂這些 task 要做什麼，Gulp 甚至可以把 Webpack 當做一個 task 來看。而 Gulp 的功能就是管理這些 task，它就是一個 task manager。

簡而言之，Webpack 是用來打包而 Gulp 是用來管理 task 的，兩個目的不同，只是都可以用來轉換檔案所以讓人感覺很類似，但事實上 Webpack 無法管理 task，而 Gulp 也沒辦法打包檔案，所以兩者是不一樣的。

### 參考資源
[Gulp 筆記：安裝、撰寫 Task、監看、例外錯誤處理和套件使用](https://cythilya.github.io/2016/08/20/gulp/)

## CSS Selector 權重的計算方式為何？
首先 CSS 讀取方式是由上而下，所以後讀取的權重如果大於等於前者則會把前者蓋掉，所以像 normalize.css 要比自己的 style.css 先載入，不然就會蓋過自己的 CSS。

基本的 CSS 權重順序為：inline-style > id > class > element > *
可以把權重的計算方式看做一個四位數 0000 幫助理解，最底層的 `*` 即是 0000 分數位於最底層，所以通常放在 CSS 檔案的最上方設定全站的預設值。接著再上一層的 element 為個位數 0001，class 為十位數 0010，id 為百位數 0100，inline 則為千位數 1000，分數越大權重就越大，權重大會蓋過權重小的，也就是說越上層的權重會蓋過下層的。

所謂的 element 即是指如：`body, div, ul, li, a` 等等。
class 是在 element 裡設定的 class="cards" 如：`.cards, .box, .username` 等等。
id 是在 element 裡設定的 id="cards" 如：`#cards, #box, #username` 等等。
inline-style 則是直接寫在 HTML 裡的 CSS，如：`<div style="background:blue"></div>`

所以舉例來說，如果要比較同層級間的權重的話：
```html
// main.html
<ul>
  <li>123</li>
</ul>

// style.css
ul {
  color: gold;
}

ul > li {
  color: green;
}

li {
  color: white;
}
```
最後的 "123" 到底會是什麼顏色呢？答案是綠色。
雖然單比 ul、li 的話以上面分數來看都是 0001，但是 li 在 ul 底下，所以 li 大於 ul，而 ul > li 權重為 0002，大於 0001 所以最後 "123" 是綠色。

其他同層級間比較以此類推。

那如果跨層級呢？
```html
// main.html
<ul>
  <li class="num">123</li>
</ul>

// style.css
ul {
  color: gold;
}

ul > li {
  color: green;
}

li {
  color: red;
}

ul > li.num {
  color: orange;
}

.num {
  color: white;
}

li.num {
  color: gray;
}
```
最後的 "123" 會是什麼顏色呢？答案是橘色。
因為 `.num` 的權重為 0010，`li.num` 為 0011，`ul > li.num` 為 0012，所以 `ul > li.num` 獲勝。

其他的跨層級也以此類推。

可以從 devTool 裡更直接地看到權重比較：
![](https://i.imgur.com/rPBoJB3.png)

另外，psuedo-class 和 attribute 的權種算法和 class 一樣，屬同層。(psuedo-class 如 `:hover`, `:focus`, `:nth-child()`，attribute 如 `[type="checkbox"]`)
最後 `!important` 是無敵的，權重大於其他層級除了自己，要小心使用。

不過要注意的是分數是一個方便理解的概念，即使底層的權重不斷疊加也不會覆蓋過上層的權重，也就是說就算疊加了 20 個 element 其權重也不會高於一個 class。 


### 參考資源
[小事之 CSS 權重](https://ithelp.ithome.com.tw/articles/10196454)
[5. CSS 權重](https://medium.com/neptune-coding/html-css%E6%95%99%E5%AD%B8-class%E6%AC%8A%E9%87%8D-71089ce29624)

