import * as React from 'react'

import { anchorScript } from '../_dependencies/scripts'

const TopAnchor = () => (
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
)

export default TopAnchor
