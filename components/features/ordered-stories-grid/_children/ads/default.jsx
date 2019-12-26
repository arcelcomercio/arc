import React from 'react'
import PropTypes from 'prop-types'
import { createMarkup, typeSpaceAdsDfp } from '../../../../utilities/helpers'
import Ads from '../../../../global-components/ads'

const OrderedStoriesGridAds = props => {
  const {
    adElement,
    isDesktop,
    isMobile,
    columns,
    rows,
    freeHtml,
    siteProperties: { isDfp = false },
    section_ads: sectionAds = [],
    metaValue = {},
  } = props

  const getSize = () => {
    let colCLass = ''
    if (columns === 'oneCol') colCLass = 'col-1'
    else if (columns === 'twoCol') colCLass = 'col-2'
    else if (columns === 'threeCol') colCLass = 'col-3'

    let rowClass = ''
    if (rows === 'oneRow') rowClass = 'row-1'
    else if (rows === 'twoRow') rowClass = 'row-2'

    if (colCLass || rowClass) return `${colCLass} ${rowClass}`
    return ''
  }

  const params = {
    adElement,
    isDesktop,
    isMobile,
    isDfp,
    sectionAds: typeSpaceAdsDfp(metaValue('id'), sectionAds, isDfp),
  }

  // TODO: Corregir el nodo duplicado de html
  return (
    <>
      <div className={`no-mobile ${getSize()}`}>
        <Ads {...params} />
        {freeHtml && <div dangerouslySetInnerHTML={createMarkup(freeHtml)} />}
      </div>
      {freeHtml && (
        <div
          className="no-desktop"
          dangerouslySetInnerHTML={createMarkup(freeHtml)}
        />
      )}
    </>
  )
}

OrderedStoriesGridAds.propTypes = {
  customFields: PropTypes.shape({
    adElement: PropTypes.string.isRequired,
    isDesktop: PropTypes.bool,
    isMobile: PropTypes.bool,
    columns: PropTypes.oneOf(['auto', 'oneCol', 'twoCol', 'threeCol']),
    rows: PropTypes.oneOf(['auto', 'oneRow', 'twoRow']),
  }),
}

export default OrderedStoriesGridAds
