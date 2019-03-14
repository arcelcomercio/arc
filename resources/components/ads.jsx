import React, { Fragment } from 'react'

export default props => {
  const { adElement, isDesktop, isMobile, classes } = props

  return (
    <Fragment>
      {adElement && isMobile && (
        <div id={`ads_m_${adElement}`} className={classes && classes.mobile} />
      )}
      {adElement && isDesktop && (
        <div id={`ads_d_${adElement}`} className={classes && classes.desktop} />
      )}
    </Fragment>
  )
}
