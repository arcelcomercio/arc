import React, { PureComponent, Fragment } from 'react'
import Consumer from 'fusion:consumer'

import MoviesContainer from './_children/movies-container'
import GenreMoviesFilter from './_children/genre-movies-filter'
import MoviesList from './_children/movies-list'
import MoviesFilter from './_children/movies-filter'

@Consumer
class StaticCinemaBillboard extends PureComponent {
  render() {
    const {
      globalContentConfig,
      globalContent: data,
      deployment,
      contextPath,
      arcSite,
    } = this.props
    const {
      query: { movie = 'peliculas', cinema = 'cines', genre = '' } = {},
    } = globalContentConfig || {}
    const params = {
      movie,
      cinema,
      genre,
    }
    const context = {
      deployment,
      contextPath,
      arcSite,
    }

    return (
      <Fragment>
        {/* Si no hay pelicula ni cine */}
        {movie === 'peliculas' && cinema === 'cines' && (
          <Fragment>
            <MoviesContainer
              type="slider"
              data={{ ...data }}
              params={{ ...params }}
              {...context}
            />
            <GenreMoviesFilter data={{ ...data }} genre={genre} {...context} />
          </Fragment>
        )}

        {/* Si Hay pelicula y el cine es opcional */}
        {movie !== 'peliculas' && (
          <MoviesContainer
            type="banner"
            data={{ ...data }}
            params={{ ...params }}
            {...context}
          />
        )}

        {/* Si solo hay cine */}
        {movie === 'peliculas' && cinema !== 'cines' && (
          <Fragment>
            <MoviesFilter data={{ ...data }} {...params} />
            <MoviesList data={{ ...data }} cinema={cinema} {...context} />
          </Fragment>
        )}
      </Fragment>
    )
  }
}

StaticCinemaBillboard.label = 'Cartelera de Cine'

export default StaticCinemaBillboard
