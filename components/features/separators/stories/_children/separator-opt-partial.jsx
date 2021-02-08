import * as React from 'react'

import Icon from '../../../../global-components/multimedia-icon'
import Image from '../../../../global-components/image'
import { SITE_PERU21 } from '../../../../utilities/constants/sitenames'


const SeparatorOptPartial = ({
  websiteLink,
  multimediaType,
  title,
  imageUrl,
  isAuthorVisible,
  authorLink,
  author,
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
    <div
      role="listitem"
      className={`sep-opt__item block position-relative mb-20 md:mb-10 bg-base-300 ${
        index === 0 ? '' : 'md:ml-5'
      }`}>
      <Icon type={multimediaType} iconClass="sep-opt__icon" />
      {isImageVisible ? 
        <Image
          src={imageUrl}
          width={width}
          height={height}
          sizes={sizes}
          alt={title}
          className='sep-opt__img w-full object-cover'
          loading="lazy"
          pictureClassName="block"
        /> : null}
      <h3
        itemProp="name"
        className="sep-opt__title overflow-hidden font-bold line-h-sm bottom-0 m-10">
        {title}
      </h3>
      {isAuthorVisible && author ? (
        <a
          itemProp="url"
          href={authorLink}
          className="z-10 position-relative block text-sm uppercase text-gray-200 ml-15 br-15 mt-0 mb-20">
          {author}
        </a>
      ) : null}
      <a
        itemProp="url"
        className="font-0 position-absolute h-full w-full top-0"
        href={websiteLink}>
        {title}
      </a>
    </div>
)}

export default React.memo(SeparatorOptPartial)