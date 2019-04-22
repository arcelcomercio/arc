import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import MoviesContainer from './_children/movies-container'
import GenreMoviesFilter from './_children/genre-movies-filter'

@Consumer
class CinemaBillboard extends Component {
  classes = {
    mainTitle: 'movies-container__main-title text-uppercase margin-top',
    container: 'movies-container',
  }

  render() {
    const { globalContentConfig, globalContent: data } = this.props
    const {
      query: { movie = 'peliculas', cinema = 'cines', genre = '' } = {},
    } = globalContentConfig || {}

    return (
      <Fragment>
        {/* if(
                sin parametros || tienes genero     => movies-container + genre-movies-filter
                tienes pelicula                     => movies-container + available-cinemas
                tiene solo cine                     => cinema-movies-list

          ) */}
        <MoviesContainer {...data} />
        <GenreMoviesFilter {...data} />
      </Fragment>
    )
  }
}

CinemaBillboard.label = 'Cartelera de Cine'

export default CinemaBillboard
