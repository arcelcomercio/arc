import * as React from 'react'

interface Props {
  text: string
  month: string
  disableAnchor: boolean
  mainPath: string
}

/**
 * @see estilos src/websites/elcomercio/scss/components/statics/resumen-2020/_sticky-bar.scss
 */
const StaticsResumen2020StickyBar: React.FC<Props> = (props) => {
  const { text, month, disableAnchor, mainPath } = props
  return (
    <div className="bar">
      <h2 className="bar__text">
        {text}
        <br />
        <strong>{month}</strong>
      </h2>
      {disableAnchor ? null : (
        <>
          <a
            href={mainPath}
            aria-label="Ir al inicio de la página"
            id="anchor"
            className="bar__btn">
            <svg
              aria-disabled="true"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none">
              <path
                d="M26.7 6.7L25.3 5.3 16 14.6 6.7 5.3 5.3 6.7 14.6 16 5.3 25.3 6.7 26.7 16 17.4 25.3 26.7 26.7 25.3 17.4 16 26.7 6.7V6.7Z"
                fill="#080808"
              />
            </svg>
          </a>
        </>
      )}
    </div>
  )
}

export default React.memo(StaticsResumen2020StickyBar)
