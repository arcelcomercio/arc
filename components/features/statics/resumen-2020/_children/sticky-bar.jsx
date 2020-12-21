import * as React from 'react'
import PropTypes from 'prop-types'

import { anchorScript } from '../_dependencies/scripts'

const StaticsResumen2020StickyBar = ({ text, year, disableAnchor, requestUri }) => {
  const [, month = ''] = requestUri.match(/^\/resumen-2020\/(\w{4,10})\//) || []
  return (
    <div>
      <h2>
        {text}<br/>
        <span>{month} {year}</span>
      </h2>
      {disableAnchor ? null : (
        <>
          <button
            type="button"
            aria-label="Ir al inicio de la página"
            id="anchor"
            className="st-continue__anchor">
            <svg
              aria-disabled="true"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              viewBox="0 0 451.8 451.8">
              <path d="M345.4 248.3L151.2 442.6c-12.4 12.4-32.4 12.4-44.7 0 -12.4-12.4-12.4-32.4 0-44.7L278.3 225.9 106.4 54c-12.4-12.4-12.4-32.4 0-44.7 12.4-12.4 32.4-12.4 44.8 0l194.3 194.3c6.2 6.2 9.3 14.3 9.3 22.4C354.7 234 351.6 242.1 345.4 248.3z" />
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
  requestUri: PropTypes.string.isRequired
}

export default StaticsResumen2020StickyBar