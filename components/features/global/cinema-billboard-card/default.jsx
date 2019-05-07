import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import { ResizeImageUrl } from '../../../utilities/helpers'

// TODO: Fix classes
const classes = {
  cinemaCardContainer: 'card-cinema padding-normal row-1',
  cinemaCardPos: 'position-relative',
  cinemaCardGrad: 'card-cinema__gradient full-width',
  cinemaCardTitle: 'card-cinema__category',
  cinemaCardTitleLink: 'card-cinema__category',
  cinemaCardFigure: 'card-cinema__figure',
  cinemaCardImg: 'full-width card-cinema__img',
  cinemaCardDetail: 'card-cinema__detail full-width',
  cinemaCardPremier: 'card-cinema__premiere',
  cinemaTitle: 'card-cinema__p-title',
  cinemaLink: 'card-cinema__p-link',
  cinemaMoviesList: 'card-cinema__movies-list',
  cinemaMovieListTitle: 'card-cinema__title',
  cinemaForm: 'card-cinema__form',
  cinemaSelectContainer: 'card-cinema__selects-container',
  cinemaSelect: 'card-cinema__select',
  cinemaOption: 'card-cinema__option',
  cinemaButton: 'card-cinema__button',
}

@Consumer
class CinemaBillboardCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movieSelected: '',
      cinemaSelected: '',
      premiereData: {
        title: '',
        img: '',
        url: '',
        alt: '',
      },
      billboardData: {
        moviesList: [],
        cinemasList: [],
      },
    }
  }

  componentDidMount() {
    this.getBillboard()
  }

  getBillboard() {
    const { fetched } = this.getContent('cinema-billboard', { website: '' })
    const { arcSite } = this.props

    fetched.then(response => {
      const { peliculas, cines, estrenos } = response

      const moviesList = Object.values(peliculas)
      const cinemasList = cines

      const resizeImg = ResizeImageUrl(
        arcSite,
        estrenos[0].poster.filepath,
        '3:4',
        '280x186'
      )

      const premiereData = {
        title: estrenos[0].name,
        img: resizeImg,
        url: estrenos[0].url,
        alt: estrenos[0].body,
      }

      this.setState({
        premiereData,
        billboardData: { moviesList, cinemasList },
      })
    })
  }

  handleMovieSelected(event) {
    this.setState({ movieSelected: event.target.value })
  }

  handleCinemaSelected(event) {
    this.setState({ cinemaSelected: event.target.value })
  }

  handleSubmit(event) {
    const { contextPath, arcSite } = this.props
    const { movieSelected, cinemaSelected } = this.state

    const moviePath = movieSelected || 'peliculas'
    const cinemaPath = cinemaSelected || 'cines'

    const fullPath =
      !movieSelected && !cinemaSelected ? '' : `${moviePath}/${cinemaPath}`

    window.location.href = `${contextPath}/cartelera/${fullPath}?_website=${arcSite}`
    event.preventDefault()
  }

  render() {
    const {
      movieSelected,
      cinemaSelected,
      billboardData,
      premiereData,
    } = this.state

    const { contextPath, arcSite } = this.props

    return (
      <div className={classes.cinemaCardContainer}>
        <article className={classes.cinemaCardPos}>
          <span className={classes.cinemaCardGrad} />
          <h3 className={classes.cinemaCardTitle}>
            <a
              className={classes.cinemaCardTitleLink}
              href={`${contextPath}/cartelera?_website=${arcSite}`}>
              Cartelera
            </a>
          </h3>
          <figure className={classes.cinemaCardFigure}>
            <a
              href={`${contextPath}/cartelera/peliculas/${
                premiereData.url
              }?_website=${arcSite}`}>
              <img
                src={premiereData.img}
                alt={premiereData.alt}
                className={classes.cinemaCardImg}
              />
            </a>
          </figure>
          <div className={classes.cinemaCardDetail}>
            <span className={classes.cinemaCardPremier}>Estreno</span>
            <h2 className={classes.cinemaTitle}>
              <a
                className={classes.cinemaLink}
                href={`${contextPath}/cartelera/peliculas/${
                  premiereData.url
                }?_website=${arcSite}`}>
                Luchando con mi familia
              </a>
            </h2>
          </div>
        </article>
        <div className={classes.cinemaMoviesList}>
          <h4 className={classes.cinemaMovieListTitle}>Vamos al cine</h4>
          <form
            action="/cartelera/search"
            method="post"
            className={classes.cinemaForm}
            onSubmit={e => this.handleSubmit(e)}>
            <div className={classes.cinemaSelectContainer}>
              <select
                name="movie"
                className={classes.cinemaSelect}
                value={movieSelected}
                onChange={e => this.handleMovieSelected(e)}>
                <option
                  value=""
                  defaultValue
                  disabled
                  className={classes.cinemaOption}>
                  PELÍCULAS
                </option>
                {billboardData.moviesList.map(movie => (
                  <option
                    value={movie.url}
                    className={classes.cinemaOption}
                    key={movie.mid}>
                    {movie.title}
                  </option>
                ))}
              </select>
              <select
                name="theater"
                className={classes.cinemaSelect}
                value={cinemaSelected}
                onChange={e => this.handleCinemaSelected(e)}>
                <option
                  value=""
                  defaultValue
                  disabled
                  className={classes.cinemaOption}>
                  CINES
                </option>
                {billboardData.cinemasList.map(cinema => (
                  <option
                    value={cinema.url}
                    className={classes.cinemaOption}
                    key={cinema.cid}>
                    {cinema.nombre}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className={classes.cinemaButton}>
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
