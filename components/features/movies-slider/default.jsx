import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import MoviesFilter from '../movies-filter/default'
import PropTypes from 'prop-types'

@Consumer
class MoviesSlider extends Component {
  classes = {
    moviesSlider: 'movies-slider full-width margin-top',
    container: 'movies-slider__container',
    header: 'movies-slider__header padding-xlarge full-width',
    titleBox: 'movies-slider__title-box flex flex--justify-between',
    title: 'movies-slider__title text-uppercase',
    body: 'movies-slider__body position-relative',
    content: 'movies-slider__content position-relative overflow-hidden',
    movie: 'movies-slider__movie',
    imageBox: 'movies-slider__image-box',
    imageLink: 'movies-slider__image-link',
    image: 'movies-slider__image full-width',
    details: 'movies-slider__details padding-xlarge',
    movieTitle: 'movies-slider__movie-title',
    movieLink: 'movies-slider__movie-link',
    movieDescription: 'movies-slider__movie-description',
  }

  render() {
    return (
      <main className={this.classes.moviesSlider}>
        <div className={this.classes.container} />
        <div className={this.classes.header}>
          <div className={this.classes.titleBox}>
            <h2 className={this.classes.title}>Estrenos de la semana</h2>
            <div>social</div>
          </div>
          <MoviesFilter />
        </div>
        <div className={this.classes.body}>
          <ul className={this.classes.content}>
            <li className={this.classes.movie}>
              <figure className={this.classes.imageBox}>
                <a href="/" className={this.classes.imageLink}>
                  <picture>
                    <source
                      srcSet="https://cde.3.elcomercio.pe/cines/0/1/7/0/0/1700906/estreno.jpg"
                      media="(max-width: 610px)"
                    />
                    <img
                      className={this.classes.image}
                      src="https://cde.3.elcomercio.pe/cines/0/1/7/0/0/1700906/estreno.jpg"
                      alt="Luchando con mi familia"
                      title="Luchando con mi familia"
                    />
                  </picture>
                </a>
              </figure>
              <div className={this.classes.details}>
                <h2
                  className={this.classes.movieTitle}
                  title="Luchando con mi familia">
                  <a href="/" className={this.classes.movieLink}>
                    Luchando con mi familia
                  </a>
                </h2>
                <p
                  className={this.classes.movieDescription}
                  title="Un antiguo luchador de lucha libre y su familia se ganan la
                    vida actuando a lo largo del país, pero sus hijos sueñan con
                    poder vivir del Wrestling.">
                  Un antiguo luchador de lucha libre y su familia se ganan la
                  vida actuando a lo largo del país, pero sus hijos sueñan con
                  poder vivir del Wrestling.
                </p>
              </div>
            </li>
          </ul>
          <div className="ui-arrows">
            <a href="#prev" className="ui-prev">
              <i className="icon-prev" />
            </a>
            <a href="#next" className="ui-next">
              <i className="icon-next" />
            </a>
          </div>
        </div>
      </main>
    )
  }
}

MoviesSlider.label = 'Carrusel de Películas'

export default MoviesSlider
