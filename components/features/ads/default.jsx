import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import { createMarkup } from '../../utilities/helpers'
import customFields from './_dependencies/custom-fields'
import AdsChild from '../../global-components/ads'

const NO_DESKTOP = 'no-desktop'
const NO_MOBILE = 'no-mobile'

const classes = {
  adsBox: 'flex items-center justify-center flex-col',
}
@Consumer
class Ads extends PureComponent {
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
        {outputType !== 'amp' && !neverShow() && (
          <>
            <div
              className={`${
                classes.adsBox
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
        )}
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
