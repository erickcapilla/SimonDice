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
  FIRST: "blue",
  SECOND: "red",
  THIRD: "green",
  FOURTH: "yellow"
}

const colorsSave = []
let levels = 1
let scores = 0

btn_start.addEventListener('click', () => {
  if(!container.classList.contains('hide'))
    container.classList.add('hide')
  start()
})

const start = () => {

  if(levels <= 10) {
    game()
    console.log(levels);
    levels++
    start()
  } else {
    console.log('Game Over');
  }

}

const game = () => {
  let colorRandom = Math.floor(Math.random() * 4) + 1

  switch (colorRandom) {
    case 1:
      colorsSave.push(colors.FIRST)
      break;
    case 2:
      colorsSave.push(colors.SECOND)
      break;
    case 3:
      colorsSave.push(colors.THIRD)
      break;
    case 4:
      colorsSave.push(colors.FOURTH)
      break;
  }

  setTimeout(() => {
    light()
  }, 1000 * levels);
}

const light = () => {
  colorsSave.map(element => {
    setTimeout(() => {
      colorsBnt[element].classList.add(`light-${element}`)
      console.log(scores++);
      setTimeout(() => {
        colorsBnt[element].classList.remove(`light-${element}`)
      }, 500);
    }, 3000)
  })
}