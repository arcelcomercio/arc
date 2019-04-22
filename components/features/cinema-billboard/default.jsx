import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import BillboardFormat from '../../../../resources/utilsJs/billboardFormat'
import MoviesSlider from './_children/movies-slider'

@Consumer
class CinemaBillboard extends Component {
  classes = {
    mainTitle: 'movies-container__main-title text-uppercase margin-top',
    container: 'movies-container',
  }

  render() {
    const { globalContentConfig, globalContent } = this.props
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
      </Fragment>
    )
  }
}

CinemaBillboard.label = 'Cartelera de Cine'

export default CinemaBillboard
