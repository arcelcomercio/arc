import React, { useState } from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
// import { defaultImage } from '../../../utilities/helpers'
import { getAssetsPath } from '../../../utilities/constants'

// Se evita usar funciones de helpers debido a que este feature no usa static true
// TODO: Refactorizar para poder usar static true
const defaultImage = ({ deployment, contextPath, arcSite, size = 'lg' }) => {
  if (size !== 'lg' && size !== 'md' && size !== 'sm') return ''

  return deployment(
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/default-${size}.png`
  )
}

const BASE_PATH = '/cartelera'
// const MOVIES_BASE_PATH = '/peliculas'
const FORM_ACTION = `${BASE_PATH}/search`

const CardCinemaBillboard = () => {
  const { arcSite, deployment, contextPath, isAdmin } = useFusionContext()

  // TODO: verificar si funciona asi o es necesario usar useRef()
  const [movieSelected, setMovieSelected] = useState('')
  const [cinemaSelected, setCinemaSelected] = useState('')

  const data =
    useContent({
      source: 'cinema-billboard',
      query: { format: 'single' },
      // filter: schema,
    }) || {}

  const {
    billboardData: { moviesList = [], cinemasList = [] } = {},
    premiereData: { alt, img: rawImg, title, url } = {},
  } = data

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

  const img =
    rawImg ||
    defaultImage({
      deployment,
      contextPath,
      arcSite,
      size: 'sm',
    })

  const lazyDefault = defaultImage({
    deployment,
    contextPath,
    arcSite,
    size: 'sm',
  })

  return (
    <div className="cinema-card bg-white">
      <article className="position-relative">
        <span className="cinema-card__gradient w-full position-absolute bottom-0 left-0" />
        <h3 className="cinema-card__category uppercase primary-font mb-0 pb-15 text-xl line-h-none">
          <a className="cinema-card__link text-gray-300" href={`${BASE_PATH}/`}>
            Cartelera
          </a>
        </h3>
        <figure className="cinema-card__figure overflow-hidden">
          <a href={`${BASE_PATH}/${url}`}>
            <img
              src={isAdmin ? img : lazyDefault}
              data-src={img}
              alt={alt}
              className={`${isAdmin ? '' : 'lazy'} w-full h-full object-cover`}
            />
          </a>
        </figure>
        <div className="cinema-card__detail w-full position-absolute bottom-0 pt-15 pb-15 pl-20 pr-20">
          <p className="cinema-card__premiere text-xl line-h-xs font-bold">
            Estreno
          </p>
          <h2 className="cinema-card__p-title overflow-hidden title-xs text-white">
            <a
              className="cinema-card__p-link font-bold text-white line-h-xs"
              href={`${BASE_PATH}/${url}/`}>
              {title}
            </a>
          </h2>
        </div>
      </article>
      <div className="cinema-card__movies-list p-10">
        <h4 className="cinema-card__title uppercase primary-font font-bold pt-5 pb-15 pl-10 pr-10 text-md line-h-none">
          Vamos al cine
        </h4>
        <form
          action={FORM_ACTION}
          method="post"
          className="text-right"
          onSubmit={e => handleSubmit(e)}>
          <div className="mb-10">
            <select
              name="movie"
              className="cinema-card__select w-full primary-font mb-10 pl-10 text-xs"
              value={movieSelected}
              onChange={e => handleMovieSelected(e)}>
              <option
                value=""
                defaultValue
                disabled
                className="cinema-card__option bg-white">
                PELÍCULAS
              </option>
              {moviesList.map(movie => (
                <option
                  value={movie.url}
                  className="cinema-card__option bg-white"
                  key={movie.mid}>
                  {movie.title}
                </option>
              ))}
            </select>
            <select
              name="theater"
              className="cinema-card__select w-full primary-font mb-10 pl-10 text-xs"
              value={cinemaSelected}
              onChange={e => handleCinemaSelected(e)}>
              <option
                value=""
                defaultValue
                disabled
                className="cinema-card__option bg-white">
                CINES
              </option>
              {cinemasList.map(cinema => (
                <option
                  value={cinema.url}
                  className="cinema-card__option bg-white"
                  key={cinema.cid}>
                  {cinema.nombre}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="cinema-card__button bg-white inline-block uppercase font-bold primary-font border-0 text-md rounded-sm">
            Buscar
          </button>
        </form>
      </div>
    </div>
  )
}

CardCinemaBillboard.label = 'Mini-Cartelera'

export default CardCinemaBillboard
