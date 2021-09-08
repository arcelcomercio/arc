import React from 'react'
import { useEditableContent } from 'fusion:content'

import Icon from '../../../../global-components/multimedia-icon'
import Image from '../../../../global-components/image'

export default props => {
  const {
    lines,
    index,
    websiteLink,
    title,
    authorOrSection,
    authorOrSectionLink,
    multimedia,
    multimediaType,
    invertedColor = false,
    viewDoblete = false,
    multimediaOrientation = 'right',
    adSpace = '',
  } = props

  const classes = {
    twolines: 'triplet-doblete--twoline',
    threelines: 'triplet-doblete--threeline',
    item: `triplet-doblete__item flex justify-between triplet-doblete__item--${multimediaOrientation}`,
    title: 'triplet-doblete__title overflow-hidden text-lg line-h-sm',
    titleDoblete: 'triplet-doblete__title-doblete overflow-hidden text-lg line-h-sm',
    titleLink: 'triplet-doblete__title-link',
    titleLine: 'triplet-doblete__title-line',
    titleLineDoblete: 'triplet-doblete__title-line-doblete',
    oneline: 'triplet-doblete--oneline',
    author: 'triplet-doblete__author uppercase text-xs',
    authorLink: 'triplet-doblete__link text-gray-200',
    authorLinkInvertedColor: 'triplet-doblete__link__inverted-color',
    multimedia: 'triplet-doblete__multimedia overflow-hidden',
    multimediaDoblete: 'triplet-doblete__multimedia-doblete overflow-hidden',
    mLink: 'w-full h-full block position-relative',
    image: 'object-cover w-full h-full',
    icon: `triplet-doblete__icon`,
    information: `triplet-doblete__information flex flex-col`,
    informationDoblete: `triplet-doblete__information-doblete flex flex-col`,
    informationInvertColor: `triplet-doblete__information__inverted-color`,
  }

  const { editableField } = useEditableContent()

  return adSpace ? (
    <div dangerouslySetInnerHTML={{ __html: adSpace }} />
  ) : (
    <article
      className={classes.item}
      role="listitem"
    >
      <div className={`${(viewDoblete) ? classes.informationDoblete : classes.information} 
                        ${(invertedColor) && classes.informationInvertColor}`}>
        <h2 itemProp="name" className={`${(viewDoblete) ? classes.titleDoblete : classes.title} ${classes[lines] || ''}`}>
          <a
            itemProp="url"
            className={`${classes.titleLink} 
            ${(viewDoblete) ? classes.titleLineDoblete : classes.titleLine}`}
            href={websiteLink}
            {...editableField(`title${index + 1}`)}
            suppressContentEditableWarning>
            {title}
          </a>
        </h2>
        <address className={classes.author}>
          <a
            itemProp="url"
            className={`${classes.authorLink} ${(invertedColor) && classes.authorLinkInvertedColor}`}
            href={authorOrSectionLink}>
            {authorOrSection}
          </a>
        </address>
      </div>
      <figure className={`${(viewDoblete) ? classes.multimediaDoblete : classes.multimedia}`}>
        <a
          itemProp="url"
          className={classes.mLink}
          href={websiteLink}>
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
