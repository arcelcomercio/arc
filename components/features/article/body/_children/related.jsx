import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import { getIcon } from '../../../../utilities/helpers'
import StoryData from '../../../../utilities/story-data'
// Basic flex stuff
const classes = {
  related: 'related-content',
  relatedItem: 'related-content__item',
  relatedTitleItem: 'related-content__title--item',
  relatedTitle: 'related-content__title',
  relatedMultimedia: 'related-content__multimedia',
  relatedIcon: 'related-content__icon',
  relatedAuthor: 'related-content__author',
}
@Consumer
class RelatedContent extends Component {
  renderRelatedContentElement = data => {
    const { arcSite } = this.props
    const get = new StoryData(data, arcSite)
    const filterData = {
      title: {
        nameTitle: get.title,
        urlTitle: get.link,
      },
      author: { nameAuthor: get.author, nameAuthorLink: get.authorLink },
      multimedia: {
        multimediaType: get.multimediaType,
        multimediaImg: get.multimedia,
      },
    }
    const { author, multimedia, title } = filterData

    return (
      <article className={classes.relatedItem}>
        <div className={`${classes.relatedTitleItem}`}>
          <h2>
            <a href={title.urlTitle}>{title.nameTitle}</a>
          </h2>
        </div>
        <figure className={classes.relatedMultimedia}>
          <a href={title.urlTitle}>
            <img src={multimedia.multimediaImg} alt={title.nameTitle} />
            {multimedia.multimediaType === 'basic' ||
            multimedia.multimediaType === '' ? (
              ''
            ) : (
              <span className={classes.relatedIcon}>
                {getIcon(multimedia.multimediaType)}
              </span>
            )}
          </a>
          {/* <Icon iconClass={story.iconClass} /> */}
        </figure>
        <div className={classes.relatedAuthor}>
          <a href={author.nameAuthorLink}>{author.nameAuthor}</a>
        </div>
      </article>
    )
  }

  render() {
    const { stories: data } = this.props
    return (
      <div className={classes.related}>
        <div className={classes.relatedTitle}>Relacionadas</div>
        {data.map(item => this.renderRelatedContentElement(item))}
      </div>
    )
  }
}

export default RelatedContent
