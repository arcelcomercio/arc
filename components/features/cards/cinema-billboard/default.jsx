import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import { defaultImage } from '../../../utilities/helpers'

const classes = {
  cinemaCard: 'cinema-card padding-normal row-1',
  container: 'position-relative',
  gradient: 'cinema-card__gradient full-width',
  category: 'cinema-card__category',
  link: 'cinema-card__link',
  figure: 'cinema-card__figure',
  image: 'full-width cinema-card__img',
  detail: 'cinema-card__detail full-width',
  premiere: 'cinema-card__premiere',
  movieTitle: 'cinema-card__p-title',
  movieLink: 'cinema-card__p-link',
  moviesList: 'cinema-card__movies-list',
  title: 'cinema-card__title',
  form: 'cinema-card__form',
  selectsContainer: 'cinema-card__selects-container',
  select: 'cinema-card__select',
  option: 'cinema-card__option',
  button: 'cinema-card__button',
}

@Consumer
class CardCinemaBillboard extends PureComponent {
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
    const { arcSite, deployment, contextPath } = this.props

    fetched.then(response => {
      const { peliculas, cines, estrenos } = response

      const moviesList = Object.values(peliculas)
      const cinemasList = cines

      const img = defaultImage({
        deployment,
        contextPath,
        arcSite,
        size: 'sm',
      })

      const premiereData = {
        title: estrenos[0].name,
        img,
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
      <div className={classes.cinemaCard}>
        <article className={classes.container}>
          <span className={classes.gradient} />
          <h3 className={classes.category}>
            <a
              className={classes.link}
              href={`${contextPath}/cartelera?_website=${arcSite}`}>
              Cartelera
            </a>
          </h3>
          <figure className={classes.figure}>
            <a
              href={`${contextPath}/cartelera/peliculas/${
                premiereData.url
              }?_website=${arcSite}`}>
              <img
                src={premiereData.img}
                alt={premiereData.alt}
                className={classes.image}
              />
            </a>
          </figure>
          <div className={classes.detail}>
            <span className={classes.premiere}>Estreno</span>
            <h2 className={classes.movieTitle}>
              <a
                className={classes.movieLink}
                href={`${contextPath}/cartelera/peliculas/${
                  premiereData.url
                }?_website=${arcSite}`}>
                Luchando con mi familia
              </a>
            </h2>
          </div>
        </article>
        <div className={classes.moviesList}>
          <h4 className={classes.title}>Vamos al cine</h4>
          <form
            action="/cartelera/search"
            method="post"
            className={classes.form}
            onSubmit={e => this.handleSubmit(e)}>
            <div className={classes.selectsContainer}>
              <select
                name="movie"
                className={classes.select}
                value={movieSelected}
                onChange={e => this.handleMovieSelected(e)}>
                <option
                  value=""
                  defaultValue
                  disabled
                  className={classes.option}>
                  PELÍCULAS
                </option>
                {billboardData.moviesList.map(movie => (
                  <option
                    value={movie.url}
                    className={classes.option}
                    key={movie.mid}>
                    {movie.title}
                  </option>
                ))}
              </select>
              <select
                name="theater"
                className={classes.select}
                value={cinemaSelected}
                onChange={e => this.handleCinemaSelected(e)}>
                <option
                  value=""
                  defaultValue
                  disabled
                  className={classes.option}>
                  CINES
                </option>
                {billboardData.cinemasList.map(cinema => (
                  <option
                    value={cinema.url}
                    className={classes.option}
                    key={cinema.cid}>
                    {cinema.nombre}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className={classes.button}>
              Buscar
            </button>
          </form>
        </div>
      </div>
    )
  }
}

CardCinemaBillboard.label = 'Mini-Cartelera'

export default CardCinemaBillboard
