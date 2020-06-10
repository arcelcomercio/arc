/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import Content from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import { getAssetsPath } from '../../../../utilities/assets'

// TODO: este feature no puede reemplazar al real cards/cinema-billboard y que se haga solo un import de uno de los dos?

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
const FORM_ACTION = `${BASE_PATH}/search`

const CardCinemaBillboard = ({
  billboardData: { moviesList = [], cinemasList = [] } = {},
  premiereAlt,
  premiereImg,
  premiereTitle,
  premiereUrl,
}) => {
  const [movieSelected, setMovieSelected] = useState('')
  const [cinemaSelected, setCinemaSelected] = useState('')

  const handleMovieSelected = event => {
    setMovieSelected(event.target.value)
  }
  const handleCinemaSelected = event => {
    setCinemaSelected(event.target.value)
  }
  const handleSubmit = event => {
    const moviePath = movieSelected || 'peliculas'
    const cinemaPath = cinemaSelected || 'cines'

    const fullPath =
      !movieSelected && !cinemaSelected ? '' : `${moviePath}/${cinemaPath}`

    window.location.href = `${BASE_PATH}/${fullPath}`
    event.preventDefault()
  }
  return (
    <div className={classes.cinemaCard}>
      <article className={classes.container}>
        <span className={classes.gradient} />
        <h3 itemProp="name" className={classes.category}>
          <a itemProp="url" className={classes.link} href={BASE_PATH}>
            Cartelera
          </a>
        </h3>
        <figure className={classes.figure}>
          <a itemProp="url" href={`${BASE_PATH}/${premiereUrl}`}>
            <img
              src={premiereImg}
              alt={premiereAlt}
              className={classes.image}
            />
          </a>
        </figure>
        <div className={classes.detail}>
          <p itemProp="description" className={classes.premiere}>
            Estreno
          </p>
          <h2 itemProp="name" className={classes.movieTitle}>
            <a
              className={classes.movieLink}
              href={`${BASE_PATH}/${premiereUrl}`}>
              {premiereTitle}
            </a>
          </h2>
        </div>
      </article>
      <div className={classes.moviesList}>
        <h4 itemProp="name" className={classes.title}>
          Vamos al cine
        </h4>
        <form
          action={FORM_ACTION}
          method="post"
          className={classes.form}
          onSubmit={e => handleSubmit(e)}>
          <div className={classes.selectsContainer}>
            <label htmlFor="movie-select" className="font-0">
              PELICULAS
            </label>
            <select
              id="movie-select"
              name="movie"
              className={classes.select}
              value={movieSelected}
              onChange={e => handleMovieSelected(e)}>
              <option value="" defaultValue disabled className={classes.option}>
                PELÍCULAS
              </option>
              {moviesList.map(movie => (
                <option
                  value={movie.url}
                  className={classes.option}
                  key={movie.mid}>
                  {movie.title}
                </option>
              ))}
            </select>
            <label htmlFor="theater-select" className="font-0">
              CINES
            </label>
            <select
              id="theater-select"
              name="theater"
              className={classes.select}
              value={cinemaSelected}
              onChange={e => handleCinemaSelected(e)}>
              <option value="" defaultValue disabled className={classes.option}>
                CINES
              </option>
              {cinemasList.map(cinema => (
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

export default () => {
  const { arcSite, deployment, contextPath } = useFusionContext()
  return (
    <Content
      {...{
        contentService: 'cinema-billboard',
        contentConfigValues: { format: 'single' },
      }}>
      {({
        billboardData,
        premiereData: {
          alt: premiereAlt,
          img: premiereImg,
          title: premiereTitle,
          url: premiereUrl,
        } = {},
      }) => (
        <CardCinemaBillboard
          {...{
            billboardData,
            premiereAlt,
            premiereImg:
              premiereImg ||
              deployment(
                `${getAssetsPath(
                  arcSite,
                  contextPath
                )}/resources/dist/${arcSite}/images/default-md.png?d=1`
              ),
            premiereTitle,
            premiereUrl,
          }}
        />
      )}
    </Content>
  )
}
