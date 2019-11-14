import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import { createMarkup } from '../../utilities/helpers'
import customFields from './_dependencies/custom-fields'
import AdsChild from '../../global-components/ads'

const NO_DESKTOP = 'no-desktop'
const NO_MOBILE = 'no-mobile'

const classes = {
  adsBox: 'flex items-center flex-col',
}
@Consumer
class Ads extends PureComponent {
  constructor(props) {
    super(props)
    const { customFields: { adsSpace } = {} } = props

    if (adsSpace && adsSpace !== 'none') {
      this.fetchContent({
        adsSpaces: {
          source: 'get-ads-spaces',
          query: { space: adsSpace },
        },
      })
    }
  }

  getAdsSpace() {
    const { adsSpaces = {} } = this.state || {}
    const { customFields: { adsSpace } = {} } = this.props

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

  render() {
    const {
      isAdmin,
      outputType,
      customFields: {
        adElement,
        isDesktop,
        isMobile,
        freeHtml,
        columns,
        rows,
      } = {},
    } = this.props

    const params = {
      adElement,
      isDesktop,
      isMobile,
    }

    const addEmptyBackground = () =>
      !adElement && isAdmin ? 'bg-base-100' : ''

    const addRowsClass = () => (rows === 'empty' ? '' : rows)

    const neverShow = () => !isDesktop && !isMobile
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
          if (this.getAdsSpace())
            return (
              <div dangerouslySetInnerHTML={createMarkup(this.getAdsSpace())} />
            )

          if (outputType !== 'amp' && !neverShow())
            return (
              <>
                <div
                  className={`${classes.adsBox} ${
                    adElement === 'boton1' ? 'justify-start' : 'justify-center'
                  } ${columns} ${addRowsClass()} ${addEmptyBackground()} ${hideInDevice()}`}>
                  <AdsChild {...params} />
                  {freeHtml && (
                    <div dangerouslySetInnerHTML={createMarkup(freeHtml)} />
                  )}
                </div>
                {!alwaysShow() && freeHtml && (
                  <div
                    className={showHtmlInDevice()}
                    dangerouslySetInnerHTML={createMarkup(freeHtml)}
                  />
                )}
              </>
            )
          return ''
        })()}
      </>
    )
  }
}

Ads.propTypes = {
  customFields,
}

Ads.label = 'Publicidad AppNexus'
Ads.static = true

export default Ads
