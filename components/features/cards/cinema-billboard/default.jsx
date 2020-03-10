/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import { getAssetsPath } from '../../../utilities/constants'

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

  const cinemaScript =
    '"use strict";setTimeout(function(){document.getElementById("cinema-form").addEventListener("submit",function(){var e=document.getElementById("movie-select").value,t=document.getElementById("theater-select").value,n=t||"cines",c=e||t?"".concat(e||"peliculas","/").concat(n):"";window.location.href="".concat("/cartelera","/").concat(c,"/"),event.preventDefault()})},0);'

  return (
    <div className="cinema-card bg-white">
      <article className="position-relative">
        <h3 className="cinema-card__category uppercase primary-font mb-0 pb-15 text-xl line-h-none">
          <a className="cinema-card__link text-gray-300" href={`${BASE_PATH}/`}>
            Cartelera
          </a>
        </h3>
        <figure className="cinema-card__figure overflow-hidden">
          <a href={`${BASE_PATH}/${url}/`}>
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
          id="cinema-form"
          action={FORM_ACTION}
          method="post"
          className="text-right mb-10">
          <label htmlFor="movie-select" className="font-0">
            PELICULAS
          </label>
          <select
            id="movie-select"
            name="movie"
            className="cinema-card__select w-full primary-font mb-10 pl-10 text-xs"
            value="">
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

          <label htmlFor="theater-select" className="font-0">
            CINES
          </label>
          <select
            id="theater-select"
            name="theater"
            className="cinema-card__select w-full primary-font mb-10 pl-10 text-xs"
            value="">
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

          <button
            type="submit"
            className="cinema-card__button bg-white inline-block uppercase font-bold primary-font border-0 text-md rounded-sm">
            Buscar
          </button>
        </form>
      </div>
      <script dangerouslySetInnerHTML={{ __html: cinemaScript }}></script>
    </div>
  )
}

CardCinemaBillboard.label = 'Mini-Cartelera'
CardCinemaBillboard.static = true

export default CardCinemaBillboard
