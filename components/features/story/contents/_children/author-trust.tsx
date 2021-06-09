import { AnyObject } from 'fusion:content'
import * as React from 'react'

import {
  formatDateStory,
  formatDayMonthYearBasic,
} from '../../../../utilities/date-time/dates'
import StoryContentChildAuthorDetailsTrust from './details-author-trust'

const classes = {
  author:
    'story-content__author flex justify-between pt-30 flex-col md:flex-row',
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

const StoryContentChildAuthorTrust: React.FC<{
  author: string
  authorLink: string
  authorImage: string
  authorRole: string
  updatedDate: Date
  locality: string
  authorEmail: string
  primarySection?: string
  authorsList: AnyObject[]
}> = ({
  author,
  authorLink,
  authorImage,
  authorRole,
  updatedDate,
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
        {primarySection !== 'Columnistas' && (
          <StoryContentChildAuthorDetailsTrust
            author={author}
            authorLink={authorLink}
            authorEmail={authorEmail}
            authorImage={authorImage}
            authorRole={authorRole}
          />
        )}
        <div
          className={
            authorsList.length > 0
              ? classes.authorDate
              : `${classes.authorDate} ${classes.authorDateTop}`
          }>
          <time className={classes.authorTime} dateTime={updatedDate}>
            {updatedDate &&
              `${displayLoc && `${displayLoc}, `} ${formatDayMonthYearBasic(
                updatedDate,
                false
              )}`}
          </time>
          <time className={classes.authorTime} dateTime={updatedDate}>
            {updatedDate && formatDateStory(updatedDate)}
          </time>
        </div>
      </div>
      {primarySection !== 'Columnistas' &&
        authorsList &&
        authorsList.map((authorData) => {
          const authorList = authorData?.nameAuthor
          const authorLinkList = authorData?.urlAuthor
          const authorEmailList = authorData?.mailAuthor
          const authorImageList = authorData?.imageAuthor
          const authorRoleList = authorData?.role
          return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <StoryContentChildAuthorDetailsTrust
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

export default StoryContentChildAuthorTrust
