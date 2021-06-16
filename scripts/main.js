const container = document.getElementById('container')
const btn_start = document.getElementById('btn_start')
const score = document.getElementById('score')
const level = document.getElementById('level')
const btn_colors = document.querySelectorAll('#btn_colors')
const answers_card = document.getElementById('answers-card')
const answers = document.getElementById('answer')
const level_card = document.querySelector('.level')

const colorsBnt = []
colorsBnt['blue'] = btn_colors[0]
colorsBnt['red'] = btn_colors[1]
colorsBnt['green'] = btn_colors[2]
colorsBnt['yellow'] = btn_colors[3]

const colors = {
  FIRST: btn_colors[0],
  SECOND: btn_colors[1],
  THIRD: btn_colors[2],
  FOURTH: btn_colors[3]
}

let colorsSaved = []
let trueOrFalse = []
let colorsClicked = []
let levels = 1
let scores = 0
let lastLevel = 10
let speed = 1

btn_start.addEventListener('click', () => {
  if(!container.classList.contains('hide'))
    container.classList.add('hide')
  if (answers_card.classList.add('hide'))
    answers_card.classList.add('hide')
  start()
})

const start = () => {
  if(levels <= lastLevel) {
    level.innerHTML = levels
    game()
  } else {
    console.log('Game Over');
    Swal.fire(
      'You have passed all levels',
      `Score: ${scores}`,
      'success'
    )
    restart()
  }

}

const game = () => {
  let colorRandom = Math.floor(Math.random() * 4) + 1

  switch (colorRandom) {
    case 1:
      colorsSaved.push(colors.FIRST)
      break;
    case 2:
      colorsSaved.push(colors.SECOND)
      break;
    case 3:
      colorsSaved.push(colors.THIRD)
      break;
    case 4:
      colorsSaved.push(colors.FOURTH)
      break;
  }

  for(let i = 0; i < levels; i++) {
    setTimeout(() => {
      colorsSaved[i].classList.add(`light-${colorsSaved[i].classList[0]}`)
      setTimeout(() => {
        colorsSaved[i].classList.remove(`light-${colorsSaved[i].classList[0]}`)
      }, 500)
    }, (1000 * (i + 1)) * speed)
  }

  colorsClicked = []

  btn_colors.forEach(btn => {
    btn.addEventListener('click', chooseColor)
    console.log(btn);
  })
}

const chooseColor = (e) => {
  colorsClicked.push(e.target)
  
  if(colorsClicked.length === colorsSaved.length) {
    compare()
  }
}

const compare = () => {
  let incorrect = 0

  for (let i = 0; i < colorsSaved.length; i++) {
    if (colorsSaved[i] === colorsClicked[i]) {
      trueOrFalse[i] = true
      scores += 15 * levels
      score.innerHTML = scores
    } else {
      trueOrFalse[i] = false

    }
  }

  for (let j = 0; j < trueOrFalse.length; j++) {
    if(trueOrFalse[j] !== true)
      incorrect++
  }

  console.log(trueOrFalse);

  if (incorrect != 0) {
    console.log('Game Over');
    answersFunc()
    Swal.fire(
      'Game Over',
      `Score: ${scores}
      Level: ${levels}`,
      'error'
    )
    restart()
  } else {
    levels++
    start()
  }
}

const restart = () => {
  colorsSaved = []
  trueOrFalse = []
  colorsClicked = []
  levels = 1
  scores = 0
  score.innerHTML = 0
  level.innerHTML = 0
  container.classList.remove('hide')
}

const answersFunc = () => {
  answers.innerHTML = ''
  colorsSaved.forEach(color => {
    answers.innerHTML += `<div class="answer-color ${color.classList[0]}"></div>`
  })
  answers_card.classList.remove('hide')
}

const btn_difficulty = document.getElementById('btn-difficulty')
const card_difficulty = document.getElementById('difficulty')
const arrow = document.getElementById('arrow')
const btns_diffi = document.querySelectorAll('#btns-diffi')

const ipad = window.matchMedia('screen and (max-width: 768px)');
ipad.addListener(validation);

function validation(e) {
    if (e.matches) 
      card_difficulty.style.right === '-150px'
}
validation(ipad);


let difficult = 1
btns_diffi[0].style.backgroundColor = '#66ff00'
level_card.style.backgroundColor = '#66ff00a2'
btns_diffi[0].style.color = 'black'

btn_difficulty.addEventListener('click', e => {
  card_difficulty.style.transition = 'all 1.5s'
  arrow.style.transition = 'all 1.5s'
  if (card_difficulty.style.right === '-150px') {
    card_difficulty.style.right = '0'
    arrow.style.transform = 'translate(8px, 8px) rotateZ(360deg)'
  } else {
    card_difficulty.style.right = '-150px'
    arrow.style.transform = 'translate(8px, 8px) rotateZ(180deg)'
  }
})

btns_diffi.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('easy')) {
      difficult = 1
    } else if (btn.classList.contains('normal')) {
      difficult = 2
    } else if (btn.classList.contains('hard')) {
      difficult = 3
    }
    bgDifficulty()
  })
})

const bgDifficulty = () => {
  btns_diffi.forEach(btn => btn.style.backgroundColor = '')
  btns_diffi.forEach(btn => btn.style.color = '')

  switch (difficult) {
    case 1:
      btns_diffi[0].style.backgroundColor = '#66ff00'
      btns_diffi[0].style.color = 'black'
      level_card.style.backgroundColor = '#66ff00a2'
      lastLevel = 10
      speed = 1
      break;
    case 2:
      btns_diffi[1].style.backgroundColor = '#d0ff00'
      btns_diffi[1].style.color = 'black'
      level_card.style.backgroundColor = '#d0ff00a9'
      lastLevel = 15
      speed = .8
      break;
    case 3:
      btns_diffi[2].style.backgroundColor = '#e40303'
      btns_diffi[2].style.color = 'black'
      level_card.style.backgroundColor = '#e40303a9'
      lastLevel = 20
      speed = .5
      break;
  }
}