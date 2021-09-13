/* eslint-disable */
import $ from 'jquery'

// 新增留言（傳入一個 Array comments & 是否要 Prepend）
export function loadComment({ content, nickname, site_key, create_at }, isPrepend) {
  const template = `
    <div class="card">
      <div class="card-body d-flex justify-content-between">
        <p class="card-text">${escapeHtml(content)}</p>
        <div class="card-info text-end">${escapeHtml(create_at)} 
          <p class="card-nickname">— by ${escapeHtml(nickname)}</p>
        </div>
      </div>
    </div>
  `
  isPrepend ? $(`.${site_key}-cards`).prepend(template) : $(`.${site_key}-cards`).append(template)
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
