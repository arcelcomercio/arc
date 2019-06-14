import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import { defaultImage } from '../../../utilities/helpers'

const classes = {
  cinemaCard: 'cinema-card p-20 row-1',
  container: 'position-relative',
  gradient: 'cinema-card__gradient w-full position-absolute bottom-0 left-0',
  category: 'cinema-card__category uppercase primary-font mb-0 pb-15 text-xl',
  link: 'cinema-card__link',
  figure: 'cinema-card__figure overflow-hidden',
  image: 'w-full h-full object-cover',
  detail:
    'cinema-card__detail w-full position-absolute bottom-0 pr-15 pl-15 pb-10',
  premiere: 'cinema-card__premiere text-xl',
  movieTitle: 'cinema-card__p-title overflow-hidden text-xl',
  movieLink: 'cinema-card__p-link font-normal',
  moviesList: 'cinema-card__movies-list p-10',
  title: 'cinema-card__title uppercase primary-font font-normal mb-10 text-md',
  form: 'text-right',
  selectsContainer: 'mb-10',
  select: 'cinema-card__select w-full primary-font mb-5 pl-10 text-xs',
  option: 'cinema-card__option',
  button:
    'cinema-card__button inline-b uppercase font-bold primary-font border-0 text-xs',
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
