import React from 'react'
import {
  formatDayMonthYearBasic,
  formatDateStory,
} from '../../../../utilities/date-time/dates'

import DetailsAuthor from './details-author-trust-lite'

const classes = {
  author: 'story-contents__author flex ',
  authorInfo: 'story-contents__author-info flex',
  authorNameLink: 'story-contents__author-link ',
  authorDate: 'story-contents__author-date f ',
  authortop: 'story-contents__author-top ',
  authorTime: 'story-contents__time',
  authorEmail: 'story-contents__author-email  ',
  authorImage: 'story-contents__author-image',
  authorRole: 'story-contents__author-role',
}

const StoryContentChildAuthorTrustLite = ({
  author,
  authorLink,
  authorImage,
  authorRole,
  displayDate,
  publishDate: updateDate,
  locality,
  authorEmail,
  primarySection = '',
  authorsList,
}) => {
  const displayLoc = locality === '' ? 'Lima' : locality
  const detailsAuthorParamet = {
    author,
    authorLink,
    authorEmail,
    authorImage,
    authorRole,
  }

  authorsList.shift()

  return (
    <>
      <div className={classes.author}>
        <DetailsAuthor {...detailsAuthorParamet}></DetailsAuthor>
        <div
          className={
            authorsList.lenght > 0
              ? classes.authorDate
              : `${classes.authorDate} ${classes.authortop}`
          }>
          <time className={classes.authorTime} dateTime={displayDate}>
            {displayDate &&
              `${displayLoc && `${displayLoc}, `} ${formatDayMonthYearBasic(
                displayDate,
                false,
                true
              )}`}
          </time>
          <time dateTime={updateDate}>
            {updateDate && formatDateStory(updateDate)}
          </time>
        </div>
      </div>
      {primarySection !== 'Columnistas' &&
        authorsList &&
        authorsList.map(authorData => {
          const detailsAuthorRenderer = {
            author: authorData.nameAuthor,
            authorLink: authorData.urlAuthor,
            authorEmail: authorData.mailAuthor,
            authorImage: authorData.imageAuthor,
            authorRole: authorData.role,
          }
          return <DetailsAuthor {...detailsAuthorRenderer}></DetailsAuthor>
        })}
    </>
  )
}

export default StoryContentChildAuthorTrustLite
