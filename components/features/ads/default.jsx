import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import { createMarkup } from '../../utilities/helpers'
import customFields from './_dependencies/custom-fields'
import AdsChild from '../../global-components/ads'

const classes = {
  adsBox: 'flex items-center justify-center flex-col overflow-hidden',
}
@Consumer
class Ads extends PureComponent {
  render() {
    const {
      isAdmin,
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

    return (
      <div
        className={`${
          classes.adsBox
        } ${columns} ${addRowsClass()} ${addEmptyBackground()}`}>
        <AdsChild {...params} />
        {freeHtml && <div dangerouslySetInnerHTML={createMarkup(freeHtml)} />}
      </div>
    )
  }
}

Ads.propTypes = {
  customFields,
}

Ads.label = 'Publicidad'

export default Ads
