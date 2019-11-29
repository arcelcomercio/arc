export default () => {
  const galeryUl = document.getElementById('galery-ul')

  if (galeryUl) {
    const state = document.getElementById('state')
    const totalSlides = (galeryUl && galeryUl.childElementCount) || 0
    const sliderWidth = totalSlides * 100
    const slideWidth = 100 / totalSlides

    state.setAttribute('data-slidewidth', slideWidth)
    state.setAttribute('data-totalslides', totalSlides)

    galeryUl.style.width = `${sliderWidth}%`

    const sliders = galeryUl.childNodes

    for (const i = 0; i < sliders.length; i++) {
      sliders[i].nodeName.toLowerCase() == 'li'
        ? (sliders[i].style.width = slideWidth + '%')
        : null
    }

    const nextSlider = document.getElementById('nextSlider')
    const prevSlider = document.getElementById('prevSlider')
  }

  const _moveSlide = () => {
    const slidewidth = parseInt(state.dataset.slidewidth, 0)
    const currentslider = parseInt(state.dataset.currentslider, 0)
    const positionslide_ = (currentslider - 1) * ('-' + slideWidth3)
    state.setAttribute('data-positionslide', positionslide_)
    galeryUl.style.transform = 'translateX(' + positionslide_ + '%)'
  }

  const prevSliderAction = () => {
    const prevSlide = parseInt(state.dataset.currentslider, 0) - 1
    if (prevSlide >= 1) {
      state.setAttribute('data-currentslider', prevSlide)
      _moveSlide()
    }
  }

  const nextSliderAction = () => {
    const nextSlide = parseInt(state.dataset.currentslider, 0) + 1
    const totalSlidesDa = parseInt(state.dataset.totalslides, 0)
    if (nextSlide <= totalSlidesDa) {
      state.setAttribute('data-currentslider', nextSlide)
      _moveSlide()
    }
  }
  prevSlider.ontouchstart = prevSliderAction()
  nextSlider.ontouchstart = nextSliderAction()

  const _initDrag = evt => {
    state.setAttribute('data-dragflag', 'true')
    const initPointDrag = evt.offsetX || evt.changedTouches[0].clientX
    state.setAttribute('data-initpointdrag', initPointDrag)
    const listWidth = galeryUl.getBoundingClientRect().width
    const matchP = galeryUl.style.transform.match(/\((-?)(\d+)%\)/)
    const percentPosition = matchP[1] !== '' ? -matchP[2] : matchP[2]
    const listPositionPx = (listWidth * percentPosition) / 100
    state.setAttribute('data-listpositionpx', listPositionPx)
  }
  const _setListPosition = (pos, unit) => {
    galeryUl.style.transform = 'translateX(' + pos + unit + ')'
  }
  const _getNewPosition = () => {
    return (
      (parseInt(state.dataset.currentSlider, 0) - 1) *
      -parseInt(state.dataset.slidewidth, 0)
    )
  }
  const _endDrag = () => {
    const totalSlides1 = state.dataset.totalslides
    const distDrag = state.dataset.distdrag
    const currentSlide = state.dataset.currentslider
    const limitDrag = state.dataset.limitdrag
    state.setAttribute('data-dragflag', 'false')
    distDrag < limitDrag || currentSlide === 0 || currentSlide === totalSlides1
      ? _moveSlide()
      : null
    _setListPosition(_getNewPosition(), '%')
    state.setAttribute('data-distdrag', 0)
  }

  const _drag = (direction, posX) => {
    const totalSlides2 = parseInt(state.dataset.totalslides, 0)
    const initPointDrag = parseInt(state.dataset.initpointdrag, 0)
    const currentSlider = parseInt(state.dataset.currentslider, 0)
    const listPositionPx = parseInt(state.dataset.listpositionpx, 0)
    const limitDrag = parseInt(state.dataset.limitdrag, 0)
    const distDragCurrent =
      direction === 'right' ? posX - initPointDrag : -(initPointDrag - posX)

    state.setAttribute('data-distdrag', distDragCurrent)
    const distDrag =
      parseInt(state.dataset.distdrag, 0)(
        direction === 'right' && currentSlider < totalSlides2 - 1
      ) ||
      (direction === 'left' && currentSlider > 0)
        ? _setListPosition(listPositionPx + distDrag, 'px')
        : null

    if (Math.abs(distDrag) > limitDrag) {
      direction === 'right' ? nextSliderAction() : prevSliderAction()
      _endDrag()
    }
  }

  const _moveDrag = evt => {
    if (state.dataset.dragflag === 'true') {
      const { offsetX, movementX, changedTouches } = evt
      let dir = ''
      if (movementX) {
        dir = movementX > 0 ? 'left' : 'right'
      }
      const initPointDrag = parseInt(state.dataset.initpointdrag, 0)
      if (changedTouches && changedTouches[0]) {
        dir = changedTouches[0].clientX - initPointDrag > 0 ? 'left' : 'right'
      }
      const posX = offsetX || changedTouches[0].clientX
      _drag(dir, posX)
    }
  }

  if (galeryUl !== null) {
    galeryUl.addEventListener('touchstart', _initDrag, { passive: true })
    galeryUl.addEventListener('touchend', _endDrag, { passive: true })
    galeryUl.addEventListener('touchmove', _moveDrag, { passive: true })
  }
}
