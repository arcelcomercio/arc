import React from 'react'
import PropTypes from 'prop-types'
import Portal from '../payment/_children/Profile/children/portal'
import { LoadingGes, LoadingEco } from '../_dependencies/Icons'

function Loading({ arcSite }) {
  return (
    <Portal id="loading">
      <div className="subs-loading">
        <div className="subs-background">
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
