import React from 'react'
import { getAssetsPath } from '../../../../utilities/constants'

const Logo = ({ arcSite, contextPath, mainLogo }) => {
  return (
    <div className={`cont cont_${arcSite}`}>
      <img
        alt={`Logo ${arcSite}`}
        src={`${getAssetsPath(
          arcSite,
          contextPath
        )}/resources/dist/${arcSite}/images/${mainLogo}?d=1`}
      />
    </div>
  )
}

export default Logo
