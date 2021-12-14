import * as React from 'react'

interface AdsGlobalProps {
  adElement: string
  classes?: {
    mobile?: string
    desktop?: string
  }
  isDfp?: boolean
  isDesktop?: boolean
  isMobile?: boolean
  isLite?: boolean
}

const AdsGlobal: React.FC<AdsGlobalProps> = ({
  adElement,
  classes,
  isDfp = false,
  isDesktop = true,
  isMobile = true,
  isLite = true,
}) =>
  isDfp === true ? (
    <>
      {isLite && (
        <div className={`content_gpt_${adElement}`}>
          <div id={`gpt_${adElement}`} className="flex justify-center" />
        </div>
      )}
      {!isLite && (
        <div id={`gpt_${adElement}`} className="flex justify-center" />
      )}
    </>
  ) : (
    <>
      {adElement && isMobile && (
        <div
          id={`ads_m_${adElement}`}
          className={`flex justify-center ${classes?.mobile || ''}`}
        />
      )}
      {adElement && isDesktop && (
        <div
          id={`ads_d_${adElement}`}
          className={`flex justify-center ${classes?.desktop || ''}${
            (adElement === 'fotogaleria2' || adElement === 'boton1') &&
            ' lg:flex-col'
          }`}
        />
      )}
    </>
  )

export default AdsGlobal
