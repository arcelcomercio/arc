import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import * as React from 'react'
import { FC } from 'types/features'

import {
  Ad,
  GetAdsSpacesQuery,
} from '../../../../content/sources/get-ads-spaces'
import AdsChild from '../../../global-components/ads'
import customFields from './_dependencies/custom-fields'

const NO_DESKTOP = 'no-desktop'
const NO_MOBILE = 'no-mobile'

const classes = {
  adsBox: 'flex items-center flex-col',
}

interface AdsFeatProps {
  customFields?: {
    adsSpace?: string
    adElement?: string
    isDesktop?: boolean
    isMobile?: boolean
    freeHtml?: string
    columns?: 'w-full' | 'col-1' | 'col-2' | 'col-3'
    adsBorder?: 'border' | 'containerp'
    isDfp?: boolean
    rows?: 'empty' | 'row-1' | 'row-2'
  }
}

const AdsFeat: FC<AdsFeatProps> = (props) => {
  const {
    customFields: {
      adsSpace = 'none',
      adElement,
      isDesktop,
      isMobile,
      freeHtml,
      columns = 'w-full',
      adsBorder = false,
      isDfp = true,
      rows = 'empty',
    } = {},
  } = props

  const { isAdmin } = useAppContext()

  const adsSpaces =
    useContent<GetAdsSpacesQuery, Ad>({
      source: 'get-ads-spaces',
      query: { space: adsSpace },
    }) || {}

  const getAdsSpace = (): string => {
    const toDate = (dateStr: string): Date => {
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

      return currentDate > initDate && endDate > currentDate ? desHtml : ''
    }

    return ''
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

  if (getAdsSpace())
    return (
      <div
        className={addEmptyBorder()}
        dangerouslySetInnerHTML={{ __html: getAdsSpace() }}
      />
    )

  if (!neverShow() && adElement)
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
          {freeHtml && <div dangerouslySetInnerHTML={{ __html: freeHtml }} />}
        </div>
        {!alwaysShow() && freeHtml && (
          <div
            className={showHtmlInDevice()}
            dangerouslySetInnerHTML={{ __html: freeHtml }}
          />
        )}
      </>
    )

  return null
}

AdsFeat.propTypes = {
  customFields,
}

AdsFeat.label = 'Publicidad'
AdsFeat.static = true

export default AdsFeat
