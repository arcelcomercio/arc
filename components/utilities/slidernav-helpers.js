const sideScrollInterval = (element, direction, speed, distance, step) => {
  let scrollAmount = 0
  const newElement = element
  const slideTimer = setInterval(() => {
    if (direction === 'left') {
      newElement.scrollLeft -= step
    } else {
      newElement.scrollLeft += step
    }
    scrollAmount += step
    if (scrollAmount >= distance) {
      window.clearInterval(slideTimer)
    }
  }, speed)
}

export const sideScroll = direction => {
  if (window) {
    const container =
      document.getElementsByClassName('header__featured')[0]
    const isNotSupportSmooth =
      document.body.style['scroll-behavior'] === undefined
    if (container) {
      if (direction === 'left') {
        if (isNotSupportSmooth)
          sideScrollInterval(container, 'left', 25, 100, 20)
        else
          container.scrollLeft -= 100
      } else if (isNotSupportSmooth) {
        sideScrollInterval(container, 'right', 25, 100, 25)
      } else { container.scrollLeft += 100 }
    }
  }
}

export const handleNavScroll = e => {
  if (window) {
    const buttons = document.getElementsByClassName('header__button')
    if (e.target.scrollLeft === 0) {
      buttons[0].classList.add('disabled')
    } else {
      buttons[0].classList.remove('disabled')
    }

    if (e.target.scrollWidth - e.target.offsetWidth <= e.target.scrollLeft) {
      buttons[1].classList.add('disabled')
    } else {
      buttons[1].classList.remove('disabled')
    }
  }
}

export const checkDisabledIcons = () => {
  if (window) {
    const buttons = document.getElementsByClassName('header__button')
    const container = document.getElementsByClassName('header__featured')[0]
    if (container && buttons) {
      if (container.scrollWidth > container.clientWidth) {
        buttons[1].classList.remove('disabled')
      }
    }
  }
}

// funciones copiadas desde helpers con el fin de que el feature que no usa static true no traigan todas las funciones helpers

export const getResponsiveClasses = ({
  showInDesktop = true,
  showInTablet = true,
  showInMobile = true,
}) => {
  const responsiveClasses = []
  if (!showInDesktop) responsiveClasses.push('non-desktop')
  if (!showInTablet) responsiveClasses.push('non-tablet')
  if (!showInMobile) responsiveClasses.push('non-mobile')
  return responsiveClasses.join(' ')
}

/* export const arrayMonths = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
]

export const arrayDays = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
]

export const formattedTime = date => {
  const hours =
    date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`

  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`

  return `${hours}:${minutes}`
}

export const formatDayMonthYear = (
  currentDate,
  showTime = true,
  isStatic = false
) => {
  const date = new Date(currentDate)

  if (isStatic) date.setHours(date.getHours() - 5)

  const formattedDate = `${arrayDays[date.getDay()]} ${date.getDate()} de ${
    arrayMonths[date.getMonth()]
    } del ${date.getFullYear()}`
  return showTime ? `${formattedDate}, ${formattedTime(date)}` : formattedDate
}
 */
