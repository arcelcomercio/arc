import React from 'react'
import { SITE_DEPOR } from '../../../../utilities/constants/sitenames'
import { formatDateStory, getDMYHours } from '../../../../utilities/date-time/dates'

const classes = {
  author: 'story-contents__author  ',
  authorNameLink: 'story-contents__author-link ',
  authorDate: 'story-contents__author-date f ',
  authorEmail: 'story-contents__author-email  ',
}

const StoryContentChildAuthorLite = ({ author, authorLink, updatedDate, createdDate, arcSite }) => {
  return (
    <>
      <div className={classes.author}>
        {author && (
          <a
            itemProp="url"
            href={authorLink}
            className={classes.authorNameLink}>
            {author}
          </a>
        )}
        <div className={classes.authorDate}>
          <time dateTime={updatedDate}>
            {arcSite === SITE_DEPOR && createdDate && updatedDate && `${getDMYHours(createdDate)} | ${formatDateStory(updatedDate).replace(/\//g, '.').replace(' a las', ',')}`}
            {arcSite !== SITE_DEPOR &&updatedDate && formatDateStory(updatedDate)}
          </time>
        </div>
      </div>
    </>
  )
}

export default StoryContentChildAuthorLite
