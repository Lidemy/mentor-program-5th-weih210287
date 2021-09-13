/* eslint-disable */

const API_URL = 'https://api.twitch.tv/kraken'
const TOP_ENDPOINT = '/games/top?limit=5'
const CLIENT_ID = '2hohg28vgz4pd83ilo07wu0xznfhlm'
const HEADERS = {
  method: 'GET',
  headers: {
    'Accept': 'application/vnd.twitchtv.v5+json',
    'Client-ID': CLIENT_ID
  }
}

getTopGames()

document.querySelector('.navbar__list').addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    const gameName = e.target.innerText
    changeGame(gameName)
  }
})

// 抓到 top5 遊戲
async function getTopGames() {
  const requestURL = `${API_URL}${TOP_ENDPOINT}`

  const request = await fetch(requestURL, HEADERS)
  const data = await request.json()
  try {
    const { top: topGames } = data
    for (const topGame of topGames) {
      const list = document.createElement('li')
      list.innerHTML = `<a href='#'>${topGame.game.name}</a>`
      document.querySelector('.navbar__list').appendChild(list)
    }
    changeGame(topGames[0].game.name)
  } catch (err) {
    console.log('getGames Error: ', err)
  }
}

// 抓到 TOP5 的 TOP20 LIVE
async function getStreams(gameName) {
  const requestURL = `${API_URL}/streams/?game=${encodeURIComponent(gameName)}&limit=20`

  try {
    const request = await fetch(requestURL, HEADERS)
    const data = await request.json()
    return data.streams
  } catch (err) {
    console.log('getStreams Error: ', err)
  }
}

/* eslint-disable prefer-const */
// 切換標題、內容
async function changeGame(gameName) {
  document.querySelector('.cat__intro-title').innerText = gameName
  document.querySelector('.streams').innerHTML = ''

  try {
    const streams = await getStreams(gameName)
    for (let stream of streams) {
      replaceGame(stream)
    }
  } catch (err) {
    console.log('changeGame Error', err)
  }
}

// 更改 template
function replaceGame(stream) {
  const streamEach = document.createElement('div')
  const STREAM_TEMPLATE = `
    <a class="stream__link" href="${stream.channel.url}" target="_blank">
      <div class="streams__stream">
        <img class="streams__stream-thumbnails" src="${stream.preview.medium}"/>
        <div class="streams__stream-info">
          <img class="avatar" src="${stream.channel.logo}"/>
          <div class="streams__stream-steamer">
            <h3 class="streamer-title">${stream.channel.status}</h3>
            <p class="streamer-name">${stream.channel.display_name}</p>
          </div>
        </div>
      </div>
    </a>
  `
  streamEach.innerHTML = STREAM_TEMPLATE
  document.querySelector('.streams').appendChild(streamEach)
}
