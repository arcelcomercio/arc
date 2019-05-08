import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import { ResizeImageUrl } from '../../../utilities/helpers'

// TODO: Fix classes
const classes = {
  cardcinema: 'card-cinema',
  pdnnormal: 'padding-normal',
  rown1: 'row-1',
  positionrelative: 'position-relative',
  cinemagradient: 'card-cinema__gradient',
  fullwith: 'full-width',
  cinemacategory: 'card-cinema__category',
  cinemalink: 'card-cinema__link',
  cinemafigure: 'card-cinema__figure',
  cinemaimg: 'card-cinema__img',
  cinemadetail: 'card-cinema__detail',
  cinemapremiere: 'card-cinema__premiere',
  cinemaptitle: 'card-cinema__p-title',
  movielist: 'card-cinema__movies-list',
  title: 'card-cinema__title',
  plink: 'card-cinema__p-link',
  cinemaform: 'card-cinema__form',
  selectcontainer: 'card-cinema__selects-container',
  select: 'card-cinema__select',
  option: 'card-cinema__option',
  button: 'card-cinema__button',
}

@Consumer
class CinemaBillboardCard extends PureComponent {
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
      <div
        className={`${classes.cardcinema} ${classes.pdnnormal} ${
          classes.rown1
        }`}>
        <article className={classes.positionrelative}>
          <span className={`${classes.cinemagradient} ${classes.fullwith}`} />
          <h3 className={classes.cinemacategory}>
            <a
              className={classes.cinemalink}
              href={`${contextPath}/cartelera?_website=${arcSite}`}>
              Cartelera
            </a>
          </h3>
          <figure className={classes.cinemafigure}>
            <a
              href={`${contextPath}/cartelera/peliculas/${
                premiereData.url
              }?_website=${arcSite}`}>
              <img
                src={premiereData.img}
                alt={premiereData.alt}
                className={`${classes.fullwith} ${classes.cinemaimg}`}
              />
            </a>
          </figure>
          <div className={`${classes.cinemadetail} ${classes.fullwith}`}>
            <span className={classes.cinemapremiere}>Estreno</span>
            <h2 className={classes.cinemaptitle}>
              <a
                className={classes.plink}
                href={`${contextPath}/cartelera/peliculas/${
                  premiereData.url
                }?_website=${arcSite}`}>
                Luchando con mi familia
              </a>
            </h2>
          </div>
        </article>
        <div className={classes.movielist}>
          <h4 className={classes.title}>Vamos al cine</h4>
          <form
            action="/cartelera/search"
            method="post"
            className={classes.cinemaform}
            onSubmit={e => this.handleSubmit(e)}>
            <div className={classes.selectcontainer}>
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

CinemaBillboardCard.label = 'Cartelera'

export default CinemaBillboardCard
