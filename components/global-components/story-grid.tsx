import React from 'react'

import { formatDateLocalTimeZoneFull } from '../utilities/helpers'
// import { alignmentClassesPropType } from '@arc-core-components/feature_article-body/build/helpers'
import Image from './image'
import Icon from './multimedia-icon'

const classes = {
  storyGrid:
    'story-grid w-full pr-20 pl-20 pb-20 mb-20 border-b-1 md:pl-0 md:pr-0',
  info: 'story-grid__info flex',
  dateTime: 'story-grid__date-time hidden',
  top: 'story-grid__top position-relative overflow-hidden',
  topLink: 'story-grid_top-link h-full',
  icon:
    'story-grid__icon position-absolute flex items-center justify-center text-white w-full h-full',
  img: 'story-grid__img object-cover object-center w-full h-full',
  bottom: 'story-grid__bottom flex-col justify-between',
  sectionWrapper: 'story-grid__wrapper-section flex items-center hidden',
  section: 'story-grid__section text-black',
  date: 'story-grid__date font-thin ml-5 text-xs text-gray-300 md:mt-5 md:ml-0',
  titleWrapper: 'story-grid__wrapper-title flex w-full',
  titleContent: 'story-grid__content-title overflow-hidden',
  title: 'story-grid__title block overflow-hidden mt-10',
  subtitle: 'story-grid__subtitle overflow-hidden hidden mt-10 mb-10 text-md',
  authorWrapper: 'story-grid__author-wrapper hidden',
  author: 'story-grid__author block uppercase mt-10',
}

interface Props {
  index: number
  isAdmin: boolean
  primarySectionLink: string
  primarySection: string
  date: string
  websiteLink: string
  title: string
  titleHeader: string
  subTitle: string
  authorLink: string
  author: string
  multimedia: string
  multimediaType: string
  multimediaCaption: string
}

const StoryGrid: React.FC<Props> = ({
  index,
  isAdmin,
  primarySectionLink,
  primarySection,
  date,
  websiteLink,
  title,
  titleHeader,
  subTitle,
  authorLink,
  author,
  multimedia,
  multimediaType,
  multimediaCaption,
}) => {
  const imageWidth = 314
  const imageHeight = 157
  const imageMobileWidth = 314
  const imageMobileHeight = 182

  return (
    <div className={classes.storyGrid}>
      <div className={classes.info}>
        <div className={classes.dateTime}>
          <p itemProp="description" className={classes.date}>
            {formatDateLocalTimeZoneFull(date, '.', false, 'DD-MM-YYYY')}
          </p>
        </div>

        <figure className={classes.top}>
          <a itemProp="url" href={websiteLink} className={classes.topLink}>
            <Image
              src={multimedia}
              alt={multimediaCaption || title}
              height={imageHeight}
              width={imageWidth}
              sizes={`(max-width: 639px) ${imageMobileWidth}px, ${imageWidth}px`}
              sizesHeight={[imageMobileHeight]}
              className={classes.img}
              loading={isAdmin ? 'auto' : 'lazy'}
              uid={index}>
              <Icon type={multimediaType} iconClass={classes.icon} />
            </Image>
          </a>
        </figure>

        <div className={classes.bottom}>
          <div className={classes.sectionWrapper}>
            <a
              itemProp="url"
              href={primarySectionLink}
              className={classes.section}>
              {primarySection}
            </a>
            <p itemProp="description" className={classes.date}>
              {formatDateLocalTimeZoneFull(date, '.', false, 'DD-MM-YYYY')}
            </p>
          </div>

          <div className={classes.titleWrapper}>
            <h2 itemProp="name" className={classes.titleContent}>
              <a itemProp="url" className={classes.title} href={websiteLink}>
                <span className="hidden">{titleHeader}</span>
                {title}
              </a>
            </h2>
            <p itemProp="description" className={classes.subtitle}>
              {subTitle}
            </p>
          </div>

          <div className={classes.authorWrapper}>
            <a itemProp="url" href={authorLink} className={classes.author}>
              {author}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoryGrid
