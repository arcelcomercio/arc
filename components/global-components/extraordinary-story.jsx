import React from 'react'
import EmbedMultimedia from './embed-multimedia'
import ConfigParams from '../utilities/config-params'
import Icon from './multimedia-icon'

const classes = {
  extraordinaryStory: `extraordinary-story bg-white grid border-gray`,
  section:
    'extraordinary-story__section text-left uppercase font-bold pt-20 pr-20 pl-20 pb-10 text-white',
  sectionLink: 'extraordinary-story__section-link',
  content: 'extraordinary-story__content block pr-20 pl-20 position-relative',
  title:
    'extraordinary-story__title title-lg overflow-hidden font-bold line-h-sm mb-20',
  titleLink: 'extraordinary-story__title-link',
  oneline: 'extraordinary-story--oneline',
  twoline: 'extraordinary-story--twoline',
  threeline: 'extraordinary-story--threeline',
  // extraordinaryStorySubtitle:
  // 'extraordinary-story__subtitle mb-15 text-gray-200 line-h-sm overflow-hidden',
  link: 'extraordinary-story__link',
  // extraordinaryStoryAuthor: 'uppercase mb-15  text-xs',
  authorLink: 'extraordinary-story__author-link text-gray-200',
  multimedia:
    'extraordinary-story__multimedia h-full block bg-gray-300 position-relative',
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
      numline = classes.twoline
      break
  }
  return (
    <article
      className={`${
        classes.extraordinaryStory
      } extraordinary-story--${multimediaOrientation} text-${contentOrientation}`}>
      {!isSection && (
        <p className={classes.section}>
          <a href={data.sectionLink} className={classes.sectionLink}>
            {data.section}
          </a>
        </p>
      )}
      <div className={classes.content}>
        <h2 className={`${classes.title} ${numline}`}>
          <a href={data.link} className={classes.titleLink}>
            {data.title}
          </a>
        </h2>
        <p className={classes.extraordinaryStorySubtitle}>
          <a href={data.link} className={classes.link}>
            {data.subTitle}
          </a>
        </p>
        <address className={classes.extraordinaryStoryAuthor}>
          <a href={data.authorLink} className={classes.authorLink}>
            {data.author}
          </a>
        </address>
      </div>
      <div className={classes.multimedia}>
        <EmbedMultimedia
          type={data.typeMultimediaGeneral}
          title={data.title}
          source={data.sourceMultimedia}
          deployment={deployment}
          contextPath={contextPath}
          website={arcSite}
        />
        {multimediaType === ConfigParams.GALLERY && (
          <Icon type={multimediaType} />
        )}
      </div>
    </article>
  )
}

export default ExtraordinaryStory
