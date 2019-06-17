import React, { PureComponent } from 'react'
// import { alignmentClassesPropType } from '@arc-core-components/feature_article-body/build/helpers'

import StoryData from '../utilities/story-data'
import { reduceWord, formatDate, getIcon } from '../utilities/helpers'

const classes = {
  storyItem: `story-item w-full pr-20 pl-20 pb-20 mb-20 border-b-1 border-solid`,
  top: 'story-item__top flex items-center',
  section: 'story-item__section uppercase text-sm text-black',
  date: 'story-item__date font-thin ml-5 text-xs text-gray-200',
  bottom: 'story-item__bottom flex mt-10',
  left: 'story-item__left flex flex-col justify-between pr-10 ',
  title: `story-item__title block overflow hidden secondary-font text-black text-xl`,
  subtitle: `story-item__subtitle hidden secondary-font mt-10 text-md text-gray-200 line-h-xs`,
  author: `story-item__author block uppercase mt-10 font-thin text-xs text-gray-200`,
  right: 'story-item__right position-relative',
  rightLink: 'flex h-full',
  icon: `story-item__icon position-absolute flex items-center justify-center rounded text-black text-sm`,
  figure: 'story-item__figure object-cover w-full h-full',
}

class StoriesList extends PureComponent {
  render() {
    const { data, deployment, contextPath, arcSite, formato } = this.props
    const element = new StoryData({
      data,
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'sm',
    })

    return (
      <div
        className={`${classes.storyItem} ${
          formato && formato === 'row' ? 'story-item--row' : ''
        }`}>
        <div className={classes.top}>
          <a href={element.sectionLink} className={classes.section}>
            {element.section}
          </a>
          <p className={classes.date}>{formatDate(element.date)}</p>
        </div>
        <div className={classes.bottom}>
          <div className={classes.left}>
            <div>
              <h2>
                <a className={classes.title} href={element.link}>
                  {element.title}
                </a>
              </h2>
              <p className={classes.subtitle}>{reduceWord(element.subTitle)}</p>
            </div>
            <div>
              <a href={element.authorLink} className={classes.author}>
                {element.author}
              </a>
            </div>
          </div>
          <div className={classes.right}>
            <a href={element.link} className={classes.rightLink}>
              {element.multimediaType.toLowerCase() === 'basic' ||
              element.multimediaType === '' ? (
                ''
              ) : (
                <span className={classes.icon}>
                  {getIcon(element.multimediaType)}
                </span>
              )}
              <img
                alt={element.title}
                className={classes.figure}
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
