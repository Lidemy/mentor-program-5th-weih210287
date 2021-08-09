/* eslint-disable  jquery/no-ready */
/* eslint-disable  jquery/no-val */
/* eslint-disable  jquery/no-prop */
/* eslint-disable  jquery/no-find */
/* eslint-disable  jquery/no-ajax */
/* eslint-disable  jquery/no-closest */
/* eslint-disable  jquery/no-class */
/* eslint-disable  jquery/no-attr */
/* eslint-disable  jquery/no-each */
/* eslint-disable  jquery/no-text */
/* eslint-disable  no-unused-vars */

$(document).ready(() => {
  let id = 1
  let todoTotal = 0
  let uncomplete = 0
  const template = `
    <li class="list-group-item {todo-check}">
      <div class="item-view d-flex justify-content-between">
        <div class="item-view-content">
          <input class="form-check-input me-1" type="checkbox" id="{id}" aria-label="...">
          <label class="content" for="{id}">{content}</label>
        </div>
        <button class="item-destory" onclick="warning()">X</button>
      </div>
      <textarea class="hide content-update" rows="1" value="{content}"></textarea>
    </li>
  `

  // 讀取 id = ? 的 todo
  const searchParams = new URLSearchParams(window.location.search)
  const BASE_URL = 'http://mentor-program.co/mtr04group5/gz/week12/hw2/'
  const urlID = searchParams.get('id')
  if (urlID) {
    $.getJSON(`${BASE_URL}api_get_todo.php?id=${urlID}`, (data) => {
      const todos = $.parseJSON(data.data.todo)
      for (const todo of todos) {
        getTodo(template, todo)

        id = parseInt(todo.id) + 1
        todoTotal++
        if (todo.isDone) {
          $(`#${todo.id}`).prop('checked', true)
        }
        if (!todo.isDone) {
          uncomplete++
        }
      }
      itemCounter(uncomplete)
    })
  }

  // Enter 新增 todo
  $('label.add-here').keydown((e) => {
    if (e.keyCode === 13) {
      const inputContent = $('input.todo-input').val()
      if (!inputContent) return
      addTodo(template, inputContent, id)

      id++
      todoTotal++
      uncomplete++
      itemCounter(uncomplete)
    }
  })

  // 標記完成/未完成、X 單項刪除
  $('.list-group').on('click', '.form-check-input, .item-destory', (e) => {
    // 標記完成/未完成
    const list = $(e.target).closest('li')

    if ($(e.target).hasClass('form-check-input')) {
      if ($(e.target).prop('checked')) {
        list.addClass('checked')
        uncomplete--
      } else {
        list.removeClass('checked')
        uncomplete++
      }
      itemCounter(uncomplete)
    }

    // X 單項刪除
    if ($(e.target).hasClass('item-destory')) {
      const isChecked = $(e.target).prev().children('.form-check-input').prop('checked')
      if (!isChecked) {
        uncomplete--
      }

      $(e.target).closest('.list-group-item').remove()
      todoTotal--
      itemCounter(uncomplete)
    }
  })

  // dbClick 編輯 todo
  $('.list-group').on('dblclick', '.item-view', (e) => {
    const itemView = $(e.target).closest('.item-view')
    const contentText = itemView.find('.content').text()
    const textarea = $(e.target).closest('.item-view').next('textarea')

    textarea.val(contentText)
    itemView.toggleClass('hide')
    textarea.toggleClass('hide')
  })

  $('.list-group').on('keydown', '.list-group-item', (e) => {
    if (e.keyCode === 13) {
      const newContentText = $(e.target).val()
      const inputContent = $(e.target).prev().find('.content')
      const itemView = $(e.target).prev()

      inputContent.text(newContentText)
      itemView.toggleClass('hide')
      $(e.target).toggleClass('hide')
    }
  })

  // Selector、清空 Completed、從 UI 拿資料
  $('.card-footer').on('click', '.selector, .save-btn, .card-footer-clear', (e) => {
    const selectorBtn = $(e.target).hasClass('selector')
    const saveBtn = $(e.target).hasClass('save-btn')
    const clearBtn = $(e.target).hasClass('card-footer-clear')

    // Selector
    if (selectorBtn) {
      const selector = $(e.target).attr('data-value')

      $(e.target).siblings('.active').removeClass('active')
      $(e.target).addClass('active')
      selectors(selector)
    }

    // 清空 Completed
    if (clearBtn) {
      todoTotal -= $('.list-group-item.checked').length
      $('.list-group-item.checked').remove()
    }

    // 從 UI 拿資料
    if (saveBtn) {
      const todos = []
      $('.item-view-content').each((index, element) => {
        const myID = $(element).find('.form-check-input').attr('id')
        const myContent = $(element).find('.content').text()
        const myIsDone = $(element).find('.form-check-input').prop('checked')

        todos.push({
          id: myID,
          content: myContent,
          isDone: myIsDone
        })
      })
      const data = JSON.stringify(todos)

      $.ajax({
        type: 'POST',
        url: `${BASE_URL}api_add_todo.php`,
        data: {
          todo: data
        },
        success: (res) => {
          const todoID = res.id
          window.location = `./index.html?id=${todoID}`
        },
        error: (err) => {
          alert('Api Error :( ', err)
        }
      })
    }
  })
})

function warning() {
  return confirm('Are you sure? \n This will clear all of the completed item')
}

function getTodo(template, todo) {
  $('.list-group').append(
    template
      .replace('{content}', escapeHtml(todo.content))
      .replace(/{id}/g, todo.id)
      .replace('{todo-check}', todo.isDone ? 'checked' : '')
  )
}

function addTodo(template, inputContent, id) {
  $('.list-group').append(
    template
      .replace('{content}', escapeHtml(inputContent))
      .replace(/{id}/g, id)
  )

  $('input.todo-input').val('')
}

function itemCounter(uncomplete) {
  $('.card-footer-counter').text(
    uncomplete <= 1 ? `${uncomplete} item left` : `${uncomplete} items left`
  )
}

// 待優化
function selectors(dataValue) {
  if (dataValue === 'completed') {
    $('.list-group-item').each((index, element) => {
      if (!$(element).hasClass('checked')) {
        $(element).addClass('hide')
      } else {
        $(element).removeClass('hide')
      }
    })
  } else if (dataValue === 'active') {
    $('.list-group-item').each((index, element) => {
      if ($(element).hasClass('checked')) {
        $(element).addClass('hide')
      } else {
        $(element).removeClass('hide')
      }
    })
  } else {
    $('.list-group-item').each((index, element) => {
      $(element).removeClass('hide')
    })
  }
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
