import React from 'react'
import { getAssetsPath } from '../../../../utilities/constants'

const Logo = ({ arcSite, deployment, contextPath, mainLogo }) => {
  return (
    <div className={`cont cont_${arcSite}`}>
      <img
        alt={`Logo ${arcSite}`}
        src={deployment(
          `${getAssetsPath(
            arcSite,
            contextPath
          )}/resources/dist/${arcSite}/images/${mainLogo}`
        )}
      />
    </div>
  )
}

export default Logo
