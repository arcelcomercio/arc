import React, { PureComponent } from 'react'
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
      <>
        {/* Si no hay pelicula ni cine */}
        {movie === 'peliculas' && cinema === 'cines' && (
          <>
            <MoviesContainer
              type="slider"
              data={{ ...data }}
              params={{ ...params }}
              {...context}
            />
            <GenreMoviesFilter data={{ ...data }} genre={genre} {...context} />
          </>
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
          <>
            <MoviesFilter data={{ ...data }} {...params} />
            <MoviesList data={{ ...data }} cinema={cinema} {...context} />
          </>
        )}
      </>
    )
  }
}

StaticCinemaBillboard.label = 'Cartelera de Cine'

export default StaticCinemaBillboard
