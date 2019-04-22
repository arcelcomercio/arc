import React, { PureComponent, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import MoviesContainer from './_children/movies-container'
import GenreMoviesFilter from './_children/genre-movies-filter'

@Consumer
class CinemaBillboard extends PureComponent {
  classes = {
    mainTitle: 'movies-container__main-title text-uppercase margin-top',
    container: 'movies-container',
  }

  render() {
    const { globalContentConfig, globalContent: data } = this.props
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
        {/* if(
                sin parametros || tienes genero     => movies-container + genre-movies-filter
                tienes pelicula                     => movies-container + available-cinemas
                tiene solo cine                     => cinema-movies-list

          ) */}
        <MoviesContainer data={{ ...data }} params={{ ...params }} />
        <GenreMoviesFilter data={{ ...data }} genre={genre} />
      </Fragment>
    )
  }
}

CinemaBillboard.label = 'Cartelera de Cine'

export default CinemaBillboard
