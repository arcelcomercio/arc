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
    const container = document.getElementsByClassName('header__featured')[0]
    const isNotSupportSmooth =
      document.body.style['scroll-behavior'] === undefined
    if (container) {
      if (direction === 'left') {
        if (isNotSupportSmooth)
          sideScrollInterval(container, 'left', 25, 100, 20)
        else container.scrollLeft -= 100
      } else if (isNotSupportSmooth) {
        sideScrollInterval(container, 'right', 25, 100, 25)
      } else {
        container.scrollLeft += 100
      }
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
