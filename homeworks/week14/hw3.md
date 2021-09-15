## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
### DNS
網域名稱系統，他可以將一般我們看到的網址如 "www.hello.com" 轉成電腦看得懂的 IP "192.0.2.1" 好讓他們互相連線。當我在瀏覽器裡輸入網址按下搜尋後，DNS 便會依其架構從最底層根網域一層層往下查詢，直到得到目標 IP 為止。

### Google Public DNS
Google 為了提供使用者更好的網路瀏覽體驗，自行開發了一個免費公開的 DNS 服務。因為 Google Public DNS 的主機位於根網域下一層，所以在解析網址時就不用再轉太多層，所以能夠比較快找到目標 IP。同時也針對一般 DNS 快取失效的問題做了各種改善，如在快取失效前先 Prefetch ，以縮短網頁的 DNS 搜尋時間。再者 Google Public DNS 對於控管比一般 ISP 公司嚴格所以安全性也會比較高。最後因為其規模比其他 ISP 公司都來得大，所以穩定性也相對較高。簡而言之，Google Public DNS 的優勢就在他的，速度、安全、正確性。

另一方面， Google 也可以透過提供這項服務來強化自己的搜尋引擎，蒐集使用者的瀏覽偏好，讓大家有更好的使用體驗。


[DNS 伺服器是什麼？](https://www.stockfeel.com.tw/dns-%E4%BC%BA%E6%9C%8D%E5%99%A8%E6%98%AF%E4%BB%80%E9%BA%BC%EF%BC%9F%E5%A6%82%E4%BD%95%E9%81%8B%E7%94%A8%EF%BC%9F/)
[Google Public DNS](https://developers.google.com/speed/public-dns/faq#nxdomains)
[《Google Public DNS》](https://steachs.com/archives/1364)
[隨手寫寫~~~ Google Public DNS](http://blog.dsp.idv.tw/2010/02/google-public-dns.html)


## 什麼是資料庫的 lock？為什麼我們需要 lock？
lock 是指在更新資料以前先為這筆資料加上一個狀態，將其鎖住，防止多個 Transaction 同時更動到同一筆資料造成衝突，也就是發生 Race Condition。

舉例來說如果今天我是一個網購平台，目前跳樓大拍賣只剩一個最後一項商品還在架上，但同時卻有兩位消費者下單這項商品，可是因為 server 幾乎同時收到這兩條 request 的關係，所以就讓資料庫就在庫存為 1 的情況下重複扣了兩次 "-1"，於是最後這兩位消費者都收到了購買成功的訊息，但實際上我的庫存卻變成了負數而超賣。

而 lock 便可以讓 Transaction 遵守 Isolation 這個特性以防止以上的情況發生。可以依不同需求使用不同層級的 lock，小至鎖定一個 row，大至鎖定整個 Database 都可以。另外也會依加上的狀態不同而有不同的鎖定方式。

要注意的是 lock 只在 Transaction 裡有效。


[資料庫的交易鎖定 Locks](https://www.qa-knowhow.com/?p=383)

## SQL 跟 NoSQL 的差別在哪裡？
SQL (Structured Query Language) 結構化查詢語言，是指在操作關聯式資料庫時所使用的程式語言，也因為結構化的關係，儲存的資料內容較嚴謹，資料表之間彼此存在著關聯性，適合用來做複雜的資料查詢、儲存重要的資料，但同時資料庫的擴充性也相對較弱，成本也較高。
常見的使用 SQL 的資料庫如 MySQL、PostgreSQL、Oracle 等等。

NoSQL (Not only SQL) 管理非關聯式資料庫系統的統稱。 通常以 JSON 格式儲存資料，和 SQL 系統最大的不同是 NoSQL 系統裡的資料不需經過規劃且不支援 JOIN。雖然資料查詢的速度較慢，但使用起來彈性較大可擴充性也較高，適合用來存資料結構不固定，不需要做過於複雜的查詢的資料。
常見的使用 NoSQL 的資料庫如 MongoDB、Redis、Apache 等等。


### 參考資料
[SQL 與 NoSQL](https://ithelp.ithome.com.tw/articles/10187443)
[SQL/NoSQL是什麼？](https://tw.alphacamp.co/blog/sql-nosql-database-dbms-introduction)
[SQL 與 NoSQL 的用法](https://ittoos25.pixnet.net/blog/post/323794267-%5B%E8%B3%87%E6%96%99%E5%BA%AB%5D-sql-%E8%88%87-nosql-%E7%9A%84%E7%94%A8%E6%B3%95)
[干货 | SQL 与 NoSQL还在傻傻分不清？](https://zhuanlan.zhihu.com/p/63371253)
[什麼是SQL？什麼是NOSQL? ](https://codegym.tech/blog/sql_vs_nosql.html)

## 資料庫的 ACID 是什麼？
ACID 是 Transaction 為了確保更新資料庫資料的正確性所具備的 4 個特性。

Transaction 是將一個或多個對資料庫的指令，包在同一個任務裡執行。
舉例來說，今天有一家網購平台，消費者在平台上買了一條橡皮擦，這時他的訂單裡的橡皮擦樹會 " +1"，同時平台架上的橡皮擦庫存總數應該要 "-1" 這樣兩邊的數才會平衡。也就是說雖然只有消費者執行了購買這個動作，但其實背後應該要下兩條 SQL 指令，但是如果每下一次 SQL 就要 commit 一次的話執行效率並不是很好，如果同時有很多消費者都在下單，那每個人下單一次，server 就要 commit 兩次豈不是忙死？所以更好的方式是把這些指令全都包在一個 Transaction 裡，一次執行後再 commit。

但這個過程中難保不會出差錯，所以 Transaction 具備了 ACID 四個特性，分別為：
Atomicity 原子性：Transaction 的更動不是全部成功就是全部失敗，如果中途出錯就回滾到最一開始的狀態，因此不會有一半資料更新成功一半失敗的情況發生。
Consistency 一致性：Transaction 更動前後資料都必須遵守資料庫的約束，才能保持資料的完整性。例如資料庫有約束每個帳戶的餘額不得為負，那麼如果 A 有 100 塊，要轉帳給 B 200 塊的話，Transaction 就會失敗，因為成功的話 A 的帳路餘額就會變成 -100 塊，不符合當初資料庫的約束。
Isolation 隔離性：為了確保資料不會同時受到多個 Transaction 更動而導致資料庫發生衝突或 Transaction 錯誤的情況發生，會將更動中的資料隔離。
Durability 持久性：Transaction 結束後，對資料的更動就是永久的。


[如何理解数据库事务中的一致性的概念？](https://www.zhihu.com/question/31346392)
[ACID 維基](https://zh.wikipedia.org/wiki/ACID)