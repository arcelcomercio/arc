import React, { PureComponent } from 'react'

import DataStory from '../../resources/components/utils/data-story'
import { reduceWord, formatDate, getIcon } from '../utilities/helpers'

const clases = {
  storyItem: 'story-item',
  storyItemTop: 'story-item__top',
  storyItemSection: 'story-item__section',
  storyItemDate: 'story-item__date',
  storyItemBottom: 'story-item__bottom',
  storyItemLeft: 'story-item__left',
  storyItemTitle: 'story-item__title',
  storyItemSubtitle: 'story-item__subtitle',
  storyItemAuthor: 'story-item__author',
  storyItemRight: 'story-item__right',
  storyItemIcon: 'story-item__icon',
  storyItemFigure: 'story-item__figure',
}

class StoriesList extends PureComponent {
  render() {
    const { arcSite, data, formato } = this.props
    const element = new DataStory(data, arcSite)

    return (
      <div
        className={`${clases.storyItem} ${
          formato && formato === 'row' ? 'story-item--row' : ''
        }`}>
        <div className={clases.storyItemTop}>
          <a href={element.sectionLink} className={clases.storyItemSection}>
            {element.section}
          </a>
          <p className={clases.storyItemDate}>{formatDate(element.date)}</p>
        </div>
        <div className={clases.storyItemBottom}>
          <div className={clases.storyItemLeft}>
            <div>
              <h2>
                <a className={clases.storyItemTitle} href={element.link}>
                  {element.title}
                </a>
              </h2>
              <p className={clases.storyItemSubtitle}>
                {reduceWord(element.subTitle)}
              </p>
            </div>
            <div>
              <a href={element.authorLink} className={clases.storyItemAuthor}>
                {element.author}
              </a>
            </div>
          </div>
          <div className={clases.storyItemRight}>
            <a href={element.link}>
              {element.multimediaType === 'basic' ||
              element.multimediaType === '' ? (
                ''
              ) : (
                <span className={clases.storyItemIcon}>
                  {getIcon(element.multimediaType)}
                </span>
              )}
              <img
                alt={element.title}
                className={clases.storyItemFigure}
                src={element.multimedia}
              />
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default StoriesList
