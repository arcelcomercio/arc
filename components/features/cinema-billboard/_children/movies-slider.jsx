import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import MoviesFilter from './movies-filter'

@Consumer
class MoviesSlider extends Component {
  classes = {
    moviesSlider: 'movies-slider',
    header: 'movies-slider__header full-width',
    titleBox: 'movies-slider__title-box flex flex--justify-between',
    title: 'movies-slider__title flex-center-vertical position-relative',
    social: 'movies-slider__social flex',
    facebook: 'icon icon--facebook icon--margin-right',
    twitter: 'icon icon--twitter',
    body: 'position-relative overflow-hidden',
    content: 'movies-slider__content flex',
    movie: '',
    imageBox: '',
    imageLink: '',
    image: 'movies-slider__image full-width',
    arrowsBox:
      'movies-slider__arrows-box position-absolute flex flex--justify-between',
    leftArrow: 'movies-slider__arrows movies-slider__arrows--left',
    rightArrow: 'movies-slider__arrows movies-slider__arrows--right',
    details: 'movies-slider__details',
    movieTitle: 'movies-slider__movie-title',
    movieLink: 'movies-slider__movie-link',
    movieDescription: 'movies-slider__movie-description',
  }

  constructor(props) {
    super(props)
    const { estrenos = [] } = props.data || {}
    this.state = {
      premieres: estrenos,
      steps: estrenos.length,
      sliderWidth: estrenos.length * 100,
      slideWidth: 100 / estrenos.length,
      position: 0,
    }
    this.step = 0
  }

  _handlePrev = () => {
    const { steps, slideWidth } = this.state
    this.step -= 1
    if (this.step < 0) this.step = steps - 1
    this.setState({
      position: -slideWidth * this.step,
    })
  }

  _handleNext = () => {
    const { steps, slideWidth } = this.state
    this.step += 1
    if (this.step >= steps) this.step = 0
    this.setState({
      position: -slideWidth * this.step,
    })
  }

  render() {
    const { premieres, sliderWidth, slideWidth, position } = this.state

    const sliderStyle = {
      width: `${sliderWidth}%`,
      transform: `translateX(${position}%)`,
    }
    const slideStyle = {
      width: `${slideWidth}%`,
    }

    return (
      <div className={this.classes.container}>
        <div className={this.classes.header}>
          <div className={this.classes.titleBox}>
            <h2 className={this.classes.title}>Estrenos de la semana</h2>
            <div className={this.classes.social}>
              <i className={this.classes.facebook} />
              <i className={this.classes.twitter} />
            </div>
          </div>
          <MoviesFilter />
        </div>
        <div className={this.classes.body}>
          {premieres && (
            <Fragment>
              <ul style={sliderStyle} className={this.classes.content}>
                {premieres.map(movie => (
                  <li
                    key={movie.mid}
                    style={slideStyle}
                    className={this.classes.movie}>
                    <figure className={this.classes.imageBox}>
                      <a href="/" className={this.classes.imageLink}>
                        <picture>
                          <source
                            srcSet={movie.poster.sizes['367x176']}
                            media="(max-width: 367px)"
                          />
                          <source
                            srcSet={movie.poster.sizes['620x387']}
                            media="(max-width: 620px)"
                          />
                          <img
                            className={this.classes.image}
                            src={movie.poster.sizes.estreno}
                            alt={movie.title}
                            title={movie.title}
                          />
                        </picture>
                      </a>
                    </figure>
                    <div className={this.classes.details}>
                      <h2
                        className={this.classes.movieTitle}
                        title={movie.title}>
                        <a href="/" className={this.classes.movieLink}>
                          {movie.title}
                        </a>
                      </h2>
                      <p
                        className={this.classes.movieDescription}
                        title={movie.body}>
                        {movie.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className={this.classes.arrowsBox}>
                <a href="#prev" onClick={this._handlePrev}>
                  <i className={this.classes.leftArrow} />
                </a>
                <a href="#next" onClick={this._handleNext}>
                  <i className={this.classes.rightArrow} />
                </a>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    )
  }
}

export default MoviesSlider
