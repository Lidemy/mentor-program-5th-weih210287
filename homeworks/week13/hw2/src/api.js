/* eslint-disable */
import $ from 'jquery'

export function getCommentsAPI(baseURL, siteKey, before, cb) {
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

export function addCommentsAPI(baseURL, myData, cb) {
  $.ajax({
    type: 'POST',
    url: `${baseURL}api_add_comments.php`,
    data: myData
  })
  .done((data) => {
    cb(data)
  })
}
