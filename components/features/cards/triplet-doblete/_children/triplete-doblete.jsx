import { useEditableContent } from 'fusion:content'
import React from 'react'

import Image from '../../../../global-components/image'
import Icon from '../../../../global-components/multimedia-icon'

export default (props) => {
  const {
    lines,
    index,
    websiteLink,
    title,
    titleHeader = '',
    author,
    authorLink,
    multimedia,
    multimediaType,
    invertedColor = false,
    hideAuthor = false,
    viewDoblete = false,
    multimediaOrientation = 'right',
    adSpace = '',
  } = props

  const classes = {
    twolines: 'triplet-doblete--twoline',
    threelines: 'triplet-doblete--threeline',
    item: `triplet-doblete__item flex justify-between triplet-doblete__item--${multimediaOrientation}`,
    itemDoblete: 'triplet-doblete__item-doblete',
    itemInverted: 'triplet-doblete__item--inverted',
    itemDoubletInverted: 'doublet__item--inverted',
    header: 'triplet-doblete__header',
    headerDoblete: 'triplet-doblete__header-doblete',
    title: 'triplet-doblete__title overflow-hidden text-lg line-h-sm',
    titleLink: 'triplet-doblete__title-link',
    titleLine: 'triplet-doblete__title-line',
    titleLineDoblete: 'triplet-doblete__title-line-doblete',
    oneline: 'triplet-doblete--oneline',
    author: 'triplet-doblete__author uppercase text-xs',
    authorLink: 'triplet-doblete__link',
    multimedia: 'triplet-doblete__multimedia overflow-hidden',
    multimediaDoblete: 'triplet-doblete__multimedia-doblete overflow-hidden',
    mLink: 'w-full h-full block position-relative',
    image: 'object-cover w-full h-full',
    icon: `triplet-doblete__icon`,
    information: `triplet-doblete__information flex flex-col`,
    informationDoblete: `triplet-doblete__information-doblete flex flex-col`,
  }

  const { editableField } = useEditableContent()

  return adSpace ? (
    <div dangerouslySetInnerHTML={{ __html: adSpace }} />
  ) : (
    <article
      className={`${classes.item} ${viewDoblete && classes.itemDoblete} 
                  ${invertedColor && classes.itemInverted}
                  ${
                    viewDoblete && invertedColor && classes.itemDoubletInverted
                  }`}
      role="listitem">
      <div
        className={`${classes.information} ${
          viewDoblete && classes.informationDoblete
        }`}>
        <h2
          itemProp="name"
          className={`${classes.title} ${classes[lines] || ''}`}>
          <a
            itemProp="url"
            className={`${classes.titleLink} 
            ${viewDoblete ? classes.titleLineDoblete : classes.titleLine}`}
            href={websiteLink}
            {...editableField(`title${index + 1}`)}
            suppressContentEditableWarning>
            {titleHeader.length > 0 && (
              <span
                className={`${classes.header} ${
                  viewDoblete && classes.headerDoblete
                }`}>
                {titleHeader} &#183;{' '}
              </span>
            )}
            {title}
          </a>
        </h2>
        {!hideAuthor && (
          <address className={classes.author}>
            <a
              itemProp="url"
              className={`${classes.authorLink}`}
              href={authorLink}>
              {author}
            </a>
          </address>
        )}
      </div>
      <figure
        className={`${classes.multimedia} ${
          viewDoblete && classes.multimediaDoblete
        }`}>
        <a itemProp="url" className={classes.mLink} href={websiteLink}>
          <Image
            src={multimedia}
            width={150}
            height={150}
            alt={title}
            className={classes.image}
            loading="lazy"
          />
          <Icon type={multimediaType} iconClass={classes.icon} />
        </a>
      </figure>
    </article>
  )
}
