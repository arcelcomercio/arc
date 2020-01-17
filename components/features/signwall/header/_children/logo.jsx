import React from 'react'

const Logo = ({ arcSite, deployment, contextPath, mainLogo }) => {
  return (
    <div className={`cont cont_${arcSite}`}>
      <img
        alt={`Logo ${arcSite}`}
        src={deployment(
          `${contextPath}/resources/dist/${arcSite}/images/${mainLogo}`
        )}
      />
    </div>
  )
}

export default Logo
