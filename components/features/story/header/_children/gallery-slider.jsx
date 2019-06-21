import React, { PureComponent } from 'react'
import { defaultImage, getUrlParameter } from '../../../../utilities/helpers'

const classes = {
  elementsSlider: 'story-gallery-slider',
  body: 'position-relative overflow-hidden ',
  content: 'story-gallery-slider__content flex',
  element: '',
  image: 'story-gallery-slider__img w-full object-fit-cover',
  caption: 'story-gallery-slider__caption pt-10 pb-15  mr-5 ',
  captionImage: 'story-gallery-slider__caption-image pt-10   ',
  quantity: 'story-gallery-slider__quantity  p-15 mr-5 text-center  ',
  arrowsBox:
    'story-gallery-slider__arrows-box position-absolute flex w-full justify-between',
  leftArrow: 'story-gallery-slider__arrows story-gallery-slider__arrows--left',
  rightArrow:
    'story-gallery-slider__arrows story-gallery-slider__arrows--right',
}

class StoryHeaderChildGallerySlider extends PureComponent {
  constructor(props) {
    super(props)
    const {
      contentElementGallery: { content_elements: contentElements = [] },
    } = props || {}

    this.state = {
      dataSlider: contentElements,
      steps: contentElements.length,
      sliderWidth: contentElements.length * 100,
      slideWidth: 100 / contentElements.length,
      position: getUrlParameter(contentElements),
    }

    this.step = getUrlParameter()
  }

  componentDidMount() {
    // this._controlKeys()
  }

  setDefault(size) {
    const { deployment, contextPath, arcSite } = this.props
    return defaultImage({ deployment, contextPath, arcSite, size })
  }

  _controlKeys = e => {
    if (e.keyCode === 39) {
      this._handleNext()
      return false
    }
    if (e.keyCode === 37) {
      this._handlePrev()
      return false
    }
    return ''
  }

  _handlePrev = () => {
    const { steps, slideWidth } = this.state
    this.step -= 1
    if (this.step < 0) this.step = steps - 1
    this.setState({
      position: -slideWidth * this.step,
    })

    this._urlGalleryImage()
  }

  _handleNext = () => {
    const { steps, slideWidth, dataSlider } = this.state
    this.step += 1

    if (dataSlider.length <= this.step) {
      window.location.href = '/'
    }

    if (this.step >= steps) this.step = 0
    this.setState({
      position: -slideWidth * this.step,
    })

    this._urlGalleryImage()
  }

  _urlGalleryImage = () => {
    const pathFoto = `${window.location.href.split('?')[0]}?foto=${this.step +
      1}`
    window.history.pushState(null, '', pathFoto)
  }

  render() {
    const { dataSlider, sliderWidth, slideWidth, position } = this.state

    const sliderStyle = {
      width: `${sliderWidth}%`,
      transform: `translateX(${position}%)`,
    }
    const slideStyle = {
      width: `${slideWidth}%`,
    }

    return (
      <section className={classes.elementsSlider} id="story-galery">
        <div
          role="slider"
          aria-valuenow={dataSlider.length}
          aria-valuemin="1"
          aria-valuemax="10"
          className={classes.body}>
          {dataSlider && (
            <>
              <ul style={sliderStyle} className={classes.content}>
                {dataSlider.map((element, i) => (
                  <li
                    key={element._id}
                    style={slideStyle}
                    className={classes.element}>
                    <figure>
                      <img
                        src={element.resized_urls ? '' : element.url}
                        alt={element.subtitle}
                        className={classes.image}
                      />
                      <figcaption className={classes.caption}>
                        <span className={classes.quantity}>
                          {i + 1}/{dataSlider.length}
                        </span>
                        <p className={classes.captionImage}>
                          {element.subtitle}
                        </p>
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
              {dataSlider && dataSlider.length > 1 && (
                <div role="navigation" className={classes.arrowsBox}>
                  <i
                    role="button"
                    tabIndex="0"
                    className={classes.leftArrow}
                    onClick={this._handlePrev}
                    onKeyDown={this._controlKeys}
                  />
                  <i
                    role="button"
                    tabIndex="0"
                    className={classes.rightArrow}
                    onClick={this._handleNext}
                    onKeyDown={this._controlKeys}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </section>
    )
  }
}

export default StoryHeaderChildGallerySlider
