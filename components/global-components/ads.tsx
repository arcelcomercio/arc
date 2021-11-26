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
}

const AdsGlobal: React.FC<AdsGlobalProps> = ({
  adElement,
  classes,
  isDfp = false,
  isDesktop = true,
  isMobile = true,
}) =>
  isDfp === true ? (
    <div className={`content_gpt_${adElement}`}>
      <div id={`gpt_${adElement}`} className="flex justify-center" />
    </div>
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
