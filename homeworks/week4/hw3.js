const request = require('request')

const args = process.argv
const API_ENDPOINT = 'https://restcountries.eu/rest/v2'

const name = args[2]

request(
  `${API_ENDPOINT}/name/${name}`,
  (err, response, body) => {
    if (err) {
      return console.log('Error:', err)
    }

    let data
    try {
      data = JSON.parse(body)
    } catch (err) {
      return console.log(err)
    }

    if (data.status === 404) {
      return console.log('找不到國家資訊')
    }

    for (let i = 0; i < data.length; i++) {
      console.log('============')
      console.log(`國家：${data[i].name}`)
      console.log(`首都：${data[i].capital}`)
      console.log(`貨幣：${data[i].currencies[0].code}`)
      console.log(`國碼：${data[i].callingCodes[0]}`)
    }
  }
)
