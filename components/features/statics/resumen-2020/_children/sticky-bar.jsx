import * as React from 'react'
import PropTypes from 'prop-types'

import { anchorScript } from '../_dependencies/scripts'

/**
 * @see estilos src/websites/elcomercio/scss/components/statics/resumen-2020/_sticky-bar.scss
 */
const StaticsResumen2020StickyBar = ({
  text,
  year,
  disableAnchor,
  requestUri,
}) => {
  const [, month = ''] = requestUri.match(/^\/resumen-2020\/(\w{4,10})\//) || []
  return (
    <div className="bar">
      <h2 className="bar__text">
        {text}
        <strong>
          {month} {year}
        </strong>
      </h2>
      {disableAnchor ? null : (
        <>
          <button
            type="button"
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
          </button>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: anchorScript,
            }}
          />
        </>
      )}
    </div>
  )
}

StaticsResumen2020StickyBar.propTypes = {
  text: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  disableAnchor: PropTypes.bool,
  requestUri: PropTypes.string.isRequired,
}

export default StaticsResumen2020StickyBar
