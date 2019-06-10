import React from 'react'
import EmbedMultimedia from './embed-multimedia'
import { getIcon } from '../utilities/helpers'
// import { AsyncResource } from 'async_hooks'
// FIXME: La línea de arriba no se usa, se puede eliminar?

const classes = {
  extraordinaryStory: `extraordinary-story padding-normal`,
  extraordinaryStorySection:
    'extraordinary-story__section text-left capitalize',
  extraordinaryStoryContent: 'extraordinary-story__content block',
  extraordinaryStoryTitle: 'extraordinary-story__title title',
  oneline: 'extraordinary-story-oneline',
  twoline: 'extraordinary-story-twoline',
  threeline: 'extraordinary-story-threeline',
  extraordinaryStorySubtitle: 'extraordinary-story__subtitle',
  extraordinaryStoryLink: 'extraordinary-story__link',
  extraordinaryStoryAuthor: 'extraordinary-story__author',
  extraordinaryStoryMultimedia: 'extraordinary-story__multimedia',
  iconGallery: 'extraordinary-story__icon-gallery',
  iconGalleryContainer: 'extraordinary-story__icon-gallery-container',
}

const getMultimediaIcon = mediaType => {
  if (mediaType === 'G') {
    return (
      <span className={`${classes.iconGallery}-G`}>
        <span className={`${classes.iconGalleryContainer}-G`}>
          <i>{mediaType}</i>
        </span>
      </span>
    )
  }
  return null
}
const ExtraordinaryStory = props => {
  const {
    data,
    multimediaOrientation = 'bottom',
    contentOrientation = 'left',
    isSection = false,
    multimediaType,
    deployment,
    contextPath,
    arcSite,
  } = props

  let numline = ''
  switch (arcSite) {
    case 'elcomercio':
      numline = classes.threeline
      break
    case 'depor':
      numline = classes.twoline
      break
    default:
      numline = classes.twoline
      break
  }

  return (
    <div
      className={`${
        classes.extraordinaryStory
      } extraordinary-story--${multimediaOrientation} text-${contentOrientation}`}>
      {!isSection && (
        <div className={classes.extraordinaryStorySection}>
          <a href={data.sectionLink}>{data.section}</a>
        </div>
      )}
      <div className={classes.extraordinaryStoryContent}>
        <div className={`${classes.extraordinaryStoryTitle} ${numline}`}>
          <a href={data.link}>{data.title}</a>
        </div>
        <div className={classes.extraordinaryStorySubtitle}>
          <a href={data.link} className={classes.extraordinaryStoryLink}>
            {data.subTitle}
          </a>
        </div>
        <div className={classes.extraordinaryStoryAuthor}>
          <a href={data.authorLink}>{data.author}</a>
        </div>
      </div>
      <div className={classes.extraordinaryStoryMultimedia}>
        <EmbedMultimedia
          type={data.typeMultimediaGeneral}
          title={data.title}
          source={data.sourceMultimedia}
          deployment={deployment}
          contextPath={contextPath}
          website={arcSite}
        />
        {getMultimediaIcon(getIcon(multimediaType))}
      </div>
    </div>
  )
}

export default ExtraordinaryStory
