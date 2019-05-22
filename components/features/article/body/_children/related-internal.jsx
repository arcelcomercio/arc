import React, { Fragment } from 'react'
import UtilListKey from '../../../../utilities/list-keys'
import StoryData from '../../../../utilities/story-data'
import { getIcon } from '../../../../utilities/helpers'

// Basic flex stuff
const classes = {
  related: 'related-interna',
  relatedItem: 'related-interna__item',
  relatedTitleItem: 'related-interna__title-item',
  relatedTitle: 'related-interna__title',
  relatedMultimedia: 'related-interna__multimedia',
  relatedLink: 'related-interna__multimedia-link',
  relatedImage: 'related-interna__multimedia-img',
  relatedIcon: 'related-interna__multimedia-icon icon-',
  relatedInfo: 'related-interna__information',
}

const RelartedItem = ({ data, arcSite }) => {
  const get = new StoryData(data, arcSite)
  const filterData = {
    title: {
      nameTitle: get.title,
      urlTitle: get.link,
    },
    multimedia: {
      multimediaType: get.multimediaType,
      multimediaImg: get.multimedia,
    },
  }
  const { multimedia, title } = filterData

  return (
    <Fragment>
      <div className={`${classes.relatedInfo}`}>
        <h2 className={`${classes.relatedTitleItem}`}>
          <a href={title.urlTitle}>{title.nameTitle}</a>
        </h2>
      </div>
      <figure className={classes.relatedMultimedia}>
        <a href={title.urlTitle} className={classes.relatedLink}>
          <img
            src={multimedia.multimediaImg}
            alt={title.nameTitle}
            className={classes.relatedImage}
          />
          {multimedia.multimediaType === 'basic' ||
          multimedia.multimediaType === '' ? (
            ''
          ) : (
            <span
              className={`${classes.relatedIcon}${getIcon(
                multimedia.multimediaType
              )}`}
            />
          )}
        </a>
        {/* <Icon iconClass={story.iconClass} /> */}
      </figure>
    </Fragment>
  )
}

const ArticleBodyChildRelatedInternal = ({
  stories,
  data: { _id: id },
  arcSite,
}) => {
  return (
    <div className={classes.related}>
      <div className={classes.relatedTitle}>Siga Leyendo </div>
      {stories.map((item, index) =>
        item._id === id ? (
          <RelartedItem
            key={UtilListKey(index)}
            data={item}
            arcSite={arcSite}
          />
        ) : null
      )}
    </div>
  )
}

export default ArticleBodyChildRelatedInternal
