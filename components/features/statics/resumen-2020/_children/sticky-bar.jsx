import * as React from 'react'
import PropTypes from 'prop-types'

/**
 * @see estilos src/websites/elcomercio/scss/components/statics/resumen-2020/_sticky-bar.scss
 */
const StaticsResumen2020StickyBar = ({ text, year, month, disableAnchor }) => {
  return (
    <div className="bar">
      <h2 className="bar__text">
        {text}
        <br />
        <strong>
          {month} {year}
        </strong>
      </h2>
      {disableAnchor ? null : (
        <>
          <a
            href="/resumen-2020/"
            aria-label="Ir al inicio de la página"
            id="anchor"
            className="bar__btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
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

StaticsResumen2020StickyBar.propTypes = {
  text: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.string.isRequired,
  disableAnchor: PropTypes.bool,
}

export default React.memo(StaticsResumen2020StickyBar)
