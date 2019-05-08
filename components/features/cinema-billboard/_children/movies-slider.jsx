import React, { PureComponent, Fragment } from 'react'

const classes = {
  moviesSlider: 'movies-slider',
  body: 'position-relative overflow-hidden',
  content: 'movies-slider__content flex',
  movie: '',
  imageBox: '',
  imageLink: '',
  image: 'movies-slider__img full-width',
  arrowsBox:
    'movies-slider__arrows-box position-absolute flex flex--justify-between',
  leftArrow: 'movies-slider__arrows movies-slider__arrows--left',
  rightArrow: 'movies-slider__arrows movies-slider__arrows--right',
  details: 'movies-slider__details',
  movieTitle: 'movies-slider__movie-title',
  movieLink: 'movies-slider__movie-link',
  movieDescription: 'movies-slider__movie-description',
}
class MoviesSlider extends PureComponent {
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
    const { contextPath, arcSite } = props
    this.WEBSITE_PARAM = `?_website=${arcSite}`
    this.URI_BASE = `${contextPath}/cartelera`
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

    // container out
    return (
      <div className={classes.moviesSlider}>
        <div className={classes.body}>
          {premieres && (
            <Fragment>
              <ul style={sliderStyle} className={classes.content}>
                {premieres.map(movie => (
                  <li
                    key={movie.mid}
                    style={slideStyle}
                    className={classes.movie}>
                    <figure className={classes.imageBox}>
                      <a
                        href={`${this.URI_BASE}/${movie.url}/cines${
                          this.WEBSITE_PARAM
                        }`}
                        className={classes.imageLink}>
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
                            className={classes.image}
                            src={movie.poster.sizes.estreno}
                            alt={movie.title}
                            title={movie.title}
                          />
                        </picture>
                      </a>
                    </figure>
                    <div className={classes.details}>
                      <h2 className={classes.movieTitle} title={movie.title}>
                        <a
                          href={`${this.URI_BASE}/${movie.url}/cines${
                            this.WEBSITE_PARAM
                          }`}
                          className={classes.movieLink}>
                          {movie.title}
                        </a>
                      </h2>
                      <p
                        className={classes.movieDescription}
                        title={movie.body}>
                        {movie.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              {premieres && premieres.length > 1 && (
                <div className={classes.arrowsBox}>
                  <i
                    role="button"
                    tabIndex="0"
                    className={classes.leftArrow}
                    onClick={this._handlePrev}
                    onKeyDown={this._handlePrev}
                  />
                  <i
                    role="button"
                    tabIndex="0"
                    className={classes.rightArrow}
                    onClick={this._handleNext}
                    onKeyDown={this._handleNext}
                  />
                </div>
              )}
            </Fragment>
          )}
        </div>
      </div>
    )
  }
}

export default MoviesSlider
