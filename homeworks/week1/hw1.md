## 交作業流程
1. 開通 GitHub Classroom 的 repository
2. 把作業倉庫 clone 下來自己的電腦
    ---> `git clone` 
3. 寫作業時養成好習慣，先新開一個 branch
    ---> `git branch week1`
    ---> `git diff` 查看自己變更過的內容
4. 切換至此 branch
    ---> `git checkout week1` 切換至分支 week1
    ---> 或者也可以使用 `git checkout -b week1` 是 `git branch` 和 `git checkout` 的合體技，可同時新開並切換至 week1，如此一來就可以跳過步驟 3.
5. add 
　---> 首先使用 `git status` 檢查有哪些檔案還是 Untracked
　---> 使用 `git add hw1.md` 將需要版本更新的檔案（例如：hw1.md）加入 Staged
　---> 或者也可以使用 `git add .` 一次將所有要版本更新的檔案加入 Staged，就不用一個檔案一個檔案慢慢 add
6. commit 
    ---> `git commit -m "hw1 finished"` 版本更新，並為這次的更新做附註
    ---> 或者也可以使用 `git commit -am "hw1 finished"` 一次將所有 Untracked 的檔案加入 Staged 更新並附註，是 `git add .` 和 `git commit -m hw1.md` 的合體技，如此一來就可以跳過步驟 5. 一次完成 add & commit
    ---> 檔案做完任何變更都要記得先 add 再 commit，不然 push 上去時會沒更新到
7. push 至 GitHub
    ---> ```git push origin week1``` 把新增的 branch (week1) 給 push 上去
8. 點選綠色按鈕發 pull request （PR），把新增的 branch 給 merge 進 master
    ---> 留言板可留下問題，底下可查看所做的修改和新增
    ---> create pull request
9. 檢查 file changed 看有沒有需要修改
    ---> 要修改的話就直接自己的電腦上改，改完 commit 然後再 push 一次（重複 5. & 6. ）
    ---> 不需再 merge，merge 是針對有新增 branch 時做的
    ---> 重新上傳後就會看到 commit 變多了
10. 複製頁面跳轉後的網址，至學習系統 ---> 課程總覽 ---> 繳交作業（繳交前記得先用自我檢討檢查一遍）---> 貼上網址（PR 連結）
11. 繳交成功，可至作業列表查看