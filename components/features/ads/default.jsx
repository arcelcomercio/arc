import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import { createMarkup } from '../../utilities/helpers'
import customFields from './_dependencies/custom-fields'
import AdsChild from '../../global-components/ads'

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

    const hideInDevice = () => {
      let classDevice = ''
      if (!freeHtml) {
        if (isDesktop && !isMobile) classDevice = 'no-mobile'
        else if (!isDesktop && isMobile) classDevice = 'no-desktop'
      }
      return classDevice
    }

    return (
      <>
        {outputType !== 'amp' && (
          <div
            className={`${
              classes.adsBox
            } ${columns} ${addRowsClass()} ${addEmptyBackground()} ${hideInDevice()}`}>
            <AdsChild {...params} />
            {freeHtml && (
              <div dangerouslySetInnerHTML={createMarkup(freeHtml)} />
            )}
          </div>
        )}
      </>
    )
  }
}

Ads.propTypes = {
  customFields,
}

Ads.label = 'Publicidad AppNexus'

export default Ads
