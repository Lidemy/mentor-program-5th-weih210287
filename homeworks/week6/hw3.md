## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
1. <datalist>
可以為 <input> 提供預設好的選項清單，幫助使用者自動填入選取的選項。<datalist> 的參數 "id" 須和 <input> 的參數 "list" 相同兩個標籤才能串聯起來。而 <datalist> 底下則搭配 <option> 使用，<option> 的參數 "value" 就是預設好的選項，例如：

```html
    <div class="question">
      <label for="color">小叮噹是什麼顏色</label>
      <input type="text" name="color" id="color" list="colors" />
      <datalist id="colors">
        <option value="藍色" />
        <option value="紫色" />
        <option value="粉紅色" />
        <option value="黃色" />
      </datalist>
    </div>
```

2. <details>
搭配 <summary> 當作標題一起用，是一個可以和使用者互動的展開式說明，預設狀態為隱藏，當使用者點擊 <summary> 時底下的說明文字就會展開，例如：

```html
    <div class="cat">
      <details>
        <summary>挪威森林貓</summary>
        <p>Skogkatt 是挪威土語「森林貓」，因此純種貓的品種中，挪威森林貓的土語便是「Norsk Skogkatt」，英語中有許多不同的俗稱，如：Wegie，也稱為 Skogkatt。</p>
      </details>
      <details>
        <summary>英國短毛貓</summary>
        <p>總之就是很可愛</p>
      </details>
      <details>
        <summary>斯芬克斯貓</summary>
        <p>我妹說很醜，可是明明就很可愛，哼</p>
      </details>
    </div>
```


3. <map>
搭配 <area> 使用，可以在一張圖片上劃出不同區塊並將那些區塊變成超連結。<area> 一共有 rect, circle, poly 三種 shape 型式，並以 coords 劃出圖案。
rect: coords="x1, y1, x2, y2"
circle: coords="x, y, 半徑" (x, y 為圓心)
poly: coords="座標1, 座標2, ..."

Codepen 上的範例：
```html
    <img src="http://www.emailonacid.com/images/blog_images/Emailology/2017/2017_imagemap/shapes.jpg" usemap="#image-map" width="600">
      <map name="image-map">
        <area shape="rect" alt="Square" coords="30,29,306,153" href="https://www.google.com/">
        <area shape="poly" alt="Triangle" coords="323,267,572,26,571,267" href="https://www.google.com/">
      </map>
```


## 請問什麼是盒模型（box modal）
在 html 裡每個元素都會被一個 box 給包裹住，而這個 box 由外而內分別由 margin, border, padding 層層包圍住此元素的核心 content，這樣像盒子一樣的模型就叫 box model。

所謂的 content 就是元素本身的內容，例如一段文字或一張圖片、padding 就是介於 border 和 content 間的距離、border 是包住 padding 和 content 框線、margin 則是位於最外層，border 和其他元素的距離。
可以想成是一顆氣球， content 位於氣球核心、border 是氣球的皮，可以被看見也可以調整粗細、而 padding 就是往氣球裡吹氣或灌水，他會包住 content，並從內部撐開氣球、最後 margin 就是氣球和外部其他東西的距離。

不同型態的 box modal 尺寸會有不同的計算方式，主要分成兩種型態：block box 和 inline box。


## 請問 display: inline, block 跟 inline-block 的差別是什麼？
display: inline 會使元素全部排列在同一行，無法調整各元素的上下寬高或距離，無論怎麼調整都會是元素 content 的大小，但是可以調整左右兩邊，及同一行內的距離。比較特別的是調整 padding 時雖然看起來高度可能變高了，但其實他是把元素由內而外撐開了，就像是把原本的行變高了這樣。
display: block 會使元素以區塊的方式呈現，每一塊即是一行，不論元素有多大多小都會直接站滿一行，如果有多個 block 的話他們就會由上到下排列。
display: inline-block 會使一個元素對外像表現像 inline，可和多個元素並存在同一行內，而對內表現則像 block ，一行只能有一個元素也可以調上下寬度。


## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
static 是網頁預設的定位方式，也就是會按照瀏覽器預設的排版，不會被特別定位
relative 的定位點是元素本身，可以以自身當作起點上下左右移動而不影響其他元素。
absolute 則是會往元素上層找到第一個 position 不是 static 的元素當作參考點定位，對於想要在一個固定的範圍內移動元素時很好用，如果網上都找不到不是 static 的元素就會以 body 當作參考點。
fixed 可以將元素定位在畫面上固定的位置，不管往下往上滑動頁面元素都會死死釘在指定的點上。

另外補充我自己遇到的疑惑點，關於 position 和 display 的差別：
position 是一個元素在頁面上的定位方式，而 display 則是指不同的 box 類型。
