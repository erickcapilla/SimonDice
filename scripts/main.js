const container = document.getElementById('container')
const btn_start = document.getElementById('btn_start')
const score = document.getElementById('score')
const level = document.getElementById('level')
const btn_colors = document.querySelectorAll('#btn_colors')

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

const colorsSaved = []
let trueOrFalse = []
let colorsClicked = []
let levels = 1
let scores = 0

btn_start.addEventListener('click', () => {
  if(!container.classList.contains('hide'))
    container.classList.add('hide')
  start()
})

const start = () => {
  if(levels <= 10) {
    level.innerHTML = levels
    game()
  } else {
    console.log('Game Over');
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
    colorsSaved[i] === colorsClicked[i]
    ? trueOrFalse[i] = true : trueOrFalse[i] = false
  }

  for (let j = 0; j < trueOrFalse.length; j++) {
    if(trueOrFalse[j] !== true)
      incorrect++
  }

  console.log(trueOrFalse);

  if (incorrect != 0) {
    console.log('Game Over');
  } else {
    levels++
    start()
  }

    // if(colorsSaved[i] === colorsClicked[i]) {
    //   console.log('correcto')
    //   if (colorsSaved.length === (i + 1)) {
    //     // btn_colors.forEach(btn => {
    //       //   btn.removeEventListener('click', chooseColor)
    //       // })
    //       levels++
    //   }
    //     start()
    // } else {
    //   console.log('incorrecto')
    //   debugger
    // }
}

