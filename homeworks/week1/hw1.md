## 交作業流程

1. 開通 GitHub Classroom 的 repository
2. 把作業倉庫 clone 下來自己的電腦
    ---> ```git clone``` 
3. 寫作業時養成好習慣，先新開一個 branch
    ---> ```git branch week1```
    ---> ```git diff``` 查看自己變更過的內容
4. 切換至此 branch
    ---> ```git checkout week1```
    ---> ```git checkout -b week1``` 同時新開並切換至 w1
5. commit
    ---> ```git commit -am "hw1 finished"``` 記得先 add 再 commit
6. push 至 GitHub
    ---> ```git push origin week1``` 把新增的 branch (week1) 給 push 上去
7. 點選綠色按鈕發 pull request，把新增的 branch 給 merge 進 master
    ---> 留言板可留下問題，底下可查看所做的修改和新增
    ---> create pull request
8. 檢查 file changed 看有沒有需要修改
    ---> 要修改的話就直接自己的電腦上改，改完 commit 然後再 push 一次（重複 5. & 6. ）
    ---> 不需再 merge，merge 是針對有新增 branch 時做的
    ---> 重新上傳後就會看到 commit 變多了
10. 複製頁面跳轉後的網址，至學習系統 ---> 課程總覽 ---> 繳交作業（繳交前記得先用自我檢討檢查一遍）---> 貼上網址（PR 連結）
11. 繳交成功，可至作業列表查看
