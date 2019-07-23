import React, { PureComponent } from 'react'
import { getUrlParameter } from '../../../../utilities/helpers'
import AdsFotogaleria from '../../../../global-components/ads'

const classes = {
  elementsSlider: 'story-gallery-slider p-20 bg-primary flex',
  element: 'story-gallery-slider__item',
  body: 'position-relative overflow-hidden w-full',
  content: 'story-gallery-slider__content flex',
  figure: 'story-gallery-slider__figure position-relative',
  image: 'story-gallery-slider__img w-full object-fit-cover',
  caption: 'story-gallery-slider__caption pt-20 pb-20 flex',
  captionImage: `story-gallery-slider__caption-image pt-10 pl-15 text-sm text-white secondary-font line-h-sm`,
  quantity: `story-gallery-slider__quantity title-xs flex items-center justify-center`,
  leftArrow: `story-gallery-slider__arrows story-gallery-slider__arrows--left icon-left text-white title-lg flex items-center justify-center h-full position-absolute top-0`,
  rightArrow: `story-gallery-slider__arrows story-gallery-slider__arrows--right icon-right text-white title-lg flex items-center justify-center h-full position-absolute top-0`,
}

class StoryHeaderChildGallerySlider extends PureComponent {
  constructor(props) {
    super(props)
    const {
      contentElementGallery: { content_elements: contentElements = [] },
    } = props || {}

    const totalSlides = contentElements.length

    this.currentSlider = getUrlParameter()
    this.dragFlag = false
    this.initPointDrag = 0
    this.initPositionList = 0
    this.distDrag = 0
    this.limitDrag = 40

    this.state = {
      sliders: contentElements,
      totalSlides,
      sliderWidth: totalSlides * 100,
      slideWidth: 100 / totalSlides,
      positionSlide: 0,
    }
  }

  componentDidMount() {
    /* document.addEventListener('keydown', event => {
      this._controlKeysSlider(event)
    }) */
    this.list = document.querySelector('.story-gallery-slider__content')

    if (this.list !== null) {
      this.list.addEventListener('mousedown', this._initDrag)
      this.list.addEventListener('mouseup', this._endDrag)
      this.list.addEventListener('mousemove', this._moveDrag)

      this.list.addEventListener('touchstart', this._initDrag)
      this.list.addEventListener('touchend', this._endDrag)
      this.list.addEventListener('touchmove', this._moveDrag)
    }

    this._moveSlide()
  }

  _getUrlGalleryImage = slide => {
    const { origin, pathname, search } = window.location
    let querys = ''
    if (search !== '') {
      querys = search.includes('foto')
        ? search.replace(/foto=[0-9]+/, `foto=${slide}`)
        : `${search}&foto=${slide}`
    } else querys = `?foto=${slide}`
    return `${origin}${pathname}${querys}`
  }

  _controlKeysSlider = e => {
    if (e.keyCode === 39) this._handleNextSlider()
    else if (e.keyCode === 37) this._handlePrevSlider()
  }

  _initDrag = evt => {
    this.dragFlag = true
    this.initPointDrag = evt.offsetX || evt.changedTouches[0].clientX
    const listWidth = this.list.getBoundingClientRect().width
    const matchP = this.list.style.transform.match(/\((-?)(\d+)%\)/)
    const percentPosition = matchP[1] !== '' ? -matchP[2] : matchP[2]
    this.listPositionPx = (listWidth * percentPosition) / 100
    this.list.style.transform = `translateX(${this.listPositionPx}px)`
  }

  _endDrag = () => {
    const { totalSlides } = this.state
    this.dragFlag = false
    if (
      this.distDrag < this.limitDrag ||
      this.currentSlide === 0 ||
      this.currentSlide === totalSlides
    ) {
      this._moveSlide()
    }
    this._setListPosition(this._getNewPosition(), '%')
    this.distDrag = 0
  }

