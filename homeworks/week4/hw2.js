const request = require('request')

const args = process.argv
const API_ENDPOINT = 'https://lidemy-book-store.herokuapp.com/'
// 網址更改時，修改較方便

const action = args[2]
const params = args[3]

if (action === 'list') {
  listBook()
} else if (action === 'read') {
  readBook(params)
} else if (action === 'delete') {
  deleteBook(params)
} else if (action === 'create') {
  createBook(params)
} else if (action === 'update') {
  updateBook(params, process.argv[4])
} else {
  console.log('unknown action')
}

function listBook() {
  request(
    `${API_ENDPOINT}books?_limit=20`,
    (err, reponse, body) => {
      // 如果網址輸入有誤等等
      // 最後一定要記得加 return 結束程式，不然就會繼續往下跑
      if (err) {
        return console.log('Error:', err)
      }

      // 如果 API 給的不是 JASON 格式
      let json
      try {
        json = JSON.parse(body)
      } catch (err) {
        return console.log(err)
      }
      for (let i = 0; i < 20; i++) {
        console.log(`${json[i].id} ${json[i].name}`)
      }
    })
}

function readBook(id) {
  request(
    `${API_ENDPOINT}books/${id}`,
    (err, reponse, body) => {
      if (err) {
        return console.log('Error:', err)
      }

      let json
      try {
        json = JSON.parse(body)
      } catch (err) {
        return console.log(err)
      }
      console.log(json)
    })
}

function deleteBook(id) {
  request.del(
    `${API_ENDPOINT}books/${id}`,
    (err, reponse, body) => {
      if (err) {
        return console.log('Error:', err)
      }
      console.log('Deleted!')
    })
}

function createBook(str) {
  request.post({
    url: `${API_ENDPOINT}books/`,
    form: {
      str
    }
  },
  (err, reponse, body) => {
    if (err) {
      return console.log('Error:', err)
    }
    console.log(body)
  })
}

function updateBook(id, str) {
  request.patch({
    url: `${API_ENDPOINT}books/${id}`,
    form: {
      str
    }
  },
  (err, reponse, body) => {
    if (err) {
      return console.log('Error:', err)
    }
    console.log('Updated!')
  })
}
