import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import BillboardFormat from '../../../../resources/utilsJs/billboardFormat'
import MoviesSlider from './_children/movies-slider'

@Consumer
class MoviesContainer extends Component {
  classes = {
    mainTitle: 'movies-container__main-title text-uppercase margin-top',
    container: 'movies-container',
  }

  render() {
    // props = globalContent = data
    // props = params
    return (
      <Fragment>
        <h2 className={this.classes.mainTitle}>Cartelera</h2>
        <main className={this.classes.container}>
          <MoviesSlider data={{ ...globalContent }} />
          {/* if(
              sin parametros || tienes genero   => movies-slider
              tienes pelicula                   => movie
          ) */}
        </main>
      </Fragment>
    )
  }
}

MoviesContainer.label = 'Cartelera de Cine'

export default MoviesContainer
