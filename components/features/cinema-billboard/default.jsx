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

    return (
      <Fragment>
        {/* Si no hay pelicula ni cine */}
        {movie === 'peliculas' && cinema === 'cines' && (
          <Fragment>
            <MoviesContainer
              type="slider"
              data={{ ...data }}
              params={{ ...params }}
              contextPath={contextPath}
              arcSite={arcSite}
            />
            <GenreMoviesFilter
              data={{ ...data }}
              genre={genre}
              contextPath={contextPath}
              arcSite={arcSite}
            />
          </Fragment>
        )}

        {/* Si Hay pelicula y el cine es opcional */}
        {movie !== 'peliculas' && (
          <MoviesContainer
            type="banner"
            data={{ ...data }}
            params={{ ...params }}
            contextPath={contextPath}
            arcSite={arcSite}
          />
        )}

        {/* Si solo hay cine */}
        {movie === 'peliculas' && cinema !== 'cines' && (
          <Fragment>
            <MoviesFilter data={{ ...data }} {...params} />
            <MoviesList
              data={{ ...data }}
              cinema={cinema}
              contextPath={contextPath}
              arcSite={arcSite}
            />
          </Fragment>
        )}
      </Fragment>
    )
  }
}

StaticCinemaBillboard.label = 'Cartelera de Cine'

export default StaticCinemaBillboard
