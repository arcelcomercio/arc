import * as React from 'react'

export default ({
  classes,
  adElement,
  isDfp = false,
  isDesktop = true,
  isMobile = true,
}) => {
  return isDfp === true ? (
    <div id={`gpt_${adElement}`} className="flex justify-center"></div>
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
  )
}
