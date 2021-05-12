const request = require('request')

request(
  'https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (err, response, body) => {
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

    for (let i = 0; i < json.length; i++) {
      console.log(`${json[i].id} ${json[i].name}`)
    }
  }
)
