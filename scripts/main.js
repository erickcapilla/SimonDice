const container = document.getElementById('container')
const btn_start = document.getElementById('btn_start')
const score = document.getElementById('score')
const level = document.getElementById('level')
const btn_colors = document.querySelectorAll('#btn_colors')

btn_start.addEventListener('click', () => {
  if(!container.classList.contains('hide'))
    container.classList.add('hide')

  start()
})

const start = () => {
  setInterval(() => {
    setTimeout (() => {
      btn_colors[0].classList.add('light-blue')
      setTimeout(() => {
        btn_colors[0].classList.remove('light-blue')
      }, 500)
    }, 1000)
  
    setTimeout (() => {
      btn_colors[1].classList.add('light-red')
      setTimeout(() => {
        btn_colors[1].classList.remove('light-red')
      }, 500)
    }, 2500)
  
    setTimeout (() => {
      btn_colors[2].classList.add('light-green')
      setTimeout(() => {
        btn_colors[2].classList.remove('light-green')
      }, 500)
    }, 3500)
  
    setTimeout (() => {
      btn_colors[3].classList.add('light-yellow')
      setTimeout(() => {
        btn_colors[3].classList.remove('light-yellow')
      }, 500)
    }, 4500)
  }, 5000);
}
