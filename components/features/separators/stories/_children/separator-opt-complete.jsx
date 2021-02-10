import * as React from 'react'

import Icon from '../../../../global-components/multimedia-icon'
import Image from '../../../../global-components/image'
import { SITE_PERU21 } from '../../../../utilities/constants/sitenames'

const SeparatorOptComplete = ({
  websiteLink,
  multimediaType,
  title,
  imageUrl,
  index,
  isImageVisible,
  arcSite
}) => {
  let width
  let height
  let sizes
  switch (arcSite) {
    case SITE_PERU21:
      width = 314
      height = 374
      sizes = ''
      break;
    default:
      width = 234
      height = 161
      sizes = '(max-width: 639px) 640px, 234px'
      break;
  }

  return (
  <a
    itemProp="url"
    href={websiteLink}
    className={`sep-opt__item gradient block position-relative mb-20 md:mb-10 ${
      index === 0 ? '' : 'md:ml-5'
    }`}>
    <Icon type={multimediaType} iconClass="sep-opt__icon" />

    <h3
      itemProp="name"
      className="sep-opt__title position-absolute overflow-hidden font-bold text-white line-h-sm bottom-0 m-15">
      {title}
    </h3>
    {isImageVisible ? 
      <Image 
        src={imageUrl}
        width={width}
        height={height}
        sizes={sizes}
        alt={title}
        className='sep-opt__img w-full md:h-full object-cover'
        loading="lazy"
      /> : null}
  </a>
)}

export default React.memo(SeparatorOptComplete)