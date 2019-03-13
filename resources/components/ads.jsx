import React, { Fragment } from 'react'

export default props => {
  const { adElement, isDesktop, isMobile } = props

  return (
    <Fragment>
      {adElement && isMobile && <div id={`ads-m-${adElement}`} />}
      {adElement && isDesktop && <div id={`ads-d-${adElement}`} />}
    </Fragment>
  )
}
