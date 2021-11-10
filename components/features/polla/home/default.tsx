import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

const DEFAULT_ENDPOINT =
  'https://4dtmic7lj2.execute-api.us-east-1.amazonaws.com/dev'

const ID_CONCURSO = 1

interface Props {
  customFields?: {
    block?: 'landing' | 'ranking' | 'awards'
    landingBrand?: string
    landingSubtitle?: string
    landingUrl?: string
    rankingUrl?: string
    awardsHtml?: string
    awardsUrl?: string
    serviceEndPoint?: string
  }
}

const PollaHomepage: FC<Props> = (props) => {
  const { customFields } = props
  const [list, setList] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const API_BASE = `${
    customFields?.serviceEndPoint || DEFAULT_ENDPOINT
  }/${ID_CONCURSO}/ranking`

  React.useEffect(() => {
    if (customFields?.block === 'ranking') {
      fetch(API_BASE)
        .then((res) => res.json())
        .then((res) => {
          setList(res.ranking)
          setIsLoading(false)
        })
    }
  }, [])

  return (
    <>
      {customFields?.block === 'landing' && (
        <>
          <div className="polla-home__logo-container">
            <img
              className="polla-home__logo-img"
              src="https://cdna.depor.com/resources/dist/depor/images-polla/logo.png"
              alt="Logo La Polla"
            />
            <h1 className="polla-home__logo-title">LIGA 1</h1>
            <div className="polla-home__brand-container">
              <span>Auspicia: </span>
              <img src={`${customFields.landingBrand}`} alt="Brand" />
            </div>
          </div>
          <div className="polla-home__desc-container">
            <div>
              <h2 className="polla-home__desc-title">
                ¡Juega la Polla Depor y gana increíbles premios!
              </h2>
              <p className="polla-home__desc-parag">
                {customFields.landingSubtitle}
              </p>
              <a
                href={`${customFields.landingUrl}`}
                className="polla-home__desc-link">
                ¡JUEGA!
              </a>
            </div>
            <img
              className="polla-home__desc-img"
              src="https://cdna.depor.com/resources/dist/depor/images-polla/polla-inicio/players.jpg"
              alt="Imagen de interacción"
            />
          </div>
        </>
      )}
      {customFields?.block === 'ranking' && (
        <div className="polla-home__rank-container">
          <svg
            className="polla-home__rank-img"
            id="Capa_1"
            data-name="Capa 1"
            height="180"
            width="180"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 92">
            <g id="Grupo_1172" data-name="Grupo 1172">
              <g id="Grupo_1169" data-name="Grupo 1169">
                <g id="Grupo_1162" data-name="Grupo 1162">
                  <path
                    id="Trazado_79256"
                    data-name="Trazado 79256"
                    className="polla-home__svgranking"
                    d="M54.26 31.14a.93.93 0 0 1-.4-.09L50 29l-3.86 2a.86.86 0 0 1-1.24-.91l.73-4.31-3.12-3a.88.88 0 0 1 0-1.23.89.89 0 0 1 .49-.25l4.32-.62 1.92-3.91a.9.9 0 0 1 1.24-.31.92.92 0 0 1 .31.31l1.93 3.91 4.31.62a.88.88 0 0 1 .73 1 .89.89 0 0 1-.25.48l-3.12 3 .73 4.31a.86.86 0 0 1-.34.84.93.93 0 0 1-.52.21zm-4.26-4a.79.79 0 0 1 .4.1l2.72 1.43-.52-3a.86.86 0 0 1 .25-.76L55 22.78l-3-.44a.85.85 0 0 1-.65-.48L50 19.12l-1.35 2.74a.87.87 0 0 1-.66.48l-3 .44 2.19 2.14a.84.84 0 0 1 .25.76l-.52 3 2.72-1.43a.79.79 0 0 1 .4-.1z"
                  />
                </g>
                <g id="Grupo_1163" data-name="Grupo 1163">
                  <path
                    id="Trazado_79257"
                    data-name="Trazado 79257"
                    className="polla-home__svgranking"
                    d="M50 36.74a13.17 13.17 0 0 1-13.15-13.15V14.2a.88.88 0 0 1 .87-.87h24.56a.88.88 0 0 1 .87.87v9.39A13.17 13.17 0 0 1 50 36.74zM38.58 15.06v8.53a11.42 11.42 0 1 0 22.84 0v-8.53z"
                  />
                </g>
                <g id="Grupo_1164" data-name="Grupo 1164">
                  <path
                    id="Trazado_79258"
                    data-name="Trazado 79258"
                    className="polla-home__svgranking"
                    d="M50 42a3.5 3.5 0 1 1 3.5-3.5A3.5 3.5 0 0 1 50 42zm0-5.28a1.78 1.78 0 1 0 1.78 1.78A1.78 1.78 0 0 0 50 36.72z"
                  />
                </g>
                <g id="Grupo_1165" data-name="Grupo 1165">
                  <path
                    id="Trazado_79259"
                    data-name="Trazado 79259"
                    className="polla-home__svgranking"
                    d="M56.06 55.12H43.94a.88.88 0 0 1-.85-1l1-8.58a6 6 0 0 1 11.86 0l1 8.58a.88.88 0 0 1-.21.68.87.87 0 0 1-.68.32zm-11.15-1.73h10.18l-.87-7.62a4.25 4.25 0 0 0-8.44 0z"
                  />
                </g>
                <g id="Grupo_1166" data-name="Grupo 1166">
                  <path
                    id="Trazado_79260"
                    data-name="Trazado 79260"
                    className="polla-home__svgranking"
                    d="M57.21 58.73H42.8a2.67 2.67 0 1 1 0-5.34h14.41a2.67 2.67 0 1 1 0 5.34zM42.8 55.12a.95.95 0 1 0 0 1.89h14.41a.95.95 0 1 0 0-1.89z"
                  />
                </g>
                <g id="Grupo_1167" data-name="Grupo 1167">
                  <path
                    id="Trazado_79261"
                    data-name="Trazado 79261"
                    className="polla-home__svgranking"
                    d="M37.72 26.49h-4.47a6.58 6.58 0 1 1 0-13.16h4.47a.87.87 0 0 1 .86.87v11.43a.86.86 0 0 1-.86.86zm-4.48-11.43a4.85 4.85 0 0 0-.1 9.7h3.72v-9.7z"
                  />
                </g>
                <g id="Grupo_1168" data-name="Grupo 1168">
                  <path
                    id="Trazado_79262"
                    data-name="Trazado 79262"
                    className="polla-home__svgranking"
                    d="M66.76 26.49h-4.48a.87.87 0 0 1-.86-.86V14.2a.88.88 0 0 1 .86-.87h4.48a6.58 6.58 0 0 1 0 13.16zm-3.61-1.73h3.61a4.85 4.85 0 0 0 .1-9.7h-3.71z"
                  />
                </g>
              </g>
              <g id="Grupo_1170" data-name="Grupo 1170">
                <path
                  id="Trazado_79263"
                  data-name="Trazado 79263"
                  className="polla-home__svgranking"
                  d="M13.91 69.2c2.61 2.07 5.55 2.41 7-.27.81-.18.65-.14 1.57-.37.72.54 2.07 1.6 4 2.86l-1.28.73c-3.92-1.25-6 0-6.69 1.45 2.85 1.7 5.87 1.87 7.09-1.16 1.06-.37.72-.25 1.58-.57 1.39.89 2.79 1.72 4.22 2.49l-1.24.89c-4-.93-6.07.68-6.62 2.22 3 1.51 6.16 1.2 7.05-2 .44-.2 1.14-.54 1.57-.75 1.45.77 2.9 1.49 4.37 2.15l-1.2 1c-3.89-.64-6.06 1.1-6.5 2.91 4.26 1.51 6.49-.09 7-2.67l1.53-.9 4.35 2-1.24 1.09c-3.79-.56-5.82 1.4-6.2 3.37 4 1.13 6.19-.64 6.67-3.13.5-.3.94-.55 1.58-.91 5.36 2.75 13.65 7.43 18.53 12h1.15c-5.47-5.07-13.27-9.49-18.57-12.22-.09-.7-.05-.38-.19-1.55 1.76-2 1.77-4.73-2-7.26-1.28 1.55-1.4 4.14 1.53 7l-.08 1.39c-.95-.48-.24-.14-4.42-2.09l-.26-1.51c1.56-2 1.34-4.67-1.75-6.92-1.2 1.48-1.56 4.2 1.27 6.71v1.36c-1.85-.86-2.76-1.27-4.41-2.11-.09-.64 0-.37-.2-1.45 1.64-1.89 1.49-4.53-1.27-6.81-1.07 1.16-1.94 3.89.83 6.59-.06 1 0 .75-.07 1.3q-2.14-1.12-4.25-2.41c0-.51 0-.5-.1-1.44 1.6-1.63 1.82-4-.77-6.69-1.48 1.41-1.84 4 .35 6.45-.11 1-.09.73-.15 1.27-1.2-.76-2.58-1.67-4-2.78V67.2c1.73-1.54 1.94-4.07-.2-6.55-1.18 1-2.36 3.36-.18 6.29-.18.93-.13.69-.23 1.21-1.25-.94-2.72-2.2-3.76-3.17 0-.34 0-.43.12-1.38 1.7-1.28 2.27-3.69.43-6.36-.94.63-2.77 2.82-.77 6.08-.25.88-.19.66-.32 1.15a46.1 46.1 0 0 1-3.4-3.59c.09-.5.08-.44.26-1.32 1.73-1.07 2.54-3.35 1.06-6.11-1 .52-2.94 2.48-1.36 5.79-.33.84-.25.63-.42 1.09a44.09 44.09 0 0 1-2.93-4c.1-.38.08-.31.38-1.26 1.85-.9 2.77-3 1.69-5.8-1.29.51-3 2.32-1.94 5.47-.4.77-.31.58-.52 1a40 40 0 0 1-2.38-4.36l.51-1.19c1.79-.64 3-2.5 2.27-5.45-1.78.49-3.09 2.6-2.48 5.11l-.59.9a42.73 42.73 0 0 1-1.79-4.64c.12-.21.5-.91.62-1.11 2.28-.58 3.11-2.75 2.77-5.08-1.62.27-3.15 1.92-2.92 4.72-.47.56-.47.55-.67.81a47.68 47.68 0 0 1-1.16-4.86c.33-.48.19-.28.72-1 1.76-.28 3.25-1.75 3.17-4.7-1.71.14-3.3 1.84-3.28 4.34l-.72.72a49.43 49.43 0 0 1-.55-5c.46-.56.39-.48.79-.94 1.81-.14 3.23-1.42 3.47-4.34-1 0-3.17.82-3.55 4l-.83.61c-.07-1.42-.07-3.22 0-5l.83-.85c1.69 0 3.32-1.23 3.7-4-1.27-.06-3.18.93-3.74 3.66l-.76.56c.11-1.79.27-3.37.51-5l.87-.78c2.12.07 3.38-1.59 3.84-3.72-1.25-.15-3.12.77-3.83 3.3l-.77.49c.28-1.78.61-3.45 1-5l.9-.72c1.61.11 3.29-.93 3.93-3.45-1.23-.15-3.08.7-3.93 3.13l-.76.43c.32-1.33.82-3.17 1.37-4.9l.84-.64c1.52.15 3.2-.72 4-3.2-1.3-.19-3.06.67-4 2.89l-.74.39C8.88 10.1 9.45 8.55 10 7.08l1-.61c1.48.17 3.14-.63 4-2.93-1.13-.22-3 .43-4 2.63l-.93.45V5.49A6.83 6.83 0 0 0 11 0a4.83 4.83 0 0 0-1.2 5.65c-.07.91-.05.63-.1 1.35-.53 1.32-1 2.62-1.49 4-.16-.39-.09-.21-.35-.89.76-2.38.07-4.23-.78-5-1.27 2.38-.65 4.31.6 5.24.19.78.22.92.32 1.27-.48 1.44-1 3-1.36 4.57l-.39-.66c.5-2.75-.62-4.45-1.55-5-1 2.72-.1 4.58 1.39 5.29l.4 1c-.4 1.61-.77 3.28-1.07 5l-.52-.66c.23-2.7-1-4.42-2.13-4.93-.76 2.82.29 4.69 2 5.25l.54 1c-.33 2-.5 3.51-.62 5.09L4 26.88c-.07-3-1.61-4.45-2.74-4.78-.49 3.23 1 4.84 2.65 5.13l.69.95a48.18 48.18 0 0 0-.12 5.1l-.78-.6c-.41-2.83-2-4.35-3.39-4.53-.11 2.59.91 4.82 3.33 4.9.63.66.46.49.86.89A45.42 45.42 0 0 0 5 39l-.9-.52c-.89-3.05-2.8-4.17-4.07-4.16.26 3.5 2.17 4.78 4.06 4.56.47.38.38.31 1 .78a44.13 44.13 0 0 0 1 5l-1-.38c-1.3-3-3.41-3.87-4.73-3.65.71 3.5 2.83 4.62 4.79 4l1.16.66A44.81 44.81 0 0 0 8 50.07l-1.14-.23c-1.95-3-4.26-3.37-5.38-3 1.32 3.58 3.61 4.3 5.49 3.39.65.25.54.21 1.31.48a44.9 44.9 0 0 0 2.3 4.47c-.62 0-.54 0-1.23-.05-2.26-2.61-4.71-2.81-5.93-2.13 1.39 2.68 3.81 4.19 6.09 2.57l1.43.27a42.94 42.94 0 0 0 2.86 4.1c-.4.06-.78.11-1.28.16-2.82-2.48-5.33-2-6.32-1.26 1.89 2.56 4.51 3.68 6.56 1.65l1.51.05q1.58 1.94 3.33 3.7c-.7.2-.62.18-1.29.35-2.92-1.92-5.46-1.53-6.57-.31 2.13 2.28 5.11 3.08 6.87.68l1.56-.17c1.47 1.42 2.43 2.22 3.71 3.27l-1.29.55c-3.48-1.69-5.85-.61-6.68.59z"
                />
                <path
                  id="Trazado_79264"
                  data-name="Trazado 79264"
                  className="polla-home__svgranking"
                  d="M94.86 44.65c2 .56 4.08-.56 4.79-4.06-1.32-.22-3.43.68-4.73 3.65l-1 .39a44.13 44.13 0 0 0 1-5c.63-.47.54-.41 1-.79 1.89.23 3.8-1.06 4.06-4.55-1.27 0-3.18 1.11-4.07 4.16L95 39a45.24 45.24 0 0 0 .43-5.06l.86-.89c2.42-.08 3.44-2.31 3.33-4.91-1.35.19-3 1.7-3.39 4.54-.3.24-.57.44-.78.59a48.24 48.24 0 0 0-.12-5.1l.69-.94c1.68-.3 3.14-1.9 2.65-5.13-1.13.32-2.67 1.81-2.74 4.78l-.65.65c-.12-1.58-.29-3.08-.62-5.09.23-.41.11-.21.54-1 1.72-.56 2.77-2.43 2-5.25-1.17.51-2.36 2.23-2.13 4.92l-.52.67c-.3-1.76-.67-3.43-1.07-5l.4-1c1.49-.71 2.42-2.57 1.39-5.29-.93.55-2 2.25-1.55 5l-.39.66c-.4-1.55-.88-3.14-1.36-4.57.1-.36.13-.49.32-1.27 1.25-.93 1.87-2.86.6-5.25-.85.76-1.54 2.61-.78 5-.26.68-.19.5-.35.89-.47-1.39-1-2.69-1.49-4 0-.71 0-.43-.1-1.34A4.83 4.83 0 0 0 89 0a6.81 6.81 0 0 0 1 5.48v1.14l-1-.45C88 4 86.15 3.31 85 3.54c.89 2.3 2.55 3.1 4 2.92l.91.61c.59 1.48 1.16 3 1.74 4.8l-.65-.39c-.91-2.22-2.67-3.09-4-2.9.8 2.49 2.48 3.35 4 3.21l.89.66c.55 1.73 1.05 3.57 1.37 4.9l-.76-.43c-.85-2.43-2.69-3.28-3.93-3.13.64 2.52 2.32 3.56 3.94 3.45l.89.72c.35 1.54.69 3.2 1 5l-.77-.5c-.7-2.53-2.55-3.49-3.85-3.38.46 2.13 1.72 3.79 3.84 3.72l.87.78c.24 1.66.41 3.24.51 5l-.76-.55c-.56-2.74-2.47-3.73-3.73-3.67.37 2.78 2 4 3.69 4l.83.85c.09 1.82.08 3.62 0 5l-.75-.63c-.37-3.17-2.57-4-3.55-4 .24 2.93 1.66 4.21 3.48 4.35.39.45.32.37.78.93a46.42 46.42 0 0 1-.55 5l-.72-.72c0-2.5-1.57-4.2-3.28-4.34-.08 3 1.42 4.42 3.17 4.7.53.74.39.54.72 1a47.68 47.68 0 0 1-1.16 4.86l-.67-.81c.23-2.8-1.3-4.44-2.92-4.72-.34 2.33.49 4.51 2.77 5.08.12.2.5.9.62 1.11a40.76 40.76 0 0 1-1.79 4.64l-.59-.9a4.08 4.08 0 0 0-2.48-5.11c-.73 2.94.48 4.81 2.27 5.45l.51 1.19a40 40 0 0 1-2.38 4.36l-.52-1c1.07-3.15-.64-5-1.94-5.47-1.08 2.77-.16 4.91 1.69 5.8.3 1 .28.88.38 1.26a44 44 0 0 1-2.92 4l-.43-1.08c1.58-3.32-.36-5.28-1.36-5.8-1.48 2.76-.67 5 1.06 6.11.18.88.17.83.26 1.32a44.38 44.38 0 0 1-3.4 3.59c-.13-.49-.07-.27-.32-1.15 2-3.26.17-5.45-.77-6.07-1.84 2.67-1.27 5.08.43 6.35.09.95.1 1 .12 1.38-1 1-2.51 2.23-3.76 3.17-.09-.52 0-.28-.23-1.2 2.18-2.94 1-5.34-.18-6.3-2.14 2.48-1.93 5-.2 6.55v1.41c-1.46 1.12-2.84 2-4 2.78-.06-.54 0-.3-.15-1.26 2.2-2.47 1.83-5 .35-6.46-2.59 2.72-2.37 5.06-.77 6.69 0 1 0 .93-.09 1.44-1.41.86-2.82 1.66-4.26 2.41 0-.55 0-.3-.07-1.3 2.77-2.7 1.9-5.43.84-6.59-2.77 2.28-2.92 4.92-1.29 6.81-.14 1.09-.1.81-.2 1.45-1.65.85-2.55 1.26-4.4 2.12v-1.28c2.83-2.51 2.47-5.23 1.26-6.71-3.08 2.25-3.3 5-1.74 6.92l-.26 1.51c-4.19 2-3.48 1.61-4.42 2.09L57 77.75c2.94-2.89 2.82-5.48 1.53-7-3.78 2.53-3.77 5.31-2 7.26-.15 1.18-.11.85-.19 1.55-5.31 2.73-13.1 7.15-18.58 12.23h1.13c4.89-4.56 13.17-9.24 18.54-12l1.58.91c.47 2.49 2.71 4.26 6.66 3.13-.37-2-2.4-3.93-6.19-3.37l-1.24-1.08 4.35-2.06c.85.51.53.32 1.53.9.48 2.58 2.71 4.18 7 2.67-.44-1.81-2.61-3.55-6.5-2.91l-1.2-1q2.19-1 4.37-2.15l1.56.75c.9 3.15 4.06 3.46 7.06 2-.55-1.53-2.63-3.15-6.62-2.22l-1.24-.89q2.13-1.15 4.21-2.49l1.58.58c1.22 3 4.25 2.85 7.09 1.15-.69-1.4-2.76-2.7-6.68-1.45l-1.28-.73c1.94-1.26 3.29-2.31 4-2.86.92.23.76.2 1.58.37 1.48 2.68 4.43 2.34 7 .27-.83-1.23-3.2-2.28-6.69-.6l-1.29-.54c1.29-1.06 2.25-1.86 3.71-3.28.82.1.49.06 1.56.17 1.76 2.4 4.74 1.61 6.87-.68-1.1-1.22-3.65-1.61-6.57.32l-1.29-.36a48.77 48.77 0 0 0 3.33-3.7l1.51-.05c2 2 4.67.91 6.56-1.64-1-.79-3.49-1.23-6.32 1.26l-1.28-.16a40.2 40.2 0 0 0 2.86-4.11l1.43-.27c2.28 1.62 4.71.11 6.09-2.57-1.22-.67-3.66-.47-5.91 2.16-.69 0-.61 0-1.23.05a44.9 44.9 0 0 0 2.3-4.47c.77-.27.67-.23 1.31-.48 1.89.91 4.17.19 5.49-3.39-1.12-.39-3.43-.06-5.38 3l-1.11.1a46.24 46.24 0 0 0 1.67-4.76c.59-.31.33-.18 1.19-.66z"
                />
              </g>
            </g>
          </svg>
          <div className="polla-home__rank-table">
            <h3 className="polla-home__rank-title">RANKING</h3>
            {isLoading ? (
              <div className="polla-score__spinner ranking" />
            ) : null}
            {list &&
              list.slice(0, 10).map((item, i) => (
                <div className="polla-home__rank-item">
                  <div className="polla-home__rank-first">{i + 1}.</div>
                  <div className="polla-home__rank-second">{item.nombre}</div>
                  <div className="polla-home__rank-third">{item.puntaje}</div>
                </div>
              ))}
            <a
              className="polla-home__rank-link"
              href={`${customFields.rankingUrl}`}>
              VER TABLA COMPLETA
            </a>
          </div>
        </div>
      )}
      {customFields?.block === 'awards' && (
        <div className="polla-home__aw">
          <h2 className="polla-home__aw-title">
            ¡Estos son algunos de los premios!
          </h2>
          {customFields.awardsHtml && (
            <div
              dangerouslySetInnerHTML={{ __html: customFields.awardsHtml }}
            />
          )}
          <a href={`${customFields.awardsUrl}`} className="polla-home__aw-link">
            VER MÁS
          </a>
        </div>
      )}
    </>
  )
}

