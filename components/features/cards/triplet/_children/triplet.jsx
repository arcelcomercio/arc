import React from 'react'
import StoryData from '../../../../utilities/story-data'

export const TripletChildTriplet = props => {
  const { data = [], multimediaOrientation = 'right', arcSite } = props
  const classes = {
    triplet: 'triplet bg-white border-solid border-1 border-gray',
    link: 'triplet__link text-lg',
    item: `triplet__item p-15 grid border-b-1 border-solid border-gray triplet__item--${multimediaOrientation}`,
    title: 'triplet__title overflow-hidden font-bold',
    oneline: 'triplet--oneline',
    twoline: 'triplet--twoline',
    threeline: 'triplet--threeline',
    author: 'triplet__author uppercase pt-10 text-xs text-gray-200',
    authorLink: 'triplet__link',
    multimedia: 'triplet__multimedia',
    mLink: 'w-full h-full block position-relative',
    tripletIcon: `triplet__icon position-absolute flex items-center justify-center rounded text-black text-sm`,
    playIcon: 'icon-video title-sm',
    galleryIcon: 'icon-img title-sm',
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

  const getMultimediaIcon = multimediaType => {
    let icon
    switch (multimediaType) {
      case StoryData.VIDEO:
        icon = classes.playIcon
        break
      case StoryData.GALLERY:
        icon = classes.galleryIcon
        break
      default:
        return ''
    }
    return (
      <span className={classes.tripletIcon}>
        <i className={icon} />
      </span>
    )
  }

  return (
    <div className={classes.triplet}>
      {data.map(story => (
        <article className={classes.item} key={`triplet-${story.index}`}>
          <div className={`${classes.title} ${numline}`}>
            <h2>
              <a className={classes.link} href={story.link}>
                {story.title}
              </a>
            </h2>
          </div>
          <figure className={classes.multimedia}>
            <a className={classes.mLink} href={story.link}>
              <img
                className="object-cover w-full h-full"
                src={story.multimedia}
                alt={story.title}
              />
              {story.multimediaType === 'basic' || story.multimediaType === ''
                ? ''
                : getMultimediaIcon(story.multimediaType)}
            </a>
            {/* <Icon iconClass={story.iconClass} /> */}
          </figure>
          <div className={classes.author}>
            <a className={classes.authorLink} href={story.authorOrSectionLink}>
              {story.authorOrSection}
            </a>
          </div>
        </article>
      ))}
    </div>
  )
}

export const Icon = props => {
  const classes = {
    tripletBoxIcon:
      'triplet__box-icon bg-white position-absolute text-center rounded text-gray-300',
    tripletIcon:
      'triplet__icon position-absolute flex items-center justify-center rounded text-black text-xs',
  }

  const html = (
    <span className={`${classes.tripletBoxIcon}`}>
      <i
        className={`${classes.tripletIcon} ${classes.tripletIcon}--${
          props.iconClass
        }`}
      />
    </span>
  )
  return props.iconClass ? html : ''
}
