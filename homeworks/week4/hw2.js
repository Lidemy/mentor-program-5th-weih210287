const request = require('request')

const args = process.argv
const API_ENDPOINT = 'https://lidemy-book-store.herokuapp.com/'
// 網址更改時，修改較方便

// const action = args[2]
// const params = args[3]
// 可試試解構語法進行變數宣告
const [, , action, params] = args

// if (action === 'list') {
//   listBook()
// } else if (action === 'read') {
//   readBook(params)
// } else if (action === 'delete') {
//   deleteBook(params)
// } else if (action === 'create') {
//   createBook(params)
// } else if (action === 'update') {
//   updateBook(params, params2)
// } else {
//   console.log('unknown action')
// }

// switch case
switch (action) {
  case 'list':
    listBook(params)
    break
  case 'read':
    readBook(params)
    break
  case 'delete':
    deleteBook(params)
    break
  case 'create':
    createBook(params)
    break
  case 'update':
    updateBook(params, args[4])
    break
  default:
    console.log('Unknown Action')
}

function listBook() {
  request(
    `${API_ENDPOINT}books?_limit=20`,
    (err, response, body) => {
      // 如果網址輸入有誤等等
      // 最後一定要記得加 return 結束程式，不然就會繼續往下跑
      if (err) {
        return console.log('Error:', err)
      }

      // 如果 API 給的不是 JSON 格式
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
    (err, response, body) => {
      if (err) {
        return console.log('Error:', err)
      }

      let json
      try {
        json = JSON.parse(body)
      } catch (err) {
        return console.log(err)
      }
      if (Object.keys(json).length === 0) {
        return console.log(`book id: '${id}', is not found`)
      }
      console.log(json)
    })
}

function deleteBook(id) {
  request.del(
    `${API_ENDPOINT}books/${id}`,
    (err, response, body) => {
      if (err) {
        return console.log('Error:', err)
      }
      if (response.statusCode === 200) {
        return console.log('Deleted!')
      }
      return console.log('id not found')
    })
}

function createBook(str) {
  // 也可以用 if (!str)
  if (str === undefined) {
    return console.log('book name empty')
  }
  request.post({
    url: `${API_ENDPOINT}books/`,
    form: {
      name: str
    }
  },
  (err, response, body) => {
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
      name: str
    }
  },
  (err, response, body) => {
    if (err) {
      return console.log('Error:', err)
    }
    if (response.statusCode === 200) {
      console.log('Updated!')
      return console.log(body)
    }
    return console.log('book not found')
  })
}
