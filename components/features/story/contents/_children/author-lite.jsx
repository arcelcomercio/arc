import React from 'react'
import { formatDateStory } from '../../../../utilities/date-time/dates'

const classes = {
  author: 'story-contents__author  ',
  authorNameLink: 'story-contents__author-link ',
  authorDate: 'story-contents__author-date f ',
  authorEmail: 'story-contents__author-email  ',
}

const StoryContentChildAuthorLite = ({ author, authorLink, updatedDate }) => {
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
            {updatedDate && formatDateStory(updatedDate)}
          </time>
        </div>
      </div>
    </>
  )
}

export default StoryContentChildAuthorLite
