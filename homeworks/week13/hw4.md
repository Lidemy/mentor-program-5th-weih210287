## Webpack 是做什麼用的？可以不用它嗎？
Webpack 是一個 Bundler，也就是可以把眾多模組及資源等等打包成一包上傳到 Server 的工具。

為了更瞭解 Webpack 是甚麼，首先就要先了解什麼是模組化。舉例來說當我在寫作業留言版的 JavaScript 時，可能為了不同的功能寫了各種琳瑯滿目的 function，但隨著功能越來越多程式也就越看越眼花撩亂，管理起來也很不方便。所以為了更好的維護這些程式碼，可以依功能將程式碼切分成一個個的小模組，這個過程就叫模組化。
不過還有一個問題是如果使用了如 ES6 這種較新的語法時，有些瀏覽器是無法支援的，而 Webpack 就可以幫助我在打包文件前先使用 loader （例如 Babel-loader）將檔案編譯成瀏覽器看得懂的語法後，再打包起來放到網頁上運行。Webpack 可以將任何類類型的檔案都看做是一個模組，也就是說能編譯和打包的檔案並不僅限於 JavaScript，諸如圖片、CSS、Sass 等都可以視做是一個模組。除了 loader 外，Webpack 也提供許多 plugin 來支援使用者寫程式上的各種需求，例如可以壓縮檔案大小的 uglify 或 minify。

至於是不是一定要使用 Webpack 其實視專案的情況而定，Webpack 是一種工具，可以讓較大型且複雜的專案維護起來更方便，尤其是多人協作的時候，透過模組化可以讓程式碼更一目瞭然，也可以透過編譯解決瀏覽器不支援的部分，但如果是一些小型的專案的話，其實也沒有一定要使用 Webpack，有時反而也不會比較方便。

### 參考資源
[Webpack 新手入門](https://tw.alphacamp.co/blog/webpack-introduction)

## gulp 跟 webpack 有什麼不一樣？
如前者所述，Webpack 是一個 Bundler，用來打包眾多模組。而 Gulp 則是一個 task manager，可以用來處理各種重複度高的 task 以此達到簡化工作量及提高工作效率。


## CSS Selector 權重的計算方式為何？