  _moveDrag = evt => {
    if (this.dragFlag) {
      const { offsetX, movementX, changedTouches } = evt

      let dir = ''
      if (movementX) {
        dir = movementX > 0 ? 'left' : 'right'
      }
      if (changedTouches && changedTouches[0]) {
        dir =
          changedTouches[0].clientX - this.initPointDrag > 0 ? 'left' : 'right'
      }

      const posX = offsetX || changedTouches[0].clientX
      this._drag(dir, posX)
    }
  }

  _handlePrevSlider = () => {
    const prevSlide = this.currentSlider - 1
    if (prevSlide >= 1) {
      this.currentSlider = prevSlide
      window.history.pushState(null, '', this._getUrlGalleryImage(prevSlide))
      this._moveSlide()
    }
  }

  _handleNextSlider = () => {
    const { totalSlides } = this.state
    const nextSlide = this.currentSlider + 1
    if (nextSlide <= totalSlides) {
      this.currentSlider = nextSlide
      window.history.pushState(null, '', this._getUrlGalleryImage(nextSlide))
      this._moveSlide()
    } else window.location.href = '/'
  }

  _drag(direction, posX) {
    const { totalSlides } = this.state
    this.distDrag =
      direction === 'right'
        ? posX - this.initPointDrag
        : -(this.initPointDrag - posX)
    if (
      (direction === 'right' && this.currentSlider < totalSlides - 1) ||
      (direction === 'left' && this.currentSlider > 0)
    ) {
      this._setListPosition(this.listPositionPx + this.distDrag, 'px')
    }
    if (Math.abs(this.distDrag) > this.limitDrag) {
      if (direction === 'right') this._handleNextSlider()
      else this._handlePrevSlider()
      this._endDrag()
    }
  }

  _setListPosition(pos, unit) {
    this.list.style.transform = `translateX(${pos}${unit})`
  }

  _getNewPosition() {
    const { slideWidth } = this.state
    return (this.currentSlider - 1) * -slideWidth
  }

  _moveSlide() {
    this.setState({
      positionSlide: this._getNewPosition(),
    })
  }

  render() {
    const { sliders = [], sliderWidth, slideWidth, positionSlide } = this.state
    const sliderStyle = {
      width: `${sliderWidth}%`,
      transform: `translateX(${positionSlide}%)`,
    }
    const slideStyle = {
      width: `${slideWidth}%`,
    }
    return (
      <>
        {sliders.length > 0 && (
          <section className={classes.elementsSlider} id="story-galery">
            <div
              role="slider"
              aria-valuenow={sliders.length}
              aria-valuemin="1"
              aria-valuemax="10"
              className={classes.body}>
              <ul style={sliderStyle} className={classes.content}>
                {sliders.map((element, i) => (
                  <li
                    key={element._id}
                    style={slideStyle}
                    className={classes.element}>
                    <div className={classes.figure}>
                      <figure>
                        <img
                          src={
                            element.resized_urls
                              ? element.resized_urls.large
                              : element.url
                          }
                          alt={element.caption}
                          className={classes.image}
                          loading="lazy"
                        />
                      </figure>
                    </div>
                    <figcaption className={classes.caption}>
                      <span className={classes.quantity}>
                        {i + 1}/{sliders.length}
                      </span>
                      <p className={classes.captionImage}>{element.caption}</p>
                    </figcaption>
                  </li>
                ))}
              </ul>
              {/*          {dataSlider && dataSlider.length > 1 && (
                <div role="navigation" className={classes.arrowsBox}> */}
              <i
                role="button"
                tabIndex="0"
                className={classes.leftArrow}
                onClick={this._handlePrevSlider}
                onKeyDown={this._controlKeysSlider}
              />
              <i
                role="button"
                tabIndex="0"
                id="icon-right"
                className={classes.rightArrow}
                onClick={this._handleNextSlider}
                onKeyDown={this._controlKeysSlider}
              />
              {/*      </div>
              )} */}
            </div>
            <AdsFotogaleria
              adElement="fotogaleria1"
              isDesktop
              isMobile={false}
            />
          </section>
        )}
      </>
    )
  }
}

export default StoryHeaderChildGallerySlider
