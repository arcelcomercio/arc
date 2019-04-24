import React, { PureComponent, Fragment } from 'react'
import MoviesSlider from './movies-slider'
import MoviesFilter from './movies-filter'
import MovieDetail from './movies-detail'

class MoviesContainer extends PureComponent {
  classes = {
    mainTitle: 'movies-container__main-title text-uppercase margin-top',
    container: 'movies-container',
  }

  render() {
    const { data, params, type } = this.props // params = movie, cinema, genre
    return (
      <Fragment>
        <h2 className={this.classes.mainTitle}>Cartelera</h2>
        <main className={this.classes.container}>
          <MoviesFilter data={{ ...data }} {...params} />

          { type === 'slider' && <MoviesSlider data={{ ...data }} /> }
          { type === 'banner' && <MovieDetail data={{ ...data }} {...params} /> }
          
        </main>
      </Fragment>
    )
  }
}

MoviesContainer.label = 'Cartelera de Cine'

export default MoviesContainer