PollaHomepage.label = 'La Polla - Homepage'

PollaHomepage.propTypes = {
  customFields: PropTypes.shape({
    block: PropTypes.oneOf(['landing', 'ranking', 'awards']).tag({
      name: 'Bloque',
      labels: {
        landing: 'Landing',
        ranking: 'Ranking',
        awards: 'Premios',
      },
      defaultValue: 'landing',
    }),
    landingBrand: PropTypes.string.tag({
      name: 'URL Brand',
      group: 'landing',
    }),
    landingSubtitle: PropTypes.string.tag({
      name: 'Subtitulo',
      group: 'landing',
    }),
    landingUrl: PropTypes.string.tag({
      name: 'URL del boton ¡Juega!',
      defaultValue: '/',
      group: 'landing',
    }),
    serviceEndPoint: PropTypes.string.tag({
      name: 'URL del servicio',
      description:
        'Por defecto la URL es https://4dtmic7lj2.execute-api.us-east-1.amazonaws.com/dev',
      group: 'ranking',
    }),
    rankingUrl: PropTypes.string.tag({
      name: 'URL del boton "VER TABLA COMPLETA"',
      defaultValue: '/',
      group: 'ranking',
    }),
    awardsHtml: PropTypes.richtext.tag({
      name: 'HTML libre',
      defaultValue: '',
      group: 'awards',
    }),
    awardsUrl: PropTypes.string.tag({
      name: 'URL del boton "VER MÁS"',
      defaultValue: '/',
      group: 'awards',
    }),
  }),
}

export default PollaHomepage
