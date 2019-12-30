import React from 'react'
import Dfp from '../output-types/_children/dfp'

export default props => {
  const { adElement, isDfp, isDesktop = true, isMobile = true, classes } = props
  const adsParams = {
    isFuature: true,
    adId: adElement,
  }
  return (
    <>
      {isDfp ? (
        <Dfp {...adsParams} />
      ) : (
        <>
          {adElement && isMobile && (
            <div
              id={`ads_m_${adElement}`}
              className={`flex justify-center ${classes && classes.mobile}`}
            />
          )}
          {adElement && isDesktop && (
            <div
              id={`ads_d_${adElement}`}
              className={`flex justify-center ${classes &&
                classes.desktop}${(adElement === 'fotogaleria2' ||
                adElement === 'boton1') &&
                ' lg:flex-col'}`}
            />
          )}
        </>
      )}
    </>
  )
}
