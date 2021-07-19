## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
### 明碼
提到密碼為什麼最好要經過雜湊才存進資料庫就要先提到明碼。明碼就是可以直接被看到的密碼，如果資料庫裡的密碼是明碼的話就等於駭客只要駭進我的資料庫就可以直接看到所有人的密碼，一覽無遺，但這樣非常不安全。所以存入資料庫的密碼通常會經過處理改變成另一種型式儲存，也就為甚麼平常忘記密碼的時候系統都會寄一組序號給我而不是直接給密碼，因為他們也不見得知道我的密碼是什麼。

### 雜湊 vs 加密
#### 雜湊
密碼和雜湊的關係是多對一，多筆不同的資料經過雜湊後得到同一個結果，也就是說就算有心人駭入了我的資料庫得到了這筆雜湊過的密碼，它也不見得能還原出原本的密碼是甚麼，也就是不可還原。雖然不可還原但他可以驗證輸入的資料是否和雜湊結果一樣，以此判斷正確與否，也就是這個不可還原的特性很適合拿來儲存密碼，以確保即使我的密碼資料庫被害了對方也無法得知正確密碼只有使用者知道。雖然也有可能發生輸入不同資料得到一樣的雜湊結果也就是發生所謂的碰撞，但其機率甚小。

#### 加密
資料和加密的關係是一對一，像是把資料鎖進寶箱裡一樣，每筆資料就是一個箱子，對應著各自的金鑰，只要找到對的金鑰打開哪個箱子就可以看到哪筆資料。資料經過加解密演算法讓一般人看不到原始資料，同理也可以透過加解密演算法來還原，差別在於不同的金鑰
需要不同的演算法來解。

加密和雜湊的最大差別在於，加密可逆雜湊不可逆。加密的目的是為了不讓其他人輕易地看到我的資料，而只讓特定人士持有金鑰的人看到內容。雜湊的目的則是不要讓使用者以外的人知道我的資料，資料能不能被還原不重要只要能夠被驗證是正確的就好。兩者雖然同樣都是在保護資料但原理卻不一樣，適合的對象也不一樣。

