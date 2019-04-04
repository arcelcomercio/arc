import React, { Component } from 'react'
import DataStory from './utils/data-story'
import { reduceWord, formatDate, getIcon } from '../utilsJs/helpers'

const clases = {
  cardNotice: 'card-notice',
  cardNoticeTop: 'card-notice__top',
  cardNoticeSection: 'card-notice__section',
  cardNoticeDate: 'card-notice__date',
  cardNoticeBottom: 'card-notice__bottom',
  cardNoticeLeft: 'card-notice__left',
  cardNoticeTitle: 'card-notice__title',
  cardNoticeSubtitle: 'card-notice__subtitle',
  cardNoticeAuthor: 'card-notice__author',
  cardNoticeRight: 'card-notice__right',
  cardNoticeIcon: 'card-notice__icon',
  cardNoticeFigure: 'card-notice__figure',
}

class CardNotice extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
  }



  render() {
    const { arcSite, data } = this.props
    const element = new DataStory({}, arcSite)
    element.__data = data
    return (
      <div
        className={`${clases.cardNotice} ${
          this.props.formato && this.props.formato === 'row'
            ? 'card-notice--row'
            : ''
        }`}>
        <div className={clases.cardNoticeTop}>
          <a href={element.sectionLink} className={clases.cardNoticeSection}>
            {element.section}
          </a>
          <p className={clases.cardNoticeDate}>{formatDate(element.date)}</p>
        </div>
        <div className={clases.cardNoticeBottom}>
          <div className={clases.cardNoticeLeft}>
            <div>
              <h2>
                <a className={clases.cardNoticeTitle} href={element.link}>
                  {element.title}
                </a>
              </h2>
              <p className={clases.cardNoticeSubtitle}>
                {reduceWord(element.subTitle)}
              </p>
            </div>
            <div>
              <a href={element.authorLink} className={clases.cardNoticeAuthor}>
                {element.author}
              </a>
            </div>
          </div>
          <div className={clases.cardNoticeRight}>
            <a href={element.link}>
              {element.multimediaType === 'basic' ||
              element.multimediaType === '' ? (
                ''
              ) : (
                <span className={clases.cardNoticeIcon}>
                  {getIcon(element.multimediaType)}
                </span>
              )}
              <img
                alt={element.title}
                className={clases.cardNoticeFigure}
                src={element.multimedia}
              />
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default CardNotice
