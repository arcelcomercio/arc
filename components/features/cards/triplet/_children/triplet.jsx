import * as React from 'react'
import PropTypes from 'prop-types'
import { useEditableContent } from 'fusion:content'

import Icon from '../../../../global-components/multimedia-icon'
import Image from '../../../../global-components/image'

const TripletChildTriplet = props => {
  const {
    lines,
    index,
    websiteLink,
    title,
    authorOrSection,
    authorOrSectionLink,
    multimedia,
    multimediaType,
    multimediaOrientation = 'right',
    adSpace = '',
  } = props

  const classes = {
    twolines: 'triplet--twoline',
    threelines: 'triplet--threeline',
    item: `triplet__item flex justify-between border-b-1 border-solid border-base pt-15 pb-15 triplet__item--${multimediaOrientation}`,
    title: 'triplet__title overflow-hidden text-lg line-h-sm',
    titleLink: 'triplet__title-link',
    oneline: 'triplet--oneline',
    author: 'triplet__author uppercase text-xs',
    authorLink: 'triplet__link text-gray-200',
    multimedia: 'triplet__multimedia overflow-hidden',
    mLink: 'w-full h-full block position-relative',
    image: 'object-cover w-full h-full',
    icon: `triplet__icon`,
    information: `triplet__information flex justify-between flex-col`,
  }

  const { editableField } = useEditableContent()

  return adSpace ? (
    <div dangerouslySetInnerHTML={{ __html: adSpace }} />
  ) : (
    <article
      className={classes.item}
      role="listitem"
      >
      <div className={classes.information}>
        <h2 itemProp="name" className={`${classes.title} ${classes[lines] || ''}`}>
          <a
            itemProp="url"
            className={classes.titleLink}
            href={websiteLink}
            {...editableField(`title${index + 1}`)}
            suppressContentEditableWarning>
            {title}
          </a>
        </h2>
        <address className={classes.author}>
          <a
            itemProp="url"
            className={classes.authorLink}
            href={authorOrSectionLink}>
            {authorOrSection}
          </a>
        </address>
      </div>
      <figure className={classes.multimedia}>
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

TripletChildTriplet.propTypes = {
  arcSite: PropTypes.string,
  index: PropTypes.string,
  lines: PropTypes.string,
  websiteLink: PropTypes.string,
  title: PropTypes.string,
  multimedia: PropTypes.string,
  multimediaType: PropTypes.string,
  authorOrSection: PropTypes.string,
  authorOrSectionLink: PropTypes.string,
  multimediaOrientation: PropTypes.string,
  adSpace: PropTypes.string,
}

export default React.memo(TripletChildTriplet)
