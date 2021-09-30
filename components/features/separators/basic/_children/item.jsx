import * as React from 'react'

import Icon from '../../../../global-components/multimedia-icon'
import { SITE_DIARIOCORREO } from '../../../../utilities/constants/sitenames'

const classes = {
  item: 'separator__item hidden w-full h-full p-0 position-relative',
  detail: 'separator__detail position-absolute bottom-0 pr-15 pl-15 pb-15',
  text: 'separator__title overflow-hidden text-white text-md line-h-sm',
  imgBox: 'p-0 m-0 w-full h-full overflow-hidden',
  img: 'separator__img w-full h-full object-cover object-center',
  icon: `separator__icon`,
  article: `separator__article h-full`,
  section: 'separator__section pt-5 mt-10 uppercase',
  linkImg: 'block w-full h-full',
}

export default ({
  title,
  imageUrl,
  lazyImage,
  mediaIcon,
  link,
  section,
  sectionLink,
  numline,
  isPremium,
  isAdmin,
  arcSite,
}) => {
  const shouldRenderPremiumTag = isPremium && arcSite === SITE_DIARIOCORREO

  return (
    <div href={link} className={classes.item}>
      <article role="listitem" className={classes.article}>
        <Icon type={mediaIcon} iconClass={classes.icon} />
        <div className={classes.detail}>
          <h3 itemProp="name">
            <a
              itemProp="url"
              className={`${classes.text} ${numline}`}
              href={link}>
              {shouldRenderPremiumTag ? (
                <>
                  {title}&nbsp;<span style={{ color: '#FFD333' }}>★</span>
                </>
              ) : (
                title
              )}
            </a>
          </h3>
          <a itemProp="url" href={sectionLink} className={classes.section}>
            {section}
          </a>
        </div>
        <figure className={classes.imgBox}>
          <a itemProp="url" href={link} className={classes.linkImg}>
            <img
              src={isAdmin ? imageUrl : lazyImage}
              data-src={imageUrl}
              alt={title}
              className={`${isAdmin ? '' : 'lazy'} ${classes.img}`}
            />
          </a>
        </figure>
      </article>
    </div>
  )
}
