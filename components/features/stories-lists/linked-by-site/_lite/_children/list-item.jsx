import * as React from 'react'

import Image from '../../../../../global-components/image'

const classes = {
  listItem: 'link-site__item f mb-15',
  picture: 'link-site__pic',
  listItemTitle: 'link-site__title-link oflow-h ',
  image: 'link-site__image',
  imageContainer: 'link-site__image-container position-relative',
  iconContainer: 'link-site__icon-container mr-5 mt-5',
  iconImagePremium: 'link-site__icon-premium',
}

const StoriesListLinkedBySiteChildItem = ({
  title,
  websiteLink,
  multimedia,
  logo,
  isTargetBlank,
  isGestion,
  isPremium = false,
}) => {
  return (
    <a
      itemProp="url"
      className={classes.listItem}
      key={websiteLink}
      href={websiteLink}
      target={isTargetBlank ? '_blank' : null}
      rel={isTargetBlank ? 'noopener' : null}>
      <div className={classes.imageContainer}>
        {isPremium && isGestion && (
          <div className={classes.iconContainer}>
            <img
              className={classes.iconImagePremium}
              src={logo}
              alt="premium"
            />
          </div>
        )}
        <Image
          src={multimedia}
          width={234}
          height={161}
          alt={title}
          className={classes.image}
          loading="lazy"
          pictureClassName={classes.picture}
        />
      </div>
      <h2 itemProp="name" className={classes.listItemTitle}>
        {title}
      </h2>
    </a>
  )
}

export default React.memo(StoriesListLinkedBySiteChildItem)
