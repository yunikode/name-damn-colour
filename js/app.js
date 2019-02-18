var currentHighscores = [0]
var highscoreList = document.querySelector('.highscore-list')
var highscoreListItems = ''
var numOfButtons = 0
var buttonsArray = ''
var gameMode = ''

if (!!localStorage.getItem('highscores')) {
  currentHighscores = JSON.parse(localStorage.getItem('highscores'))
}


function start(val, mode = 'normal') {
  gameMode = mode
  numOfButtons = val
  document.getElementById('start').classList.toggle('hidden')
  document.querySelector('.center_text').classList.toggle('hidden')
  for (let i = 0; i < numOfButtons; i++) {
    buttonsArray += `<button class="color-btn" type="button" name="button${i}" onclick="check(event)"></button>`
  }
  document.getElementById('buttonArray').innerHTML = buttonsArray
  reset()
  console.log(gameMode)
  updateHighscores()
  if (window.innerHeight < 600) {
    document.querySelector('.highscore').classList.add('hidden')
  } else {
    document.querySelector('.toggler').classList.remove('toggler')
  }
}

function updateHighscores() {
  currentHighscores.sort(function(a,b) {
    return b - a
  })
  if (currentHighscores.length > 10) {
    currentHighscores.splice(-1, 1)
  }
  highscoreListItems = ''
  currentHighscores.forEach(i => {
    highscoreListItems += `<li>${i}</li>`
  })
  highscoreList.innerHTML = highscoreListItems
}

function hideStreak(e) {
  e.stopPropagation()
  if (window.innerHeight < 600) {
    document.querySelector('.streak').classList.toggle('hidden')
    document.querySelector('.highscore').classList.toggle('hidden')
  }
}

function reset() {
  let color = randomColor()
  let decoy1 = randomColor()
  let buttons = Array.from(document.querySelectorAll('.color-btn'))
  document.querySelector('.div1').style.backgroundColor = color

  for (let i = 0; i < buttons.length; i++) {
    if (gameMode === 'insane') {
      document.querySelector(`[name=button${i}]`).innerText = tinycolor(randomColor()).toHex()
    } else {
      document.querySelector(`[name=button${i}]`).innerText = randomColor().toUpperCase()
    }
  }

  let trueBtn= Math.floor(Math.random() * buttons.length)
  if (gameMode === 'insane') {
    document.querySelector(`[name=button${trueBtn}]`).innerText = tinycolor(color).toHex()
  } else {
    document.querySelector(`[name=button${trueBtn}]`).innerText = color.toUpperCase()
  }

  let isDark = tinycolor(color).isDark()

  let btnText = isDark
    ? tinycolor(color).darken(17).toString()
    : tinycolor(color).darken(50).toString()

  document.querySelectorAll('.color-btn').forEach((i)=>{
    i.setAttribute('style', `
      color: ${btnText};`
    )
  })

  // document.querySelector('button:hover').setAttribute('style', `
  //     background: ${btnText};
  //     color: ${btnBack}
  //     `
  //   )

  updateScores()

}

function randomColor() {
  let colors = []
  let rainbow = colors.concat(reds, pinks, oranges, yellows, purples, greens, blues, browns, whites, greys)

  return rainbow[Math.floor(Math.random() * rainbow.length)]
}

function check(e) {
  let trueColor = tinycolor(document.querySelector('.div1').style.backgroundColor).toHex()
  let answer = tinycolor(e.target.innerText.toLowerCase()).toHex()
  if ( answer === trueColor) {
    score++
    // console.log('yes!' + score)
    streak.unshift({score, color: trueColor, answer})
    reset()
  } else {
    if (score > currentHighscores[currentHighscores.length-1]) {
      currentHighscores.unshift(score)
      updateHighscores()
      localStorage.setItem("highscores", JSON.stringify(currentHighscores))
    }
    score = 0
    // console.log('wrong')
    streak.unshift({score: 0, color: trueColor, answer})
    reset()
  }
  document.querySelector('.score').innerText = score

}

