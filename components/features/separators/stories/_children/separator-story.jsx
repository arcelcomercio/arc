import * as React from 'react'

import Image from '../../../../global-components/image'
import Icon from '../../../../global-components/multimedia-icon'
import { SITE_PERU21 } from '../../../../utilities/constants/sitenames'

const classes = {
  item: 'separator__item hidden w-full h-full p-0 position-relative',
  detail: 'separator__detail position-absolute bottom-0 pr-15 pl-15 pb-15',
  text: 'separator__title overflow-hidden text-white text-md line-h-sm',
  imgBox: 'p-0 m-0 w-full h-full overflow-hidden block',
  img: 'separator__img w-full h-full object-cover object-center',
  icon: `separator__icon`,
  article: `separator__article h-full`,
}

const SeparatorsBasicChildSeparatorStory = ({
  title,
  websiteLink,
  multimediaType,
  imageUrl,
  author,
  authorLink,
  isAuthorVisible,
  isImageVisible,
  arcSite,
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
    <div className={classes.item}>
      <article role="listitem" className={classes.article}>
        <Icon type={multimediaType} iconClass={classes.icon} />
        <div className={classes.detail}>
          <a
            itemProp="url"
            className="separator__title-link"
            href={websiteLink}>
            <h3 itemProp="name" className={classes.text}>
              {title}
            </h3>
          </a>
          {isAuthorVisible && (
            <h2 itemProp="name">
              <a
                itemProp="url"
                href={authorLink}
                className="block text-sm uppercase text-gray-200 mt-10 mb-20">
                {author}
              </a>
            </h2>
          )}
        </div>
        {isImageVisible && (
          <a
            itemProp="url"
            className="separator__img-link block h-full"
            href={websiteLink}>
            <Image
              src={imageUrl}
              width={width}
              height={height}
              sizes={sizes}
              alt={title}
              className={classes.img}
              pictureClassName={classes.imgBox}
              loading="lazy"
            />
          </a>
        )}
      </article>
    </div>
  )
}

export default React.memo(SeparatorsBasicChildSeparatorStory)