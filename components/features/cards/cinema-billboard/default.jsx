import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
// import { defaultImage } from '../../../utilities/helpers'

// Se evita usar funciones de helpers debido a que este feature no usa static true
// TODO: Refactorizar para poder usar static true
const defaultImage = ({ deployment, contextPath, arcSite, size = 'lg' }) => {
  if (size !== 'lg' && size !== 'md' && size !== 'sm') return ''
  return deployment(
    `${contextPath}/resources/dist/${arcSite}/images/default-${size}.png`
  )
}

const classes = {
  cinemaCard: 'cinema-card bg-white',
  container: 'position-relative',
  gradient: 'cinema-card__gradient w-full position-absolute bottom-0 left-0',
  category: `cinema-card__category uppercase primary-font mb-0 pb-15 text-xl line-h-none`,
  link: 'cinema-card__link text-gray-300',
  figure: 'cinema-card__figure overflow-hidden',
  image: 'w-full h-full object-cover',
  detail: `cinema-card__detail w-full position-absolute bottom-0 pt-15 pb-15 pl-20 pr-20`,
  premiere: 'cinema-card__premiere text-xl line-h-xs font-bold',
  movieTitle: 'cinema-card__p-title overflow-hidden title-xs text-white',
  movieLink: 'cinema-card__p-link font-bold text-white line-h-xs',
  moviesList: 'cinema-card__movies-list p-10',
  title: `cinema-card__title uppercase primary-font font-bold pt-5 pb-15 pl-10 pr-10 text-md line-h-none`,
  form: 'text-right',
  selectsContainer: 'mb-10',
  select: 'cinema-card__select w-full primary-font mb-10 pl-10 text-xs',
  option: 'cinema-card__option bg-white',
  button: `cinema-card__button bg-white inline-block uppercase font-bold primary-font border-0 text-md rounded-sm`,
}

const BASE_PATH = '/cartelera'
const MOVIES_BASE_PATH = '/peliculas'
const FORM_ACTION = `${BASE_PATH}/search`

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
      const { peliculas, cines, estrenos = [] } = response

      const moviesList = Object.values(peliculas)
      const cinemasList = cines

      const { poster: { sizes: { poster = '' } = {} } = {}, name, url, body } =
        estrenos[0] || {}

      const premiereData = {
        title: name,
        img:
          poster ||
          defaultImage({
            deployment,
            contextPath,
            arcSite,
            size: 'sm',
          }),
        url,
        alt: body,
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
    const { movieSelected, cinemaSelected } = this.state

    const moviePath = movieSelected || 'peliculas'
    const cinemaPath = cinemaSelected || 'cines'

    const fullPath =
      !movieSelected && !cinemaSelected ? '' : `${moviePath}/${cinemaPath}`

    window.location.href = `${BASE_PATH}/${fullPath}`
    event.preventDefault()
  }

  render() {
    const {
      movieSelected,
      cinemaSelected,
      billboardData,
      premiereData: { alt, img, title, url },
    } = this.state

    return (
      <div className={classes.cinemaCard}>
        <article className={classes.container}>
          <span className={classes.gradient} />
          <h3 className={classes.category}>
            <a className={classes.link} href={BASE_PATH}>
              Cartelera
            </a>
          </h3>
          <figure className={classes.figure}>
            <a href={`${BASE_PATH}${MOVIES_BASE_PATH}/${url}`}>
              <img src={img} alt={alt} className={classes.image} />
            </a>
          </figure>
          <div className={classes.detail}>
            <p className={classes.premiere}>Estreno</p>
            <h2 className={classes.movieTitle}>
              <a
                className={classes.movieLink}
                href={`${BASE_PATH}${MOVIES_BASE_PATH}/${url}`}>
                {title}
              </a>
            </h2>
          </div>
        </article>
        <div className={classes.moviesList}>
          <h4 className={classes.title}>Vamos al cine</h4>
          <form
            action={FORM_ACTION}
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
