const API_URL = 'https://api.twitch.tv/kraken'
const TOP_ENDPOINT = '/games/top?limit=5'
const CLIENT_ID = '2hohg28vgz4pd83ilo07wu0xznfhlm'
const ACCEPT = 'application/vnd.twitchtv.v5+json'
const STREAM_TEMPLATE = `
  <a class="stream__link" href="$url" target="_blank">
    <div class="streams__stream">
      <img class="streams__stream-thumbnails" src="$thumbnails"/>
      <div class="streams__stream-info">
        <img class="avatar" src="$avatar"/>
        <div class="streams__stream-steamer">
          <h3 class="streamer-title">$title</h3>
          <p class="streamer-name">$name</p>
        </div>
      </div>
    </div>
  </a>
`
const EMPTY_SPACE = ` 
  <div class="streams__stream-empty"></div>
  <div class="streams__stream-empty"></div>
  <div class="streams__stream-empty"></div>
`

getGames((topGames) => {
  for (let i = 0; i < topGames.length; i++) {
    const list = document.createElement('li')
    list.innerHTML = `<a href='#'>${topGames[i].game.name}</a>`
    document.querySelector('.navbar__list').appendChild(list)
  }
  changeGame(topGames[0].game.name)
})

document.querySelector('.navbar__list').addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    const gameName = e.target.innerText
    changeGame(gameName)
  }
})

/* eslint-disable prefer-const */
// 切換標題
function changeGame(gameName) {
  document.querySelector('.cat__intro-title').innerText = gameName
  document.querySelector('.streams').innerHTML = ''
  getStreams(gameName, (streams) => {
    for (let stream of streams) {
      replaceGame(stream)
    }
  })
}

// 更改 template
function replaceGame(stream) {
  const streamEach = document.createElement('div')
  streamEach.innerHTML = STREAM_TEMPLATE
    .replace('$url', stream.channel.url)
    .replace('$thumbnails', stream.preview.medium)
    .replace('$avatar', stream.channel.logo)
    .replace('$title', stream.channel.status)
    .replace('$name', stream.channel.display_name)
  document.querySelector('.streams').appendChild(streamEach)
}

// 抓到 top5 遊戲
function getGames(callback) {
  const request = new XMLHttpRequest()
  request.open('GET', API_URL + TOP_ENDPOINT, true)
  request.setRequestHeader('Accept', ACCEPT)
  request.setRequestHeader('Client-ID', CLIENT_ID)

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      let topGames
      try {
        topGames = JSON.parse(request.responseText).top
      } catch (err) {
        return alert('data parse error')
      }
      callback(topGames)
    } else {
      console.log('err', request.responseText)
    }
  }
  request.onerror = function() {
    console.log('Error')
  }
  request.send()
}

// 抓到 TOP5 的 TOP20 LIVE
function getStreams(gameName, callback) {
  const request = new XMLHttpRequest()
  request.open('GET', `${API_URL}/streams/?game=${encodeURIComponent(gameName)}&limit=20`, true)
  request.setRequestHeader('Accept', ACCEPT)
  request.setRequestHeader('Client-ID', CLIENT_ID)

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      let streams
      try {
        streams = JSON.parse(request.responseText).streams
      } catch (err) {
        return alert('data parse error')
      }
      callback(streams)
    } else {
      console.log('getStreams error', request.responseText)
    }
    document.querySelector('.streams').insertAdjacentHTML('beforeend', EMPTY_SPACE)
  }
  request.onerror = function() {
    console.log('error!')
  }
  request.send()
}
