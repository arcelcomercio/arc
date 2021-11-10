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
    terminosUrl?: string
    rankingUrl?: string
    awards1Image?: string
    awards1Title?: string
    awards2Image?: string
    awards2Title?: string
    awards3Image?: string
    awards3Title?: string
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
              <div className="polla-home__desc-terminos">
                ver los{' '}
                <a
                  className="polla-home__desc-terminos__link"
                  href={customFields.terminosUrl}>
                  Términos y Condiciones
                </a>
              </div>
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
            viewBox="0 0 180 166"
            {...props}>
            <defs>
              <style>{'.cls-1{fill:#83f73d}'}</style>
            </defs>
            <g id="Copa">
              <g id="Grupo_1169" data-name="Grupo 1169">
                <g id="Grupo_1162" data-name="Grupo 1162">
                  <path
                    id="Trazado_79256"
                    data-name="Trazado 79256"
                    className="cls-1"
                    d="M97.67 56.47a1.65 1.65 0 0 1-.67-.17l-7-3.66-6.94 3.66a1.54 1.54 0 0 1-2.24-1.63l1.32-7.75-5.62-5.47a1.55 1.55 0 0 1 0-2.21 1.52 1.52 0 0 1 .86-.44l7.78-1.12 3.47-7a1.61 1.61 0 0 1 2.22-.55 1.55 1.55 0 0 1 .56.55l3.48 7.05 7.76 1.12a1.55 1.55 0 0 1 1.3 1.79 1.49 1.49 0 0 1-.44.86l-5.61 5.47 1.3 7.75a1.51 1.51 0 0 1-.61 1.51 1.54 1.54 0 0 1-.92.24ZM90 49.34a1.51 1.51 0 0 1 .72.18l4.89 2.57-.92-5.45a1.53 1.53 0 0 1 .44-1.37l3.94-3.85-5.45-.8a1.56 1.56 0 0 1-1.18-.85l-2.44-5-2.44 5a1.53 1.53 0 0 1-1.17.85l-5.47.8 4 3.85a1.59 1.59 0 0 1 .45 1.37l-.94 5.45 4.88-2.57a1.58 1.58 0 0 1 .73-.18Z"
                  />
                </g>
                <g id="Grupo_1163" data-name="Grupo 1163">
                  <path
                    id="Trazado_79257"
                    data-name="Trazado 79257"
                    className="cls-1"
                    d="M90 66.55a23.7 23.7 0 0 1-23.66-23.67V26a1.55 1.55 0 0 1 1.56-1.55h44.21a1.55 1.55 0 0 1 1.56 1.55v16.88A23.71 23.71 0 0 1 90 66.55Zm-20.56-39v15.33a20.56 20.56 0 0 0 41.12 0V27.53Z"
                  />
                </g>
                <g id="Grupo_1164" data-name="Grupo 1164">
                  <path
                    id="Trazado_79258"
                    data-name="Trazado 79258"
                    className="cls-1"
                    d="M90 76a6.31 6.31 0 1 1 6.3-6.31A6.31 6.31 0 0 1 90 76Zm0-9.52a3.21 3.21 0 1 0 3.21 3.21A3.21 3.21 0 0 0 90 66.51Z"
                  />
                </g>
                <g id="Grupo_1165" data-name="Grupo 1165">
                  <path
                    id="Trazado_79259"
                    data-name="Trazado 79259"
                    className="cls-1"
                    d="M100.91 99.63H79.1a1.56 1.56 0 0 1-1.54-1.73l1.77-15.45a10.75 10.75 0 0 1 21.35 0l1.76 15.45a1.57 1.57 0 0 1-.38 1.21 1.53 1.53 0 0 1-1.15.52Zm-20.06-3.11h18.31L97.6 82.81a7.64 7.64 0 0 0-15.19 0Z"
                  />
                </g>
                <g id="Grupo_1166" data-name="Grupo 1166">
                  <path
                    id="Trazado_79260"
                    data-name="Trazado 79260"
                    className="cls-1"
                    d="M103 106.14H77a4.81 4.81 0 0 1 0-9.62h26a4.81 4.81 0 0 1 0 9.62Zm-26-6.51a1.71 1.71 0 1 0 0 3.37h26a1.71 1.71 0 1 0 0-3.41Z"
                  />
                </g>
                <g id="Grupo_1167" data-name="Grupo 1167">
                  <path
                    id="Trazado_79261"
                    data-name="Trazado 79261"
                    className="cls-1"
                    d="M67.9 48.1h-8.06a11.84 11.84 0 0 1 0-23.68h8.06A1.55 1.55 0 0 1 69.44 26v20.55a1.56 1.56 0 0 1-1.54 1.55Zm-8.06-20.57A8.73 8.73 0 1 0 59.65 45h6.69V27.53Z"
                  />
                </g>
                <g id="Grupo_1168" data-name="Grupo 1168">
                  <path
                    id="Trazado_79262"
                    data-name="Trazado 79262"
                    className="cls-1"
                    d="M120.17 48.1h-8.06a1.56 1.56 0 0 1-1.55-1.55V26a1.55 1.55 0 0 1 1.55-1.55h8a11.84 11.84 0 1 1 0 23.68Zm-6.5-3.1h6.5a8.73 8.73 0 1 0 .18-17.46h-6.68Z"
                  />
                </g>
              </g>
              <g id="Grupo_1170" data-name="Grupo 1170">
                <path
                  id="Trazado_79263"
                  data-name="Trazado 79263"
                  className="cls-1"
                  d="M25 125c4.7 3.72 10 4.34 12.68-.48 1.46-.32 1.18-.26 2.83-.68 1.29 1 3.72 2.9 7.21 5.16-1.21.7-.74.43-2.3 1.31-7.06-2.25-10.79.09-12 2.6 5.12 3.07 10.57 3.38 12.77-2.07l2.84-1q3.73 2.39 7.58 4.48c-1.19.87-.75.55-2.23 1.6-7.18-1.68-10.93 1.23-11.91 4 5.39 2.71 11.09 2.16 12.7-3.51.77-.37 2.05-1 2.81-1.35q3.91 2.09 7.86 3.87c-1.18 1-.72.64-2.15 1.87-7-1.16-10.9 2-11.7 5.24 7.67 2.72 11.69-.16 12.55-4.81 1.8-1.05 1.22-.71 2.74-1.62l7.85 3.7-2.24 2c-6.82-1-10.48 2.52-11.15 6.07 7.1 2 11.14-1.16 12-5.64.9-.54 1.69-1 2.84-1.64 9.66 4.94 24.57 13.38 33.36 21.57h2c-9.86-9.13-23.89-17.1-33.44-22l-.33-2.79c3.16-3.52 3.18-8.52-3.64-13.08-2.31 2.79-2.52 7.46 2.76 12.66l-.16 2.51c-1.7-.87-.42-.26-8-3.78l-.47-2.71c2.81-3.51 2.41-8.4-3.14-12.46-2.18 2.66-2.82 7.57 2.27 12.09v2.45c-3.32-1.55-4.95-2.28-7.92-3.8-.17-1.16-.1-.66-.36-2.62 2.94-3.39 2.67-8.15-2.3-12.26-1.91 2.09-3.48 7 1.5 11.87-.11 1.8-.08 1.34-.13 2.35q-3.86-2-7.66-4.35c-.07-.92-.07-.89-.17-2.59 2.88-2.94 3.27-7.15-1.38-12-2.67 2.54-3.32 7.19.63 11.63-.21 1.73-.16 1.3-.27 2.27-2.16-1.36-4.65-3-7.27-5v-2.55c3.1-2.76 3.49-7.33-.36-11.79-2.12 1.72-4.25 6-.33 11.33-.32 1.66-.24 1.23-.41 2.17-2.25-1.7-4.9-4-6.78-5.7 0-.62.06-.78.23-2.49 3.06-2.3 4.08-6.63.76-11.44-1.69 1.12-5 5.07-1.38 10.93-.45 1.59-.34 1.19-.58 2.07a82.73 82.73 0 0 1-6.05-6.59c.15-.9.14-.8.46-2.39 3.11-1.91 4.58-6 1.91-11-1.8.94-5.3 4.48-2.45 10.44-.59 1.5-.45 1.13-.76 2a80.31 80.31 0 0 1-5.27-7.19c.18-.68.15-.55.69-2.27 3.33-1.62 5-5.45 3-10.45-2.33.92-5.41 4.18-3.5 9.85-.72 1.4-.55 1-.92 1.8a71 71 0 0 1-4.29-7.85c.41-1 .23-.56.92-2.13 3.22-1.16 5.4-4.51 4.09-9.82-3.2.88-5.58 4.68-4.47 9.2-.84 1.27-.64 1-1.07 1.63a76.36 76.36 0 0 1-3.21-8.37c.21-.38.89-1.63 1.11-2 4.1-1 5.59-4.94 5-9.14-2.92.49-5.67 3.47-5.26 8.5-.84 1-.84 1-1.2 1.45a79 79 0 0 1-2.09-8.75c.6-.85.34-.49 1.3-1.83 3.15-.49 5.84-3.14 5.7-8.46-3.08.25-5.94 3.32-5.91 7.81l-1.29 1.3a87.76 87.76 0 0 1-1-9c.83-1 .71-.87 1.42-1.68 3.27-.26 5.82-2.56 6.26-7.82-1.73 0-5.73 1.45-6.36 7.17-1.09.91-.83.69-1.35 1.14-.13-2.56-.14-5.8 0-9.08.44-.45.85-.88 1.5-1.53 3.05-.05 6-2.21 6.65-7.22-2.28-.1-5.72 1.67-6.72 6.6-1.14.82-.86.62-1.37 1 .19-3.23.49-6.07.92-9.06l1.56-1.4c3.82.12 6.09-2.86 6.92-6.69-2.34-.2-5.67 1.52-6.94 6.08l-1.38.89c.49-3.22 1.1-6.21 1.73-9 .61-.5 1-.86 1.61-1.3 2.91.2 5.93-1.68 7.08-6.21-2.22-.27-5.54 1.26-7.07 5.63l-1.37.78c.58-2.4 1.48-5.7 2.46-8.83l1.61-1.18c2.73.26 5.75-1.29 7.19-5.77-2.33-.34-5.5 1.22-7.15 5.21l-1.32.7c1-3.19 2.07-6 3.13-8.63l1.63-1.1c2.66.31 5.66-1.11 7.27-5.27-2-.4-5.33.78-7.2 4.74l-1.68.81c0-.72 0-1.32-.06-2A12.26 12.26 0 0 0 19.75.42c-3.24 3.35-3.59 7.14-2.12 10.16-.13 1.65-.09 1.14-.18 2.43-1 2.38-1.83 4.72-2.68 7.21-.28-.7-.16-.39-.63-1.6 1.37-4.29.14-7.63-1.4-9-2.28 4.3-1.18 7.77 1.08 9.44.34 1.41.4 1.65.57 2.29-.86 2.59-1.71 5.45-2.44 8.23l-.7-1.19c.9-4.95-1.12-8-2.8-9-1.84 4.9-.18 8.24 2.51 9.52.59 1.4.44 1.06.72 1.71-.73 2.9-1.38 5.9-1.93 9.08l-.93-1.2c.42-4.85-1.73-7.95-3.83-8.87-1.38 5.08.51 8.44 3.6 9.45.76 1.37.56 1 1 1.73C9 44.44 8.66 47.13 8.43 50l-1.16-1.19c-.13-5.35-2.9-8-4.93-8.6-.89 5.8 1.74 8.7 4.76 9.22.94 1.29.7 1 1.25 1.7a90.88 90.88 0 0 0-.22 9.19c-.38-.28-.85-.64-1.4-1.08-.73-5.1-3.67-7.82-6.11-8.16-.19 4.68 1.65 8.69 6 8.84l1.53 1.59A81.9 81.9 0 0 0 9 70.63c-.66-.36-.36-.2-1.63-.92-1.6-5.5-5-7.52-7.32-7.5.46 6.3 3.91 8.62 7.3 8.2.85.69.69.57 1.83 1.42A79.36 79.36 0 0 0 11 80.75c-.78-.28-.44-.15-1.86-.69C6.8 74.72 3 73.09.62 73.49c1.28 6.3 5.1 8.32 8.62 7.3 1.5.86 1.09.62 2.1 1.19a81.23 81.23 0 0 0 3 8.56c-.92-.18-.54-.1-2-.42-3.5-5.46-7.66-6.05-9.68-5.35 2.34 6.44 6.45 7.73 9.85 6.09 1.16.46 1 .39 2.36.87a76.27 76.27 0 0 0 4.14 8c-1.12 0-1 0-2.21-.07C12.75 95 8.36 94.6 6.16 95.8c2.49 4.82 6.85 7.54 11 4.62l2.57.5a76.7 76.7 0 0 0 5.15 7.38c-.72.1-1.4.19-2.31.29-5.08-4.47-9.59-3.68-11.37-2.27 3.4 4.6 8.11 6.62 11.81 3 1.89.08 1.32.06 2.72.1a87.89 87.89 0 0 0 6 6.65c-1.27.37-1.12.33-2.33.64-5.25-3.46-9.83-2.76-11.83-.57 3.84 4.12 9.21 5.54 12.38 1.23l2.81-.3c2.63 2.55 4.36 4 6.67 5.89l-2.32 1c-6.31-3.09-10.59-1.2-12.11 1.04Z"
                />
                <path
                  id="Trazado_79264"
                  data-name="Trazado 79264"
                  className="cls-1"
                  d="M170.76 80.79c3.52 1 7.34-1 8.62-7.3-2.38-.4-6.19 1.22-8.52 6.57l-1.86.69a80.3 80.3 0 0 0 1.87-8.92c1.14-.86 1-.74 1.83-1.42 3.39.41 6.83-1.91 7.3-8.2-2.29 0-5.72 2-7.32 7.49l-1.63.93a82.08 82.08 0 0 0 .79-9.13c.7-.72.4-.4 1.53-1.59 4.36-.15 6.2-4.16 6-8.83-2.44.33-5.38 3.06-6.11 8.16-.55.44-1 .79-1.4 1.07a90.68 90.68 0 0 0-.22-9.18c.55-.74.31-.41 1.24-1.7 3-.53 5.66-3.42 4.77-9.23-2 .58-4.8 3.26-4.94 8.6l-1.14 1.2c-.23-2.85-.53-5.54-1.13-9.17.41-.72.21-.36 1-1.73 3.1-1 5-4.37 3.6-9.44-2.1.91-4.25 4-3.83 8.86-.83 1.08-.66.87-.93 1.2-.55-3.17-1.21-6.18-1.93-9.07l.72-1.71c2.69-1.28 4.35-4.63 2.51-9.52-1.68 1-3.7 4.05-2.8 9l-.7 1.19c-.73-2.77-1.58-5.64-2.44-8.23.17-.63.23-.87.57-2.28 2.26-1.67 3.36-5.15 1.08-9.44-1.54 1.37-2.77 4.7-1.4 9-.47 1.22-.35.9-.63 1.6-.85-2.49-1.72-4.83-2.68-7.21-.09-1.29-.05-.78-.18-2.42 1.47-3 1.12-6.82-2.12-10.16a12.27 12.27 0 0 0 1.72 9.82c0 .72 0 1.31-.06 2l-1.68-.81c-1.87-4-5.16-5.13-7.2-4.73 1.6 4.15 4.6 5.58 7.27 5.27 1.2.8.88.58 1.63 1.1 1.06 2.65 2.09 5.44 3.13 8.63l-1.32-.7c-1.64-4-4.82-5.55-7.15-5.21 1.44 4.47 4.46 6 7.19 5.77l1.61 1.19c1 3.12 1.89 6.43 2.46 8.82l-1.36-.78c-1.53-4.37-4.85-5.9-7.07-5.63 1.15 4.53 4.17 6.41 7.08 6.21.55.43 1 .8 1.61 1.3.63 2.76 1.23 5.76 1.73 9l-1.38-.89c-1.28-4.56-4.6-6.28-6.94-6.08.83 3.83 3.1 6.82 6.91 6.69 1.15 1 .83.74 1.57 1.41.43 3 .73 5.82.92 9-.51-.38-.24-.18-1.38-1-1-4.93-4.44-6.7-6.72-6.6.68 5 3.61 7.18 6.65 7.22.66.66 1.07 1.08 1.5 1.54.16 3.27.14 6.51 0 9.07-.52-.45-.26-.23-1.36-1.14-.66-5.71-4.62-7.16-6.38-7.18.43 5.26 3 7.57 6.25 7.82.71.81.59.67 1.42 1.68a87.44 87.44 0 0 1-1 9c-.5-.51-.25-.27-1.28-1.29 0-4.49-2.84-7.57-5.92-7.82-.13 5.32 2.55 8 5.71 8.46 1 1.34.7 1 1.3 1.83a82.07 82.07 0 0 1-2.1 8.76c-.36-.45-.36-.45-1.2-1.46.42-5-2.34-8-5.26-8.5-.6 4.2.89 8.12 5 9.14.22.37.91 1.62 1.11 2a73.66 73.66 0 0 1-3.21 8.37c-.43-.66-.22-.36-1.07-1.63 1.11-4.51-1.26-8.32-4.46-9.2-1.31 5.3.87 8.66 4.09 9.82.69 1.58.51 1.16.92 2.13a70.22 70.22 0 0 1-4.3 7.85c-.37-.74-.2-.4-.92-1.8 1.91-5.66-1.16-8.93-3.49-9.85-1.94 5-.3 8.84 3 10.45.54 1.72.51 1.59.7 2.27a79 79 0 0 1-5.28 7.19c-.31-.82-.16-.44-.76-2 2.85-6-.65-9.5-2.45-10.44-2.67 5-1.2 9.09 1.92 11 .32 1.6.3 1.5.45 2.39a82.86 82.86 0 0 1-6.11 6.46c-.24-.88-.13-.48-.58-2.08 3.6-5.86.31-9.8-1.38-10.93-3.32 4.81-2.3 9.15.76 11.45.17 1.7.19 1.86.23 2.48-1.87 1.74-4.52 4-6.77 5.7-.18-.94-.09-.5-.41-2.17 3.92-5.28 1.78-9.6-.34-11.32-3.84 4.45-3.46 9-.36 11.78v2.55c-2.62 2-5.11 3.63-7.27 5-.11-1-.06-.54-.27-2.27 4-4.44 3.3-9.08.63-11.63-4.65 4.9-4.26 9.11-1.37 12-.11 1.7-.1 1.68-.18 2.59q-3.8 2.33-7.66 4.35c0-1 0-.55-.13-2.34 5-4.87 3.42-9.79 1.51-11.88-5 4.12-5.25 8.87-2.31 12.26-.26 2-.19 1.46-.36 2.62-3 1.52-4.6 2.26-7.93 3.8v-2.45c5.09-4.52 4.45-9.42 2.28-12.09-5.56 4.07-6 8.95-3.14 12.46l-.47 2.72c-7.53 3.51-6.26 2.9-8 3.77l-.16-2.51c5.28-5.2 5.06-9.87 2.75-12.66-6.82 4.56-6.8 9.56-3.63 13.08l-.33 2.79c-9.56 4.9-23.58 12.87-33.44 22h2c8.8-8.2 23.7-16.63 33.36-21.57 1.16.66 1.94 1.1 2.85 1.64.86 4.48 4.89 7.67 12 5.64-.67-3.55-4.33-7.08-11.15-6.07l-2.24-2 7.84-3.7 2.74 1.63c.87 4.65 4.89 7.52 12.55 4.8-.79-3.25-4.7-6.4-11.7-5.24l-2.15-1.87q3.93-1.78 7.86-3.87c.77.38 2 1 2.82 1.35 1.61 5.67 7.3 6.22 12.7 3.51-1-2.76-4.73-5.68-11.92-4-1.47-1.05-1-.73-2.22-1.6q3.82-2.09 7.57-4.48c1.55.58.95.36 2.85 1 2.2 5.45 7.64 5.15 12.76 2.08-1.24-2.52-5-4.86-12-2.6l-2.3-1.32c3.49-2.26 5.92-4.17 7.21-5.15 1.66.42 1.37.35 2.84.67 2.67 4.83 8 4.2 12.67.48-1.49-2.22-5.76-4.1-12-1.08-1.6-.66-1.13-.46-2.33-1 2.31-1.9 4-3.33 6.68-5.89 1.48.17.88.1 2.81.3 3.16 4.32 8.53 2.9 12.37-1.22-2-2.19-6.58-2.89-11.82.57-1.21-.32-1.07-.28-2.34-.65a85.79 85.79 0 0 0 6-6.65c1.41 0 .84 0 2.72-.1 3.7 3.66 8.41 1.64 11.81-3-1.78-1.42-6.28-2.21-11.36 2.26-.92-.1-1.6-.19-2.31-.28a76.84 76.84 0 0 0 5.15-7.39c1.31-.24.74-.13 2.57-.5 4.1 2.92 8.47.2 11-4.62-2.2-1.21-6.59-.84-10.64 3.9-1.23.06-1.09 0-2.21.08a76.42 76.42 0 0 0 4.14-8c1.38-.48 1.2-.41 2.35-.86 3.4 1.63 7.51.34 9.89-6.1-2-.7-6.18-.11-9.68 5.36l-2.05.41a80.38 80.38 0 0 0 3-8.56c.99-.36.57-.12 2.08-.98Z"
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
          <div className="polla-home__rank-lineas">
            <svg
              id="Capa_1"
              data-name="Capa 1"
              height="320"
              width="1366"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1366 320"
              {...props}>
              <defs>
                <clipPath id="clip-path">
                  <path
                    style={{
                      fill: 'none',
                    }}
                    d="M0 0h1366v320H0z"
                  />
                </clipPath>
                <style>{'.cls-3{fill:#83f73d}'}</style>
              </defs>
              <g
                style={{
                  clipPath: 'url(#clip-path)',
                }}>
                <g id="Enmascarar_grupo_12" data-name="Enmascarar grupo 12">
                  <g id="Lines">
                    <path
                      id="Trazado_79407"
                      data-name="Trazado 79407"
                      className="cls-3"
                      d="m1142.81 78.87-.29-.09L912.91 1.94 683 78.88l-.29-.1-229.6-76.84-229.93 76.94-.28-.1L-7 1.85l.57-3 229.61 76.88L453.11-1.2l.28.09L683 75.73 912.91-1.2l.28.09 229.62 76.84 229.64-76.84.55 3Z"
                    />
                    <path
                      id="Trazado_79408"
                      data-name="Trazado 79408"
                      className="cls-3"
                      d="m1142.81 103.76-.29-.1-229.61-76.84L683 103.76l-.29-.1-229.6-76.84-229.93 76.94-.28-.1L-7 26.73l.57-3 229.61 76.84 229.93-76.89.28.1L683 100.61l229.91-76.93.28.1 229.62 76.83 229.63-76.84.56 3Z"
                    />
                    <path
                      id="Trazado_79409"
                      data-name="Trazado 79409"
                      className="cls-3"
                      d="m1142.81 128.65-.29-.1-229.61-76.84L683 128.65l-.29-.1-229.6-76.84-229.93 76.94-.28-.1L-7 51.62l.57-3 229.61 76.85 229.93-76.9.28.1L683 125.51l229.91-76.94.28.1 229.62 76.83 229.63-76.83.56 2.95Z"
                    />
                    <path
                      id="Trazado_79410"
                      data-name="Trazado 79410"
                      className="cls-3"
                      d="m1142.81 153.53-.29-.1-229.61-76.84L683 153.53l-.29-.1-229.6-76.84-229.93 76.94-.28-.1L-7 76.5l.57-3 229.61 76.84 229.93-76.89.28.09L683 150.38l229.91-76.93.28.09 229.62 76.84 229.64-76.84.55 3Z"
                    />
                    <path
                      id="Trazado_79411"
                      data-name="Trazado 79411"
                      className="cls-3"
                      d="m1142.81 178.41-.29-.1-229.61-76.83L683 178.41l-.29-.1-229.6-76.83-229.93 76.93-.28-.1L-7 101.38l.56-2.95 229.62 76.83 229.93-76.93.28.1L683 175.27l229.91-76.94.28.1 229.62 76.84 229.64-76.84.55 2.95Z"
                    />
                    <path
                      id="Trazado_79412"
                      data-name="Trazado 79412"
                      className="cls-3"
                      d="m1142.82 203.25-.3-.09-229.61-76.84L683 203.25l-.29-.09-229.6-76.84-229.93 76.93-.28-.09L-7 126.23l.56-3 229.62 76.84 229.93-76.93.28.09L683 200.11l229.91-76.93.28.09 229.63 76.84 229.61-76.84.57 3Z"
                    />
                    <path
                      id="Trazado_79413"
                      data-name="Trazado 79413"
                      className="cls-3"
                      d="m1142.81 228.14-.29-.1-229.61-76.84L683 228.14l-.29-.1-229.6-76.84-229.93 76.94-.28-.1L-7 151.11l.57-3L223.18 225l229.93-76.93.28.09L683 225l229.91-76.93.28.1L1142.81 225l229.64-76.84.55 3Z"
                    />
                    <path
                      id="Trazado_79414"
                      data-name="Trazado 79414"
                      className="cls-3"
                      d="m1142.81 253-.29-.09-229.61-76.82L683 253l-.29-.09-229.6-76.84L223.18 253l-.28-.09L-7 176l.57-3 229.61 76.84 229.93-76.94.28.1L683 249.88 912.91 173l.28.09 229.62 76.84L1372.45 173l.55 3Z"
                    />
                    <path
                      id="Trazado_79415"
                      data-name="Trazado 79415"
                      className="cls-3"
                      d="m1142.82 277.91-.3-.1L912.9 201 683 277.91l-.29-.1L453.11 201l-229.93 76.91-.28-.1L-7 200.88l.56-2.95 229.62 76.83 229.93-76.93.28.09L683 274.76l229.91-76.93.28.09 229.63 76.84 229.61-76.84.57 3Z"
                    />
                    <path
                      id="Trazado_79416"
                      data-name="Trazado 79416"
                      className="cls-3"
                      d="m1142.81 302.75-.29-.09-229.61-76.84L683 302.75l-.29-.09-229.6-76.84-229.93 76.93-.28-.09L-7 225.73l.56-3 229.62 76.84 229.93-76.93.28.09L683 299.61l229.91-76.93.28.09 229.62 76.84 229.63-76.84.56 3Z"
                    />
                    <path
                      id="Trazado_79417"
                      data-name="Trazado 79417"
                      className="cls-3"
                      d="m1142.81 327.63-.29-.09-229.61-76.84L683 327.63l-.29-.09-229.6-76.84-229.93 76.93-.28-.09L-7 250.61l.56-3 229.62 76.84 229.93-76.93.28.09L683 324.49l229.91-76.93.28.09 229.62 76.84 229.64-76.84.55 3Z"
                    />
                    <path
                      id="Trazado_79418"
                      data-name="Trazado 79418"
                      className="cls-3"
                      d="m1142.82 352.52-.3-.1-229.61-76.83L683 352.52l-.29-.09-229.6-76.84-229.93 76.93-.28-.1L-7 275.49l.56-2.95 229.62 76.84 229.93-76.94.28.1L683 349.38l229.91-76.94.28.1 229.63 76.84 229.61-76.84.57 2.95Z"
                    />
                    <path
                      id="Trazado_79419"
                      data-name="Trazado 79419"
                      className="cls-3"
                      d="m1142.81 377.4-.29-.09-229.61-76.84L683 377.4l-.29-.09-229.6-76.84-229.93 76.93-.28-.09L-7 300.37l.56-2.95 229.62 76.84 229.93-76.94.27.1L683 374.26l229.91-76.94.28.1 229.62 76.84 229.63-76.84.56 3Z"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
      )}
      {customFields?.block === 'awards' && (
        <div className="polla-home__aw">
          <h2 className="polla-home__aw-title">
            ¡Estos son algunos de los premios!
          </h2>
          <div className="polla-home__aw-list">
            <div className="polla-home__aw-list__block">
              {customFields.awards1Image && (
                <img
                  src={customFields.awards1Image}
                  alt=""
                  className="polla-home__aw-list__block-image"
                />
              )}
              <span className="polla-home__aw-list__block-title">
                {customFields.awards1Title}
              </span>
            </div>
            <div className="polla-home__aw-list__block">
              {customFields.awards2Image && (
                <img
                  src={customFields.awards2Image}
                  alt=""
                  className="polla-home__aw-list__block-image"
                />
              )}
              <span className="polla-home__aw-list__block-title">
                {customFields.awards2Title}
              </span>
            </div>
            <div className="polla-home__aw-list__block">
              {customFields.awards3Image && (
                <img
                  src={customFields.awards3Image}
                  alt=""
                  className="polla-home__aw-list__block-image"
                />
              )}
              <span className="polla-home__aw-list__block-title">
                {customFields.awards3Title}
              </span>
            </div>
          </div>
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
    terminosUrl: PropTypes.string.tag({
      name: 'URL de los terminos y condiciones',
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
    awards1Image: PropTypes.string.tag({
      name: 'URL de la imagen del premio 1',
      group: 'awards',
    }),
    awards1Title: PropTypes.string.tag({
      name: 'Titulo del premio 1',
      group: 'awards',
    }),
    awards2Image: PropTypes.string.tag({
      name: 'URL de la imagen del premio 2',
      group: 'awards',
    }),
    awards2Title: PropTypes.string.tag({
      name: 'Titulo del premio 2',
      group: 'awards',
    }),
    awards3Image: PropTypes.string.tag({
      name: 'URL de la imagen del premio 3',
      group: 'awards',
    }),
    awards3Title: PropTypes.string.tag({
      name: 'Titulo del premio 3',
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
