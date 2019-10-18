import React, { PureComponent } from 'react'
import BillboardFormat from '../../../utilities/billboard-format'
import { defaultImage } from '../../../utilities/helpers'

const classes = {
  container: 'movie-details flex flex-col pr-20 pl-20 bg-gray-300',
  imgBox: 'movie-details__box-img position-relative w-full m-0 mx-auto',
  img: 'movie-details__img w-full h-full object-cover',
  iconBox:
    'movie-details__box-icon position-absolute flex items-center justify-center rounded',
  icon:
    'position-absolute text-center multimedia__icon mx-auto  text-black-100 icon-video',
  details:
    'movie-details__detail w-full flex flex-col mt-40 mb-40 mx-auto pt-0 pr-20 pb-20 pl-20',
  leftSide: 'movie-details__left w-full md:flex-shrink-0',
  title: 'movie-details__title mb-20 title-md text-white md:mb-30',
  where: 'movie-details__where uppercase mb-15 text-sm text-white line-h-md',
  hours:
    'movie-details__hours overflow-y-auto h-auto pr-30 border-r-1 border-solid border-white',
  item: 'mb-20',
  cinema: 'movie-details__cinema block font-bold text-sm text-white line-h-md',
  text: 'movie-details__text font-thin text-sm line-h-md',
  more:
    'movie-details__more flex items-center justify-center pt-15 pb-15 pr-30 pl-30 mt-20 mx-auto border-1 border-solid border-gray md:mt-20 md:mb-0 md:ml-0 md:mr-0',
  button: 'movie-details__btn text-sm text-white',
  rightSide: 'movie-details__right pt-20 pb-20 md:p-20',
  name: 'movie-details__name font-bold mb-15 text-sm text-white line-h-md',
  value: 'movie-details__value font-normal',
}

const URI_BASE = '/cartelera'
const MOVIES_BASE = '/peliculas'
const MOVIE_IMG_SIZE_SM = '367x176'
const MOVIE_IMG_SIZE_MD = '620x387'

const styleIcon = { fontSize: 70, top: 0, left: 0 }
class StaticCinemaBillboardChildMoviesDetails extends PureComponent {
  constructor(props) {
    super(props)

    this.billboardFormat = new BillboardFormat()

    this.state = {
      movie: {},
      cinemas: [],
    }
  }

  componentDidMount() {
    const { data, movie, cinema } = this.props
    this.billboardFormat.setData = data
    const { moviesList } = this.billboardFormat
    const matchedMovie =
      moviesList.find(singleMovie => singleMovie.url === movie) || {}
    if (cinema === 'cines') {
      const cines = matchedMovie.cines.filter((dato, index, arr) => {
        return arr.map(mapObj => mapObj.cid).indexOf(dato.cid) === index
      })
      this.setState({ cinemas: cines })
    } else {
      const filteredCinemas = matchedMovie.cines.find(
        itemCine => itemCine.url === cinema
      )
      const orderedCinemas = [{ ...filteredCinemas }]
      this.setState({ cinemas: orderedCinemas })
    }

    this.setState({
      movie: matchedMovie,
    })
  }

  setDefault(size) {
    const { deployment, contextPath, arcSite } = this.props
    return defaultImage({ deployment, contextPath, arcSite, size })
  }

  render() {
    const { cinemas, movie } = this.state
    const {
      title = '',
      body = '',
      pais = '',
      director = '',
      actores = '',
      duracion = '',
      calificacion = '',
      poster: { sizes = {} } = {},
      portada_e: { description = '' } = {},
    } = movie

    return (
      movie && (
        <article className={classes.container}>
          <figure className={classes.imgBox}>
            <a target="_BLANK" rel="noopener noreferrer" href={description}>
              <picture>
                <source
                  srcSet={sizes[MOVIE_IMG_SIZE_SM] || this.setDefault('sm')}
                  media="(max-width: 367px)"
                />
                <img
                  src={sizes[MOVIE_IMG_SIZE_MD] || this.setDefault('lg')}
                  alt={title}
                  className={classes.img}
                />
              </picture>
            </a>
            <div className={classes.iconBox}>
              <span className={classes.icon} style={styleIcon} />
            </div>
          </figure>
          <div className={classes.details}>
            <div className={classes.leftSide}>
              <h2 className={classes.title}>{title}</h2>
              <p className={classes.where}>Dónde Verla</p>
              <div role="list" className={classes.hours}>
                {cinemas &&
                  cinemas.map(cinema => {
                    return (
                      <address role="listitem" className={classes.item}>
                        <a
                          href={`${URI_BASE}${MOVIES_BASE}/${cinema.url}`}
                          className={classes.cinema}>
                          {cinema.nombre}
                        </a>
                        <p className={classes.text}>{cinema.direccion}</p>
                        {/* Este <p> debería ser <time> pero cada dato interno debe ser independiente */}
                        <p className={classes.text}>{cinema.horario}</p>
                      </address>
                    )
                  })}
              </div>
              <a href={URI_BASE} className={classes.more}>
                <p className={classes.button}>Regresar</p>
              </a>
            </div>
            <div className={classes.rightSide}>
              <p className={`${classes.name} ${classes.name}--sinopsis`}>
                Sinopsis:
                <br />
                <p className={classes.value}>{body}</p>
              </p>
              <p className={classes.name}>
                País:
                <br />
                <p className={classes.value}>{pais}</p>
              </p>
              <p className={classes.name}>
                Director:
                <br />
                <p className={classes.value}>{director}</p>
              </p>
              <p className={classes.name}>
                Actores:
                <br />
                <p className={classes.value}>{actores}</p>
              </p>
              <p className={classes.name}>
                Duración:
                <br />
                <p className={classes.value}>{duracion}</p>
              </p>
              <p className={classes.name}>
                Calificación:
                <br />
                <p className={classes.value}>{calificacion}</p>
              </p>
            </div>
          </div>
        </article>
      )
    )
  }
}

export default StaticCinemaBillboardChildMoviesDetails
