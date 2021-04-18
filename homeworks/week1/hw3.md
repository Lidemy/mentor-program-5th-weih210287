## 教你朋友 CLI
#### Q1. 什麼是 Command Line 以及如何使用？
- 想要操控電腦可以透過兩種方法：
    1. **圖形化使用者界面** Graphical User Interface （GUI）
    透過圖行來操控電腦，例如我們平常習慣的點選資料夾來打開它，滑鼠右鍵新建資料夾等等
    
    3. **命令列界面** Command Line Inteface （CLI）
    不同於圖形化，CLI 是一種透過純文字來操控電腦的方法，透過執行 Command Line 來操控電腦達成我們的目的
- 所以簡單來說 Command Line 指的就是下在 CLI 裡的命令
- 我們可以透過一些基本的指令來操作它，例如:
    * **` pwd ` 顯示所在位置**
    可以顯示目前的所在位置，或在後面加上檔案名稱顯示檔案的所在位置
    
    * **` cd ` 切換至指定位置**
     另外有些命令也可以搭配不同的參數來執行更詳細的動作，如：
     ` cd .. ` 在 cd 後加上 ". ." 來回到所在位置的上一層 
    * **` ls ` 列出所有文件**
    `ls -al` 顯示更詳細的文件資料
    * **` touch ` 碰一下檔案**
    新建檔案或更新檔案最後的修改時間
    * **` mkdir ` 新建資料夾**
    * **` rm ` 移除檔案**
    ` rm -r/-f ` 強制執行
    注意 -f 會使一些檔案在沒有被確認允許的情況下刪除，要小心使用
    ` rmdir `  or `rm -r <folder name> ` 移除資料夾
    * **` mv <file> <folder>/<new file name> ` 移動檔案或修改檔名**
    * **` cp <file> <new file name> ` 複製檔案**
    ` cp -r <folder> <new foler name> ` 複製資料夾

#### Q2. 如此一來，h0w 哥就可以輕而易舉的建立名為 wifi 的資料夾並在裡面新增一個名叫 afu.js 的檔案
1. 首先使用 `cd` 切換至他希望建立此資料夾的位置
2. 建立資料夾： `mkdir wifi`
3. 建立檔案： `touch afu.js`
4. 檢查一下： `ls`
5. 移動檔案至 wifi 裡： `mv afu.js wifi`
6. 完成！！！

