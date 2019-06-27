import React, { PureComponent } from 'react'
import { defaultImage, getUrlParameter } from '../../../../utilities/helpers'

const classes = {
  elementsSlider: 'story-gallery-slider p-20 bg-primary',
  body: 'position-relative overflow-hidden ',
  content: 'story-gallery-slider__content flex',
  element: '',
  image: 'story-gallery-slider__img w-full object-fit-cover',
  caption: 'story-gallery-slider__caption pt-20 pb-20 flex',
  captionImage:
    'story-gallery-slider__caption-image pt-10 ml-15 text-sm text-white secondary-font',
  quantity:
    'story-gallery-slider__quantity mr-5 title-xs flex items-center justify-center',
  arrowsBox:
    'story-gallery-slider__arrows-box position-absolute top-0 flex w-full items-center justify-between pl-20 pr-20',
  leftArrow: 'story-gallery-slider__arrows icon-left text-white title-lg',
  rightArrow: 'story-gallery-slider__arrows icon-right text-white title-lg',
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
    const { dataSlider = [], sliderWidth, slideWidth, position } = this.state

    const sliderStyle = {
      width: `${sliderWidth}%`,
      transform: `translateX(${position}%)`,
    }
    const slideStyle = {
      width: `${slideWidth}%`,
    }
    return (
      <>
        {dataSlider.length > 0 && (
          <section className={classes.elementsSlider} id="story-galery">
            <div
              role="slider"
              aria-valuenow={dataSlider.length}
              aria-valuemin="1"
              aria-valuemax="10"
              className={classes.body}>
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
            </div>
          </section>
        )}
      </>
    )
  }
}

export default StoryHeaderChildGallerySlider
