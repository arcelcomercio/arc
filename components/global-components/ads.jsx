import React from 'react'

export default props => {
  const {
    adElement,
    sectionAds,
    isDfp,
    isDesktop = true,
    isMobile = true,
    classes = '',
  } = props
  return (
    <>
      {isDfp && sectionAds ? (
        <div id={sectionAds[adElement]} className="flex justify-center" />
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
