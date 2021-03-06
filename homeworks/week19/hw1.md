## 期末專案規劃
### 專案發想
讀書紀錄 Web app - 一個子彈日記風格的讀書紀錄網頁。

因為自己有在用讀書紀錄 app，而使用讀書紀錄器的目的就是為了讓記錄自己一天的時間分配，除了提升往後的時間分配外同時也可以激勵自己。但是大部分找到的讀書紀錄器都是 app 為主，很少有網頁版。

身為一個主要以電腦工作為主的人為此感到很困擾，因為只要拿一起手機或 ipad 就很容易分心開始滑各種社交媒體，舉例來說今天好不容易要開始專心讀書的，想說打開手機裡的讀書紀錄 app 開始計時，結果就被突然跳出的一則很有趣的貼文通知吸引住然後一發不可收拾，這樣反而失去了原本用讀書紀錄 app 的目的。

所以才想自己開發一個網頁版，讓人在使用電腦工作時也能專心紀錄讀書時間。

### User Story
身為**未登入**的使用者
- P1 我需要能夠登入或註冊的頁面
- P1 我要登入了才能開始使用所有功能

身為**未登入**的使用者在註冊頁面
- P1 我需要三個空格來填入使用者暱稱、電子信箱、密碼
- P1 我需要點擊送出鈕來送出註冊表單
- P3 我送出表單後要通過信箱郵件來啟動帳號

<br>

身為**已登入**的使用者在登入頁面
- P1 我需要三個空格來填入使用者暱稱、密碼
- P1 我需要點擊送出鈕來送出登入表單

身為**已登入**的使用者在所有頁面
- P1 我需要點擊 navigation bar 來自由切換頁面和登出帳號

身為**已登入**的使用者在計時器頁面 
- P1 我需要一個學科列才能在計時開始前選擇要計時的學科
- P1 我未選擇學科時，學科列會自動將第一門學科設為預設
- P1 我需要點擊開始鈕計時器才會開始計時
- P1 我需要再次點擊開始鈕計時器才會停止計時，同時當前紀錄的時間會同步到該學科當天的讀書紀錄裡
- P1 我需要一個顯眼的小標題顯示當天的日期

身為**已登入**的使用者在學科頁面
- P1 我需要一個列表來查看/修改/刪除現有學科
- P1 我需要一行新增欄來填入新增學科名稱
- P1 我需要點擊新增鈕新增學科
- P3 我希望在新增學科時有一個選擇列表讓我選擇學科的代表色

身為**已登入**的使用者在月曆頁面
- P1 我需要一個大而顯眼的月曆以供查看之前和當下的學科紀錄
- P1 我需要點擊月曆上的日期來查看/修改/刪除/新增當天的學習紀錄
- P3 我希望有切換欄來將顯示模式從月曆切換成週曆

身為**已登入**的使用者在使用者頁面
- P3 我需點擊修改鈕來修改暱稱、密碼

### Wireframe

![](https://i.imgur.com/zZHMtL5.jpg)


### 網頁呈現風格
- [子彈日記](https://www.pinterest.com/vi31232/bullet-journal/)

應該是不會像圖片呈現的那麼花俏，畢竟自己一組又時間有限，目前想法是盡量在排版上呈現筆記本的感覺就好。

### 參考的網頁及 app
- **[YPT - Yeolpumta](https://play.google.com/store/apps/details?id=com.pallo.passiontimerscoped&hl=zh_TW&gl=US)**
- **[Memory Stack](https://milletbard.com/26Memory/#/)**
