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
  authorImgSmall,
  authorRole,
  updatedDate,
  date,
  locality,
  authorEmail,
  primarySection = '',
  authorImageSecond,
  authorLinkSecond,
  authorSecond,
  authorEmailSecond,
  authorRoleSecond,
}) => {
  const displayLoc = locality === '' ? 'Lima' : locality
  const detailsAuthorParamet = {
    author,
    authorLink,
    authorEmail,
    authorImgSmall,
    authorRole,
  }

  const detailsAuthorParametSecound = {
    author: authorSecond,
    authorLink: authorLinkSecond,
    authorEmail: authorEmailSecond,
    authorImgSmall: authorImageSecond,
    authorRole: authorRoleSecond,
  }
  return (
    <>
      <div className={classes.author}>
        {primarySection !== 'Columnistas' && (
          <DetailsAuthor {...detailsAuthorParamet}></DetailsAuthor>
        )}
        <div
          className={
            authorEmailSecond
              ? classes.authorDate
              : `${classes.authorDate} ${classes.authortop}`
          }>
          <time className={classes.authorTime} dateTime={updatedDate}>
            {updatedDate &&
              `${displayLoc && `${displayLoc}, `} ${formatDayMonthYearBasic(
                updatedDate,
                false,
                true
              )}`}
          </time>
          <time dateTime={date}>{date && formatDateStory(date)}</time>
        </div>
      </div>
      {primarySection !== 'Columnistas' && authorEmailSecond && (
        <DetailsAuthor {...detailsAuthorParametSecound}></DetailsAuthor>
      )}
    </>
  )
}

export default StoryContentChildAuthorTrustLite
