import * as React from 'react'
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'
import AdsChild from '../../../global-components/ads'

const NO_DESKTOP = 'no-desktop'
const NO_MOBILE = 'no-mobile'

const classes = {
  adsBox: 'flex items-center flex-col',
}

const AdsFeat = props => {
  const {
    customFields: {
      adsSpace,
      adElement,
      isDesktop,
      isMobile,
      freeHtml,
      columns,
      adsBorder,
      isDfp,
      rows,
    } = {},
  } = props

  const { isAdmin } = useAppContext()

  const adsSpaces =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useContent(
      adsSpace && adsSpace !== 'none'
        ? {
            source: 'get-ads-spaces',
            query: { space: adsSpace },
          }
        : {}
    ) || {}

  const getAdsSpace = () => {
    const toDate = dateStr => {
      const [date, time] = dateStr.split(' ')
      const [day, month, year] = date.split('/')
      return new Date(`${year}/${month}/${day} ${time} GMT-0500`)
    }

    if (adsSpaces[adsSpace]) {
      const [currentSpace] = adsSpaces[adsSpace] || []
      const {
        fec_inicio: fecInicio,
        fec_fin: fecFin,
        des_html: desHtml,
      } = currentSpace
      const currentDate = new Date()
      const initDate = toDate(fecInicio)
      const endDate = toDate(fecFin)

      return currentDate > initDate && endDate > currentDate ? desHtml : false
    }

    return false
  }

  const addEmptyBorder = () =>
    adsBorder === 'containerp' ? 'container-publicidad' : ''

  const addEmptyBackground = () => (!adElement && isAdmin ? 'bg-base-100' : '')
  const addRowsClass = () => (rows === 'empty' ? '' : rows)
  const neverShow = () => !isDesktop && !isMobile && !isDfp
  const alwaysShow = () => isDesktop && isMobile

  const hideInDevice = () => {
    let deviceClass = ''
    // if (!freeHtml) { Esto se usaba para mostrar siempre el bloque cuando viniera HTML
    if (isDesktop && !isMobile) deviceClass = NO_MOBILE
    else if (!isDesktop && isMobile) deviceClass = NO_DESKTOP
    // Por ahora isDesktop abarca Tablet y Desktop, se planea separar y crear isTablet.
    // }
    return deviceClass
  }

  const showHtmlInDevice = () => {
    let deviceClass = ''
    switch (hideInDevice()) {
      case NO_MOBILE:
        deviceClass = NO_DESKTOP
        break
      case NO_DESKTOP:
        deviceClass = NO_MOBILE
        break
      default:
    }
    return deviceClass
  }

  return (
    <>
      {(() => {
        if (getAdsSpace())
          return (
            <div
              className={addEmptyBorder()}
              dangerouslySetInnerHTML={{ __html: getAdsSpace() }}
            />
          )

        if (!neverShow())
          return (
            <>
              <div
                className={`${classes.adsBox} ${
                  adElement === 'boton1' ? 'justify-start' : 'justify-center'
                } ${columns} ${addRowsClass()} ${addEmptyBackground()} ${hideInDevice()} no-row-2-mobile`}>
                <AdsChild
                  adElement={adElement}
                  isDesktop={isDesktop}
                  isMobile={isMobile}
                  isDfp={isDfp}
                />
                {freeHtml && (
                  <div dangerouslySetInnerHTML={{ __html: freeHtml }} />
                )}
              </div>
              {!alwaysShow() && freeHtml && (
                <div
                  className={showHtmlInDevice()}
                  dangerouslySetInnerHTML={{ __html: freeHtml }}
                />
              )}
            </>
          )
        return ''
      })()}
    </>
  )
}

AdsFeat.propTypes = {
  customFields,
}

AdsFeat.label = 'Publicidad - Beta'
AdsFeat.static = true

export default AdsFeat
