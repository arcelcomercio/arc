import React, { PureComponent } from 'react'
import { defaultImage, getUrlParameter } from '../../../../utilities/helpers'

const classes = {
  elementsSlider: 'story-gallery-slider p-20 bg-primary',
  body: 'position-relative overflow-hidden ',
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

    this.containerSliders = document.querySelector('[role="slider"]')

    this.state = {
      listSlider: contentElements,
      totalSlides: contentElements.length,
      sliderWidth: contentElements.length * 100,
      slideWidth: 100 / contentElements.length,
      currentSlide: getUrlParameter(contentElements),
    }

    this.currentSlider = getUrlParameter()
  }

  componentDidMount() {
    document.addEventListener('keydown', event => {
      this._controlKeysSlider(event)
    })
  }

  setDefault(size) {
    const { deployment, contextPath, arcSite } = this.props
    return defaultImage({ deployment, contextPath, arcSite, size })
  }

  _controlKeysSlider = e => {
    if (e.keyCode === 39) this._handleNextSlider()
    else if (e.keyCode === 37) this._handlePrevSlider()
  }

  _handlePrevSlider = () => {
    const { totalSlides, slideWidth } = this.state
    this.step -= 1
    if (this.step < 0) this.step = totalSlides - 1
    this.setState({
      currentSlide: -slideWidth * this.step,
    })

    window.history.pushState(null, '', this._getUrlGalleryImage())
  }

  _handleNextSlider = () => {
    const { totalSlides, slideWidth, listSlider } = this.state
    this.step += 1

    if (listSlider.length <= this.step) {
      window.location.href = '/'
    }

    if (this.step >= totalSlides) this.step = 0
    this.setState({
      currentSlide: -slideWidth * this.step,
    })

    window.history.pushState(null, '', this._getUrlGalleryImage())
  }

  _getUrlGalleryImage = () =>
    `${window.location.href.split('?')[0]}?foto=${this.step + 1}`

  render() {
    const {
      listSlider = [],
      sliderWidth,
      slideWidth,
      currentSlide,
    } = this.state

    const sliderStyle = {
      width: `${sliderWidth}%`,
      transform: `translateX(${currentSlide}%)`,
    }
    const slideStyle = {
      width: `${slideWidth}%`,
    }
    return (
      <>
        {listSlider.length > 0 && (
          <section className={classes.elementsSlider} id="story-galery">
            <div
              role="slider"
              aria-valuenow={listSlider.length}
              aria-valuemin="1"
              aria-valuemax="10"
              className={classes.body}>
              <ul style={sliderStyle} className={classes.content}>
                {listSlider.map((element, i) => (
                  <li
                    key={element._id}
                    style={slideStyle}
                    className={classes.element}>
                    <div className={classes.figure}>
                      <figure>
                        <img
                          src={element.resized_urls ? '' : element.url}
                          alt={element.subtitle}
                          className={classes.image}
                        />
                      </figure>
                    </div>
                    <figcaption className={classes.caption}>
                      <span className={classes.quantity}>
                        {i + 1}/{listSlider.length}
                      </span>
                      <p className={classes.captionImage}>{element.subtitle}</p>
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
          </section>
        )}
      </>
    )
  }
}

export default StoryHeaderChildGallerySlider
