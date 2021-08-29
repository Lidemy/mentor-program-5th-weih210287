/* eslint-disable */
/* eslint-disable no-cond-assign*/
import $ from 'jquery'
import { cssTemplate, getForm } from './template'
import { getCommentsAPI, addCommentsAPI } from './api'
import { loadComment } from './utils'

export function init(options) {
  let BASE_URL = ''
  let siteKey = ''
  let containerSelector = ''
  let before = null
  let isEnd = false

  // 先初始化各種資料
  siteKey = options.siteKey
  BASE_URL = options.BASE_URL
  containerSelector = options.containerSelector

  const { formTemplate, commentSubmitSelector, nicknameSelector, contentSelector, siteKeySelector, cardsSelector, btnLoadSelector } = getForm(siteKey)
  const containerElement = $(containerSelector)
  containerElement.append(formTemplate)

  // css
  $('<style></style>', {
    type: 'text/css'
  }).appendTo('head')
  $('style').append(cssTemplate)

  // 讀取 comments
  getComments()

  // 新增 comment（做兩件事：1. POST 2. 動態新增 comment）
  $(commentSubmitSelector).submit((e) => {
    e.preventDefault()

    const myData = {
      nickname: $(nicknameSelector).val(),
      content: $(contentSelector).val(),
      site_key: $(siteKeySelector).val()
    }

    // POST api
    addCommentsAPI(BASE_URL, myData, (data) => {
      if (!data.ok) {
        return alert(data.message)
      }

      // 動態新增 comment
      const allComments = data.comments
      for (const comment of allComments) {
        loadComment(comment, true)
      }
      $(`${cardsSelector} .card`).length > 5 ? $(`${cardsSelector} .card:last-child`).remove() : ''
    })
    $(nicknameSelector).val('')
    $(contentSelector).val('')
  })

  $(btnLoadSelector).click((e) => {
    console.log('click')
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

      const { length } = allComments
      if (length < 5) {
        isEnd = true
        $(btnLoadSelector).hide()
      } else {
        before = allComments[length - 1].id
      }
    })
  }
}
