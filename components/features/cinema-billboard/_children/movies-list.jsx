import React, { PureComponent } from 'react'
import BillboardFormat from '../../../utilities/billboard-format'
import { defaultImage } from '../../../utilities/helpers'

const classes = {
  movieList: 'movie-list pb-20 m-0 mx-auto',
  top: 'movie-list__top flex items-center justify-center flex-col pt-30 pb-30',
  cinema: 'movie-list__cinema uppercase primary-font text-lg',
  address: 'movie-list__address font-normal text-sm',
  box: 'movie-list__box p-20 border-1 border-solid',
  movieItem: 'movie-item flex flex-col',
  leftSide: 'movie-item__left flex-shrink-0 flex-grow-0 mb-10',
  imageBox: 'block w-full',
  image: 'movie-item__img w-full h-full object-cover border-1 border-solid',
  title: 'movie-item__title primary-font text-xl',
  function: 'movie-item__function font-thin text-sm',
  rightSide: 'movie-item__right mt-5',
  subtitle: 'movie-item__subtitle font-bold mb-5 text-sm',
  description: 'movie-item__description inline font-normal ml-5',
}

class StaticCinemaBillboardChildMoviesList extends PureComponent {
  constructor(props) {
    super(props)

    this.billboardFormat = new BillboardFormat()

    this.state = {
      movies: [],
      cinema: {},
    }

    const { contextPath } = props
    this.URI_BASE = `${contextPath}/cartelera`
  }

  componentDidMount() {
    const { data, cinema } = this.props
    this.billboardFormat.setData = data
    const { cinemaList } = this.billboardFormat
    const matchedCinema = cinemaList.find(itemCine => itemCine.url === cinema)
    const movies = matchedCinema.peliculas.filter((movie, index, arr) => {
      return arr.map(mapObj => mapObj.mid).indexOf(movie.mid) === index
    })

    this.setState({
      movies,
      cinema: matchedCinema,
    })
  }

  render() {
    const { movies, cinema } = this.state
    const { deployment, contextPath, arcSite } = this.props

    return (
      cinema && (
        <section className={classes.movieList}>
          <div role="heading" className={classes.top}>
            <h1 className={classes.cinema}>{cinema.nombre}</h1>
            <h2 className={classes.address}>{cinema.direccion}</h2>
          </div>
          <div role="list" className={classes.box}>
            {movies ? (
              movies.map(movie => {
                const {
                  url = 'peliculas',
                  title = '',
                  body = '',
                  pais = '',
                  director = '',
                  actores = '',
                  calificacion = '',
                  poster: { sizes = {} } = {},
                } = movie

                return (
                  <article role="listitem" className={classes.movieItem}>
                    <figure className={classes.leftSide}>
                      <a
                        href={`${this.URI_BASE}/${url}/${cinema.url}`}
                        className={classes.imageBox}>
                        <img
                          src={
                            sizes['620x387'] ||
                            defaultImage({
                              deployment,
                              contextPath,
                              arcSite,
                              size: 'sm',
                            })
                          }
                          alt={title}
                          className={classes.image}
                        />
                        <figcaption>
                          <h3 className={classes.title}>{title}</h3>
                          <p className={classes.function}>{cinema.horario}</p>
                        </figcaption>
                      </a>
                    </figure>
                    <div className={classes.rightSide}>
                      <p className={classes.subtitle}>
                        Sinopsis:
                        <p className={classes.description}>{body}</p>
                      </p>
                      <p className={classes.subtitle}>
                        País:
                        <p className={classes.description}>{pais}</p>
                      </p>
                      <p className={classes.subtitle}>
                        Director:
                        <p className={classes.description}>{director}</p>
                      </p>
                      <p className={classes.subtitle}>
                        Actores:
                        <p className={classes.description}>{actores}</p>
                      </p>
                      <p className={classes.subtitle}>
                        Calificación:
                        <p className={classes.description}>{calificacion}</p>
                      </p>
                    </div>
                  </article>
                )
              })
            ) : (
              <p className={`${classes.cinema} text-center`}>
                No hay peliculas disponibles para este cine
              </p>
            )}
          </div>
        </section>
      )
    )
  }
}

export default StaticCinemaBillboardChildMoviesList
