const request = require('request')

const API_ENDPOINT = 'https://api.twitch.tv/kraken'

request({
  // 預設是顯示 tpo 10
  url: `${API_ENDPOINT}/games/top`,
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': 'zx3yw4a453k44en8wqs1b0e2qzvjja'
  }
},
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

  for (let i = 0; i < data.top.length; i++) {
    const topGames = data.top[i]
    console.log(`${topGames.viewers} ${topGames.game.name}`)
  }
})
