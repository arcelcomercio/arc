import PropTypes from 'prop-types'
import React from 'react'

import Portal from '../_children/modal/portal'
import { LoadingEco, LoadingGes } from '../_dependencies/Icons'

function Loading({ arcSite }) {
  return (
    <Portal id="subs-loading">
      <div className="subs-loading">
        <div className="cont-loader-logo">
          {arcSite === 'gestion' ? (
            <>
              <LoadingGes />
              <LoadingGes />
              <LoadingGes />
            </>
          ) : (
            <>
              <LoadingEco />
              <LoadingEco />
              <LoadingEco />
            </>
          )}
        </div>
      </div>
    </Portal>
  )
}

Loading.propTypes = {
  arcSite: PropTypes.string.isRequired,
}

export default Loading
