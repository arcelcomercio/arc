import * as React from 'react'

import Image from '../../../../global-components/image'
import {
  SITE_GESTION,
  SITE_ELCOMERCIO,
} from '../../../../utilities/constants/sitenames'

const classes = {
  item: 'story-interest__item w-full mb-40',
  detail: 'story-interest__detail w-full pl-10 pr-10 pt-10',
  separatorCategory:
    'story-interest__category mb-10 lg:text-center hidden md:block',
  separatorCategoryLink: 'story-interest__category-link text-xl',
  separatorTitle: 'story-interest__title overflow-hidden lg:text-center',
  titleLink:
    'story-interest__title-link text-md text-white line-h-sm font-bold',
  link: '',
  itemImage: 'story-interest__img w-full h-full object-cover',
  figure: 'story-interest__figure hidden md:block',
  iconImagePremium: 'story-interest__icon-premium mr-15 position-relative',
}

const StorySeparatorChildItem = ({
  title,
  link,
  section,
  sectionLink,
  multimedia,
  multimediaType,
  isPremium,
  arcSite,
  logo = '',
}) => {
  const isGestion = arcSite === SITE_GESTION
  return (
    <li className={classes.item}>
      {multimediaType === 'video' && <span>&#8227;</span>}
      {multimediaType === 'gallery' && <span>G</span>}
      {link && (
        <a itemProp="url" href={link}>
          <figure className={classes.figure}>
            <Image
              src={multimedia}
              width={314}
              height={157}
              alt={title}
              className={classes.itemImage}
              loading="lazy"
            />
          </figure>
        </a>
      )}

      <div className={classes.detail}>
        {arcSite !== SITE_ELCOMERCIO ? (
          <>
            <h2 itemProp="name" className={classes.separatorCategory}>
              {isPremium && isGestion && (
                <img
                  className={classes.iconImagePremium}
                  src={logo}
                  alt="premium"
                />
              )}
              <a
                itemProp="url"
                href={sectionLink}
                className={classes.separatorCategoryLink}>
                {section}
              </a>
            </h2>
          </>
        ) : null}
        <h3 itemProp="name" className={classes.separatorTitle}>
          <a itemProp="url" className={classes.titleLink} href={link}>
            {title}
          </a>
        </h3>
      </div>
    </li>
  )
}

export default React.memo(StorySeparatorChildItem)
