import React from 'react'
import EmbedMultimedia from './embed-multimedia'
import { GALLERY } from '../utilities/constants/multimedia-types'
import Icon from './multimedia-icon'

const classes = {
  extraordinaryStory: `extraordinary-story bg-white flex border-gray`,
  section: `extraordinary-story__section uppercase pt-20 pr-20 pl-20 pb-10 text-white`,
  sectionLink: 'extraordinary-story__section-link',
  content: 'extraordinary-story__content block pr-20 pl-20 position-relative',
  groupContent: 'extraordinary-story__group-content w-full',
  title: `extraordinary-story__title title-lg overflow-hidden line-h-sm mb-20`,
  titleLink: 'extraordinary-story__title-link',
  oneline: 'extraordinary-story--oneline',
  twoline: 'extraordinary-story--twoline',
  threeline: 'extraordinary-story--threeline',
  // extraordinaryStorySubtitle:
  // 'extraordinary-story__subtitle mb-15 text-gray-200 line-h-sm overflow-hidden',
  link: 'extraordinary-story__link',
  // extraordinaryStoryAuthor: 'uppercase mb-15  text-xs',
  authorLink: 'extraordinary-story__author-link text-gray-200',
  multimedia: `extraordinary-story__multimedia w-full h-full block bg-gray-300 position-relative`,
}

const ExtraordinaryStory = props => {
  const {
    data,
    multimediaType,
    deployment,
    contextPath,
    arcSite,
    multimediaOrientation = 'bottom',
    contentOrientation = 'left',
    isSection = false,
    showExtraordinaryStory,
  } = props

  // TODO: Mejorar el uso de clases por orientación
  const extraordinaryStoryAuthor = 'uppercase mb-15  text-xs'
  const extraordinaryStorySubtitle =
    'extraordinary-story__subtitle text-gray-200 line-h-sm overflow-hidden'

  if (multimediaOrientation === 'left' || multimediaOrientation === 'right') {
    classes.extraordinaryStoryAuthor = `${extraordinaryStoryAuthor} extraordinary-story__author`
    classes.extraordinaryStorySubtitle = `${extraordinaryStorySubtitle} mb-15`
  } else {
    classes.extraordinaryStoryAuthor = extraordinaryStoryAuthor
    classes.extraordinaryStorySubtitle = `${extraordinaryStorySubtitle} mb-25`
  }

  let numline = ''
  switch (arcSite) {
    case 'elcomercio':
      numline = classes.threeline
      break
    case 'depor':
      numline = classes.twoline
      break
    default:
      numline = classes.threeline
      break
  }

  return (
    <>
      {showExtraordinaryStory && (
        <article
          className={`${classes.extraordinaryStory} extraordinary-story--${multimediaOrientation} text-${contentOrientation}`}>
          <div className={classes.groupContent}>
            {!isSection && (
              <p itemProp="description" className={classes.section}>
                <a
                  href={data.primarySectionLink}
                  className={classes.sectionLink}>
                  {data.primarySection}
                </a>
              </p>
            )}
            <div className={classes.content}>
              <h2 itemProp="name" className={`${classes.title} ${numline}`}>
                <a
                  itemProp="url"
                  href={data.link}
                  className={classes.titleLink}>
                  {data.title}
                </a>
              </h2>
              <p
                itemProp="description"
                className={classes.extraordinaryStorySubtitle}>
                <a itemProp="url" href={data.link} className={classes.link}>
                  {data.subTitle}
                </a>
              </p>
              <address className={classes.extraordinaryStoryAuthor}>
                <a
                  itemProp="url"
                  href={data.authorLink}
                  className={classes.authorLink}>
                  {data.author}
                </a>
              </address>
            </div>
          </div>
          <div className={classes.multimedia}>
            <EmbedMultimedia
              type={data.typeMultimediaGeneral}
              title={data.title}
              source={data.sourceMultimedia}
              deployment={deployment}
              contextPath={contextPath}
              website={arcSite}
              linkStory={data.link}
            />
            {multimediaType === { GALLERY }.GALLERY && (
              <Icon
                type={multimediaType}
                iconClass="extraordinary-story__icon"
              />
            )}
          </div>
        </article>
      )}
    </>
  )
}

export default ExtraordinaryStory