function updateScores() {
  let text = null
  let stream = streak.slice(0,5)
  let streamDisplay = document.querySelector('.streak')

  streamDisplay.innerHTML = ''

  let streamDisplayContent = ''
  stream.forEach((i)=> {
    streamDisplayContent += `
      <span class=${i.score == 0 ? 'wrong' : 'correct'}>
        ${gameMode === 'insane' ? tinycolor(i.color).toHex() : tinycolor(i.color).toName()}
      </span>
      <span class="square2" style="background: #${tinycolor(i.answer).toHex()}"> </span>
      <span class="square1" style="background: #${tinycolor(i.color).toHex()}"> </span>
      <br/>
      `
    // console.log(i)
  })

  streamDisplay.innerHTML = streamDisplayContent
  // console.log(stream[stream.length -1].color)
}

let score = 0

var streak = []

function toggleSidebar() {
  document.querySelector('.arrow').classList.toggle('hidden')
  document.querySelector('.container').classList.toggle('hidden')
}


const reds = [
  'indianred',
  'lightcoral',
  'salmon',
  'darksalmon',
  'lightsalmon',
  'crimson',
  'red',
  'firebrick',
  'darkred'
]

const pinks = [
  'pink',
  'lightpink',
  'hotpink',
  'deeppink',
  'mediumvioletred',
  'palevioletred'
]

const oranges = [
  'coral',
  'tomato',
  'orangered',
  'darkorange',
  'orange'
]

const yellows = [
  'gold',
  'yellow',
  'lightyellow',
  'lemonchiffon',
  'lightgoldenrodyellow',
  'papayawhip',
  'moccasin',
  'peachpuff',
  'palegoldenrod',
  'khaki',
  'darkkhaki'
]

const purples = [
  'lavender',
  'thistle',
  'plum',
  'violet',
  'orchid',
  'fuchsia',
  'magenta',
  'mediumorchid',
  'mediumpurple',
  'rebeccapurple',
  'blueviolet',
  'darkviolet',
  'darkmagenta',
  'purple',
  'indigo',
  'slateblue',
  'darkslateblue',
  'mediumslateblue'
]

const greens = [
  'greenyellow',
  'chartreuse',
  'lawngreen',
  'lime',
  'limegreen',
  'palegreen',
  'lightgreen',
  'mediumspringgreen',
  'springgreen',
  'mediumspringgreen',
  'seagreen',
  'forestgreen',
  'green',
  'darkgreen',
  'yellowgreen',
  'olivedrab',
  'olive',
  'darkolivegreen',
  'mediumaquamarine',
  'darkseagreen',
  'lightseagreen',
  'darkcyan',
  'teal'
]

const blues = [
  'aqua',
  'cyan',
  'lightcyan',
  'paleturquoise',
  'aquamarine',
  'turquoise',
  'mediumturquoise',
  'darkturquoise',
  'cadetblue',
  'steelblue',
  'lightsteelblue',
  'skyblue',
  'lightskyblue',
  'deepskyblue',
  'dodgerblue',
  'cornflowerblue',
  'royalblue',
  'blue',
  'mediumblue',
  'darkblue',
  'navy',
  'midnightblue'
]

const browns = [
  'cornsilk',
  'blanchedalmond',
  'bisque',
  'navajowhite',
  'wheat',
  'burlywood',
  'tan',
  'rosybrown',
  'sandybrown',
  'goldenrod',
  'darkgoldenrod',
  'peru',
  'chocolate',
  'saddlebrown',
  'sienna',
  'brown',
  'maroon'
]

const whites = [
  'white',
  'snow',
  'honeydew',
  'mintcream',
  'azure',
  'aliceblue',
  'ghostwhite',
  'whitesmoke',
  'seashell',
  'beige',
  'oldlace',
  'floralwhite',
  'ivory',
  'antiquewhite',
  'linen',
  'lavenderblush',
  'mistyrose'
]

const greys = [
  'gainsboro',
  'lightgray',
  'silver',
  'darkgray',
  'gray',
  'dimgray',
  'lightslategray',
  'slategray',
  'darkslategray',
  'black'
]
