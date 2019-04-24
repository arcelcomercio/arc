import React, { PureComponent, Fragment } from 'react'
import Consumer from 'fusion:consumer'

import MoviesContainer from './_children/movies-container'
import GenreMoviesFilter from './_children/genre-movies-filter'
import MoviesList from './_children/movies-list'

@Consumer
class CinemaBillboard extends PureComponent {
  classes = {
    mainTitle: 'movies-container__main-title text-uppercase margin-top',
    container: 'movies-container',
  }

  render() {
    const { globalContentConfig, globalContent: data } = this.props
    const {
      query: {
        movie = 'peliculas',
        cinema = 'cines',
        genre = '',
      } = {},
    } = globalContentConfig || {}
    const params = {
      movie,
      cinema,
      genre,
    }
    return (
      <Fragment>

        { /* Si no hay pelicula ni cine */ }
        {movie === 'peliculas' && cinema === 'cines' && 
          <Fragment>
            <MoviesContainer type="slider" data={{ ...data }} params={{ ...params }} />
            <GenreMoviesFilter data={{ ...data }} genre={genre} />
          </Fragment>
        }

        { /* Si Hay pelicula y el cine es opcional */}
        {movie !== 'peliculas'  &&
            <MoviesContainer type="banner" data={{ ...data }} params={{ ...params }} />
        }

        { /* Si solo hay cine */ }
        {movie === 'peliculas' && cinema !== 'cines' &&
          <MoviesList data={{ ...data }} params={{...params}} />
        }

      </Fragment>
    )
  }
}

CinemaBillboard.label = 'Cartelera de Cine'

export default CinemaBillboard
