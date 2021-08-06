/* eslint-disable  jquery/no-ready */
/* eslint-disable  jquery/no-val */
/* eslint-disable  jquery/no-prop */
/* eslint-disable  jquery/no-find */

$(document).ready(() => {
  // Enter 新增 todo
  $('label.add-here').keydown((e) => {
    if (e.keyCode === 13) {
      const inputContent = $('input.todo-input').val()

      $('.list-group').append(`
        <li class="list-group-item">
          <div class="item-view d-flex justify-content-between">
            <div class="item-view-content">
              <input class="form-check-input me-1" type="checkbox" value="" aria-label="...">
              ${escapeHtml(inputContent)}
            </div>
            <button class="item-destory">X</button>
          </div>
        </li>
      `)

      $('input.todo-input').val('')
    }
  })
  // checked 劃掉
  $('.list-group').on('click', '.list-group-item', (e) => {
    if ($(e.target).find('input').prop('checked')) {
      console.log(e.target)
    }
  })

  // X 單項刪除 todo

  // dbClick 編輯 todo
})

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
