import { AnyObject } from 'fusion:content'
import React from 'react'

import {
  formatDateStory,
  formatDayMonthYearBasic,
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

interface FeatureProps {
  author?: string
  authorLink: string
  authorImage: string
  authorRole: string
  displayDate: Date
  publishDate: Date
  locality: string
  authorEmail: string
  primarySection?: string
  authorsList: AnyObject[]
}

const StoryContentChildAuthorTrustLite: React.FC<FeatureProps> = ({
  author = '',
  authorLink,
  authorImage,
  authorRole,
  displayDate,
  publishDate,
  locality,
  authorEmail,
  primarySection = '',
  authorsList,
}) => {
  const displayLoc = locality === '' ? 'Lima' : locality

  authorsList.shift()

  return (
    <>
      <div className={classes.author}>
        <DetailsAuthor
          author={author}
          authorLink={authorLink}
          authorEmail={authorEmail}
          authorImage={authorImage}
          authorRole={authorRole}
        />
        <div
          className={
            authorsList?.length > 0
              ? classes.authorDate
              : `${classes.authorDate} ${classes.authortop}`
          }>
          <time className={classes.authorTime} dateTime={displayDate}>
            {displayDate &&
              `${displayLoc && `${displayLoc}, `} ${formatDayMonthYearBasic(
                displayDate,
                false
              )}`}
          </time>
          <time dateTime={publishDate}>
            {publishDate && formatDateStory(publishDate)}
          </time>
        </div>
      </div>
      {primarySection !== 'Columnistas' &&
        authorsList &&
        authorsList.map((authorData) => {
          const authorList = authorData?.name
          const authorLinkList = authorData?.urlAuthor
          const authorEmailList = authorData?.mailAuthor
          const authorImageList = authorData?.imageAuthor
          const authorRoleList = authorData?.role

          return (
            <DetailsAuthor
              author={authorList as string}
              authorLink={authorLinkList as string}
              authorImage={authorImageList as string}
              authorRole={authorRoleList as string}
              authorEmail={authorEmailList as string}
            />
          )
        })}
    </>
  )
}

export default StoryContentChildAuthorTrustLite
