import * as React from 'react'

import Image from '../../../../global-components/image'

const classes = {
  card: 'editorial-card p-5',
  wrapper:
    'editorial-card__wrapper flex flex-col h-full pt-15 pr-10 pb-15 pl-20',
  group: 'editorial-card__group uppercase font-thin mb-5 text-xs',
  name: `editorial-card__name block uppercase primary-font font-bold mb-15 title-xs text-gray-300 line-h-xs`,
  description: 'flex',
  imageBox: 'flex position-relative items-start',
  image: 'editorial-card__image bg-white object-cover object-top rounded',
  detailsBox: 'pr-5 pl-10',
  title: `editorial-card__title block font-normal primary-font text-lg text-gray-300 line-h-sm`,
}

const OpinionGridEditorialCard = ({
  primarySection,
  websiteLink,
  title,
  author,
  subTitle,
  authorImage,
}) => {
  return (
    <div role="listitem" className={classes.card}>
      <div className={classes.wrapper}>
        <h4 itemProp="name" className={classes.group}>
          {primarySection}
        </h4>
        <h2 itemProp="name">
          <a itemProp="url" className={classes.name} href={websiteLink}>
            {title}
          </a>
        </h2>
        <div className={classes.description}>
          <div className={classes.imageBox}>
            <a itemProp="url" href={websiteLink}>
              <Image
                src={authorImage}
                width={100}
                height={100}
                alt={author}
                className={classes.image}
                loading="lazy"
              />
            </a>
          </div>
          <div className={classes.detailsBox}>
            <p itemProp="description" className={classes.title}>
              {subTitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(OpinionGridEditorialCard)