參考資料：
[雜湊不是加密，雜湊不是加密，雜湊不是加密](https://dotblogs.com.tw/regionbbs/2017/09/21/hashing_is_not_encryption#:~:text=%E5%9C%A8%E4%BF%9D%E8%AD%B7%E5%AF%86%E7%A2%BC%E7%9A%84%E6%8A%80%E8%A1%93,%E8%87%AA%E5%B7%B1%E8%AC%9B%E5%87%BA%E4%BE%86%E7%9A%84%E9%82%A3)


## `include`、`require`、`include_once`、`require_once` 的差別
### include
使用 include 引入的檔案會等到被 PHP 網頁讀取到時才開始讀取執行引入的檔案內容，通常會讓程式經過特定條件判斷後才決定要不要引入 include，例如：
```
if ($dinner === 'McDonalds') {
    include('./mcdonald-menu.php');
} else {
    include('./kfc-menu.php');
}
```
include 適合用來引入動態程式碼，例如說上述這種是否呼叫取決於原本程式的判斷的時候。

### include_once
功能和 include 一樣，只是會檢查要引入的檔案內容是否在之前就引入過了，如果已經引入就不會再重複引入。舉例來說，如果在同一個檔案裡重複引入兩次同樣的自定義函數的話 PHP 會出錯，而使用 include_once 就可以事先檢查避免掉這種錯誤。

### require
比起 include，使用 require 引入的檔案會在 PHP 編譯程式碼的時候就把自己代換成該檔案裡的內容，而不是等到 PHP 編譯開始完執行程式碼時候才代換。require 適合用來引入靜態程式碼，如版權宣告，或是要呼叫使用頻率很高的檔案，才不會每次呼叫時都需重新讀取一次。

### require_once
功能和 require 一樣，但差別就和 include 和 include_once 一樣，會檢查要引入的檔案內容是否在之前就引入過了，如果已經引入就不會再重複引入。

include 和 require 兩者最大的差別就在於處理執行錯誤的方式。如果遇到錯誤 include 會出現 Warning Error 並繼續執行之後的程式，而 require 則會出現 Fatal Error 並停止後續動作。所以可以視遇到錯誤是否要繼續執行來參考決定用 include 還是 require。

參考資料：
[深入理解require與require_once與include以及include_once的區別](https://codertw.com/%e7%a8%8b%e5%bc%8f%e8%aa%9e%e8%a8%80/239900/)
[PHP引用檔案的函數區別](https://sanji0802.wordpress.com/2008/02/25/php%E5%BC%95%E7%94%A8%E6%AA%94%E6%A1%88%E7%9A%84%E5%87%BD%E6%95%B8%E5%8D%80%E5%88%A5requirerequire_onceincludeinclude_once/)


## 請說明 SQL Injection 的攻擊原理以及防範方法
### 攻擊原理
SQL Injection 就是指在送入資料庫的字串裡夾帶 SQL 指令，截斷我原本的指令並改成其他攻擊者希望執行的程式碼。

例如當要新增留言時直接使用：
 `sprintf('INSERT INTO comments(content) VALUES ('xxx') WHERE username = 123` 就將資料加進去的話，那麼就可以在我送出的留言裡輸入 ：
`'), ('admin', (SELECT password FROM users limit 1))#`
於是原本的程式碼就會變成：
`INSERT INTO comments(content) VALUES (''), ('admin', (SELECT password FROM users limit 1))#') WHERE username = 123`
等於是一次新增了兩則留言，第一則內容為空白第二則則是某人的密碼，而最後用 "#" 將剩餘的指令給無效化所以原本後面的條件就失效了。如此一來就巧妙地用 SQL 指令得到別人的密碼，在留言區可能就可以看到空白留言和 "admin" 是別人密碼的留言。也就是說攻擊者可以利用類似的方法任意取得資料庫資料或植入惡意程式碼。

### 防範方法：
所以為了預防攻擊者用字串拼接的方式去截斷我原本的程式碼，可以在資料輸入進資料庫前先過濾掉可能存在的 SQL 指令，例如：
```
$sql = 'INSERT INTO comments(content) VALUES (?) WHERE username = ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $content, $username);
$result = $stmt->execute();
```
1. 先用 `prepare()` 準備好要執行的 SQL 指令。
2. 之後使用 `bind_param()` 先告訴資料庫我要引入的資料類型是甚麼，才能降低不小心引入 SQL 指令的風險。一共有四種類型可以引入，分別是 i（整型）、d（雙精度浮點型）、s（字串）、b（布林值），每個引入的資料一定都要指定類型，不然會出錯。
3. 最後用 `execute()` 執行。

查資料的過程中發現其實防範方式百百種，但就像老師提到的用 PHP 內建的函式去執行應該就是最保障的，感覺應該是會比單純用變換單雙引號來防範更全面。

參考資料：
[PHP 中 bind_param() 函式用法分析](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/209392/)
[PHP 使用預備敘述句來查詢 MySQL 資料庫](https://www.inote.tw/php-prepared-statements-query-mysql)


##  請說明 XSS 的攻擊原理以及防範方法
### 攻擊原理
跨站腳本攻擊，是指沒有特別檢查用戶輸入的內容，所以讓攻擊者可以利用 HTML 或 JavaScript 等等將惡意的程式注入到網站裡，甚至竊取其他使用者的資料或做其他搗亂的事。以留言板為例，如果留言沒有事先檢查處理特殊字符的話當我輸入 `<h1>hello</h1>` 時留言就會以 HTML 裡預設的 h1 字樣顯示，也就表示攻擊者可以利用這個漏洞做更多事情像是彈出視窗干擾網站運行或是導向到惡意網站等等。

### 防範方法
可以用像 `htmlspecialchars()` 或 `htmlentities()` 等來修補 XSS 漏洞，他們會將影響到網站解析 HTML 的字符，例如 `< > & ' "` 轉換為僅能閱讀的 HTML 符號。防範時要盡量要在不更動到使用者留言內容的原則下作處理。


## 請說明 CSRF 的攻擊原理以及防範方法
### 攻擊原理
跨站請求偽造，因為網站判定來者身分時只認密碼不認人，也就是說只要對方傳來的 Cookie 或 Session 驗證通過了網站就會覺得對方是使用者本人。所以如果我的網站沒有特別檢查送過來 Request 的 Referer 是否來自不同網站的話，網站可能一看到來者的 Cookie 等資料是驗證通過的就允許對方的 Request 了。
例如我的部落格限制使用者只能在登入的狀態下刪除文章，所以使用者為了刪除自己的黑歷史就會登入了我的網站，這時如果使用者保持登入的狀態再去其他網站做其他事時，他在其他網站執行其他動作所發送的 Request 就會夾帶了他目前的 Cookie，而這個 Cookie 裡就包含了關於此使用者的各種資訊，如 Session id。如果剛好使用者瀏覽到一個惡意網站，那麼該網站就可以利用這個漏洞獲取使用者的 Cookie 並冒充他到我的網站做其他事，例如把原本使用者想刪除的黑歷史改成分享。

### 防範方法
大致分為使用者和 Server 防禦兩種。
#### 使用者防禦：
之所以 CSRF 能冒充使用者身分成功就是利用了使用者保持登入的狀態這點，所以如果使用者易使用完網站就登出的話對方就無機可乘了（想當初我還在笑我妹每次用她自己的電腦還要登出她的 Google 帳號，寫完作業後覺得多少有點道理但我還是覺得太麻煩了╮（╯＿╰）╭）

#### Server 防禦：
簡單來說就是要響辦法擋掉來自不同網域發出的 Request。

1. 首先要檢查送過來的 Request Header 裡一個名叫 Referer 的欄位，如果對方  Referer 裡不是我允許的 domain 就一律拒絕。但單純判斷 Referer 的話很可能會不小心擋下關閉自動帶 Referer 功能的真使用者，或是會被攻擊者鑽漏洞讓我誤判對方是合格 domain，所以還需要更多驗證機制。
2. 第二步就是多加一道簡訊或圖形驗證碼來驗證對方是不是真使用者，因為只有真使用者才看得到圖形驗證碼或收到驗證簡訊。這個機制雖然完美但如果要使用者每執行一個動作就輸一次驗證碼的話，在使用者體驗上便不盡理想。
3. 所以為了確認送 Request 的是否是真使用者本人，我就必須像上述第二步一樣用一些只有是只有真使用者才知道的資訊來驗證。於是使用一種較 CSRF token 的東西，此 token 是由 Sever 產生並且加密保存於 Server 的 Session 裡，每段時間會更新一次而且只有 Server 和真使用者知道，所以每當收到 Request 時 Server 就會去比對對方的 CSRF token 是否和自己 Session 儲存的一致，如果一致才確認是真使用者發的 Request。但此方法的小缺點是如果我的 Server 支持 Cross Origin 的 Request 的話，惡意網站可能還是可以從他的網站發 Request 給我進而得到我的 CSRF token。 
4. 於是再進階一點的方法就叫 Double Submit Cookie，和前者類似也是生成一組 CSRF token，只是與其存在 Server Session 裡，我在真使用者送出 Request 的同時在 Client 端設定一個叫 csrftoken 的 Cookie，並將這組 CSRF token 存入其中，所以我的網站就只要比對 Request Cookie 裡的 csrftoken 是否和我自己的一致就可以了。

（在寫第 4 點時小疑惑了一下，可是 CSRF 不就是在說惡意網站可以拿到使用者的 Cookie 嗎？為甚麼還要將 token 存在 Client 端的 Cookie 裡，後來才想對噢，這個方法贏就贏在即使惡意網站拿到使用著的 CSRF token 但他發過來的 Request 還是來自不同 domain，所以就算得到 token 他還是沒辦法設置同一個 domain 的 Cookie）

#### 瀏覽器防禦：
最後就是瀏覽器本身的防禦，畢竟之所以會有 CSRF 攻擊就是因為瀏覽器自帶 Cookie 這個機制。所以 Google 在 Chrome 51 版時就加入了名為 SameSite Cookie 的功能，之中又分為 Strict 和 Lax 兩種性質。Server 端只要在設置 Cookie 時在 Header 尾端加上 SameSite=Strict/Lax 就能成功設置。其中 Strict 可以限制 Cookie 只被加在 Same Site 的 Request 裡，如果是不同 Site 的 Request 就不會帶上該 Cookie。但 Strict 的缺點是可能使用者透過別的連接進入該網站時原本登入的狀態因為沒帶上 Cookie 就會變成登出，所以 Server 端可以考慮針對不同的操作驗證不同的 Cookie 或是使用另一種性質 Lax。Lax 相比 Strict 就比較寬鬆，原本會被限制不帶上 Cookie 的 `<a>, <link rel="xxx">` 或是使用 GET 的 from 都會帶上 Cookie，但如果是 POST 或是 PUT、DELETE 等方法才不帶上 Cookie。不過缺點就是 Lax 沒辦法擋下使用 GET 的 CSRF。
 

參考文章：
[CSRF 攻擊原理](https://medium.com/@Tommmmm/csrf-%E6%94%BB%E6%93%8A%E5%8E%9F%E7%90%86-d0f2a51810ca#:~:text=CSRF%E7%9A%84%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5%EF%BC%8C%E5%B0%B1%E6%98%AF,%E5%8F%AA%E6%9C%89%E9%80%8F%E9%81%8Eserver%E7%B5%A6%E4%BD%BF%E7%94%A8)
[老師的好推薦](https://blog.techbridge.cc/2017/02/25/csrf-introduction/)


## 額外不相干的心得：
因為查 PHP  prepare() 這部份時一直看到 PDO 這個字眼但又不太懂是什麼意思就去查了一下，得出的結論是他就是一種 PHP 用來連接 MySQL 資料庫的方式，除了 PDO 外還有 PHP-MySQL 和 PHP-MySQLi 兩種方法，三者的用法和內容稍微有點不同，感覺課程裡用的應該是 PHP-MySQLi。
其實寫作業出錯找資料時也一直有看到 PDO，只是沒有特別研究直到最後在寫簡答題的時候。而且因為這幾個的語法都很類似但規則有點不同所以網路上的解法是用哪個就複製貼上就會完全沒用 XD。