const container = document.getElementById('container')
const btn_start = document.getElementById('btn_start')
const score = document.getElementById('score')
const level = document.getElementById('level')
const btn_colors = document.querySelectorAll('#btn_colors')
const answers_card = document.getElementById('answers-card')
const answers = document.getElementById('answer')

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

btn_start.addEventListener('click', () => {
  if(!container.classList.contains('hide'))
    container.classList.add('hide')
  if (answers_card.classList.add('hide'))
    answers_card.classList.add('hide')
  start()
})

const start = () => {
  if(levels <= 10) {
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
    }, 1000 * (i + 1))
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