import React from 'react'
import Portal from '../Profile/children/portal'
import { LoadingGes, LoadingEco } from '../../../_dependencies/Icons'

// const divLoading = {
//   position: 'fixed',
//   pointerEvents: 'none',
//   willChange: 'opacity',
//   transition: 'opacity 200ms ease-in-out',
//   width: '100vw',
//   height: '100vh',
//   top: '0',
//   zIndex: '1',
// }

// const divBackground = {
//   position: 'absolute',
//   width: '100%',
//   height: '100%',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   backgroundColor: 'rgba(255, 255, 255, 0.8)',
//   zIndex: '100',
// }

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

export default Loading
