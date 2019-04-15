import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

const dummy = {
  movies: [
    {
      name: 'Parque mágico',
      id: 'm-1',
    },
    {
      name: 'After: Aquí empieza todo',
      id: 'm-2',
    },
    {
      name: 'Luchando con mi familia',
      id: 'm-3',
    },
    {
      name: 'La casa que Jack construyó',
      id: 'm-4',
    },
    {
      name: 'Papá youtuber',
      id: 'm-5',
    },
  ],
  theaters: [
    {
      name: 'Ate Vitarte Cineplanet Santa Clara      S/15',
      id: 't-1',
    },
    {
      name:
        'Cine Star Aviación	                                                         S/ 10',
      id: 't-2',
    },
    {
      name:
        'Cine Star Benavides	                                                        S/ 9',
      id: 't-3',
    },
    {
      name:
        'Cine Star Excelsior	                                                            S/ 7,50',
      id: 't-4',
    },
    {
      name:
        'Cine Star Metro Comas	                                                            S/ 8',
      id: 't-5',
    },
  ],
}

@Consumer
class CinemaBillboardCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movieSelected: '',
      theaterSelected: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ movieSelected: event.target.value })
  }

  render() {
    console.log(this.state)
    const { movieSelected, theaterSelected } = this.state

    return (
      <div className="card-cinema padding-normal row-1">
        <article className="position-relative">
          <span className="card-cinema__gradient full-width" />
          <h3 className="card-cinema__category">
            <a className="card-cinema__link" href="/cartelera">
              Cartelera
            </a>
          </h3>
          <figure className="card-cinema__figure">
            <a href="/cartelera/luchando...">
              <img
                src="https://cde.3.elcomercio.pe/cines/0/1/7/0/0/1700906/poster.jpg"
                alt=""
                className="full-width card-cinema__img"
              />
            </a>
          </figure>
          <div className="card-cinema__detail full-width">
            <span className="card-cinema__premiere">Estreno</span>
            <h2 className="card-cinema__p-title">
              <a className="card-cinema__p-link" href="/cartelera/luchando...">
                Luchando con mi familia
              </a>
            </h2>
          </div>
        </article>
        <div className="card-cinema__movies-list">
          <h4 className="card-cinema__title">Vamos al cine</h4>
          <form
            action="/cartelera/search"
            method="post"
            className="card-cinema__form">
            <div className="card-cinema__selects-container">
              <select
                name="movie"
                className="card-cinema__select"
                value={movieSelected}
                onChange={this.handleChange}>
                <option
                  value=""
                  selected
                  disabled
                  className="card-cinema__option">
                  PELÍCULAS
                </option>
                {dummy.movies.map(movie => (
                  <option
                    value={movie.name}
                    className="card-cinema__option"
                    key={movie.id}>
                    {movie.name}
                  </option>
                ))}
              </select>
              <select name="theater" className="card-cinema__select">
                <option value selected disabled className="card-cinema__option">
                  CINES
                </option>
                {dummy.theaters.map(theater => (
                  <option className="card-cinema__option" key={theater.id}>
                    {theater.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="card-cinema__button">
              Buscar
            </button>
          </form>
        </div>
      </div>
    )
  }
}

CinemaBillboardCard.label = 'Cartelera'

export default CinemaBillboardCard
