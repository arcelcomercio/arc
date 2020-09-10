import React from 'react'
import {
  formatDayMonthYearBasic,
  formatDateStory,
} from '../../../../utilities/date-time/dates'
import StoryContentChildAuthorDetailsTrust from './details-author-trust'

const classes = {
  author:
    'story-content__author flex justify-between pt-30 mb-20 flex-col md:flex-row',
  authorInfo: 'story-content__author-info flex',
  authorNameLink:
    'secondary-font font-bold story-content__author-link header__link text-lg text-gray-200 line-h-sm',
  authorDate:
    'story-content__date flex items-center secondary-font text-md text-gray-200 line-h-sm',
  authorDateTop: 'story-content__date-top',
  authorTime: 'story-content__time',
  authorEmail:
    'story-content__author-email secondary-font text-md text-gray-200 line-h-sm',
  authorImage: 'story-content__author-image',
  authorRole: 'story-content__author-role',
}

const StoryContentChildAuthorTrust = ({
  author,
  authorLink,
  authorImage,
  authorRole,
  updatedDate,
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
    authorImage,
    authorRole,
  }
  const detailsAuthorParametSecound = {
    author: authorSecond,
    authorLink: authorLinkSecond,
    authorEmail: authorEmailSecond,
    authorImage: authorImageSecond,
    authorRole: authorRoleSecond,
  }

  return (
    <>
      <div className={classes.author}>
        {primarySection !== 'Columnistas' && (
          <StoryContentChildAuthorDetailsTrust
            {...detailsAuthorParamet}></StoryContentChildAuthorDetailsTrust>
        )}
        <div
          className={
            authorEmailSecond
              ? classes.authorDate
              : `${classes.authorDate} ${classes.authorDateTop}`
          }>
          <time className={classes.authorTime} dateTime={updatedDate}>
            {updatedDate &&
              `${displayLoc && `${displayLoc}, `} ${formatDayMonthYearBasic(
                updatedDate,
                false,
                true
              )}`}
          </time>
          <time className={classes.authorTime} dateTime={updatedDate}>
            {updatedDate && formatDateStory(updatedDate)}
          </time>
        </div>
      </div>
      {primarySection !== 'Columnistas' && authorEmailSecond && (
        <StoryContentChildAuthorDetailsTrust
          {...detailsAuthorParametSecound}></StoryContentChildAuthorDetailsTrust>
      )}
    </>
  )
}

export default StoryContentChildAuthorTrust
