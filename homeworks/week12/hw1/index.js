/* eslint-disable  jquery/no-ready */
/* eslint-disable  jquery/no-val */
/* eslint-disable  jquery/no-prop */
/* eslint-disable  jquery/no-find */
/* eslint-disable  jquery/no-submit */
/* eslint-disable  jquery/no-ajax */
/* eslint-disable  jquery/no-hide */
/* eslint-disable  indent */

const BASE_URL = 'http://mentor-program.co/mtr04group5/gz/week12/hw1/'
const siteKey = '1'
let before = null
let isEnd = false

// 讀取 comments
getComments()

// 新增 comment（做兩件事：1. POST 2. 動態新增 comment）
$('.comments-submit-form').submit((e) => {
  e.preventDefault()

  const myData = {
    nickname: $('input[name="nickname"]').val(),
    content: $('textarea[name="content"]').val(),
    site_key: $('input[name="site_key"]').val()
  }

  // POST
  $.ajax({
    type: 'POST',
    url: `${BASE_URL}api_add_comments.php`,
    data: myData
  })
  .done((data) => {
    if (!data.ok) {
      return alert(data.message)
    }

    // 動態新增 comment
    const allComments = data.comments
    for (const comment of allComments) {
      loadComment(comment, true)
    }
  })

  $('input[name="nickname"]').val('')
  $('textarea[name="content"]').val('')
})

// 為甚麼 before 不變???
$('.btn-load').click((e) => {
  getComments()
})

// 呼叫 getCommentsAPI()
function getComments() {
  if (isEnd) return
  getCommentsAPI(BASE_URL, siteKey, before, (data) => {
    if (!data.ok) {
      return alert(data.message)
    }

    // 顯示留言
    const allComments = data.comments
    for (const comment of allComments) {
      loadComment(comment)
    }

    const commentCount = allComments.length
    if (commentCount < 5) {
      isEnd = true
      $('.btn-load').hide()
    } else {
      before = allComments[commentCount - 1].id
    }
  })
}

// 讀取 comments API
function getCommentsAPI(baseURL, siteKey, before, cb) {
  let myURL = `${baseURL}api_comments.php?site_key=${siteKey}`
  if (before) {
    myURL += `&before=${before}`
  }

  $.ajax({
    url: myURL
  })
  .done((data) => {
    cb(data)
  })
}

// 新增留言（傳入一個 Array comments & 是否要 Prepend）
function loadComment(comment, isPrepend) {
  const template = `
    <div class="card">
      <div class="card-body d-flex justify-content-between">
        <p class="card-text">${escapeHtml(comment.content)}</p>
        <div class="card-info text-end">${escapeHtml(comment.create_at)} 
          <p class="card-nickname">— by ${escapeHtml(comment.nickname)}</p>
        </div>
      </div>
    </div>
  `
  isPrepend ? $('.cards').prepend(template) : $('.cards').append(template)
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
