import React from 'react'
import { formatDateStory } from '../../../../utilities/date-time/dates'

const classes = {
  author: 'story-contents__author f ',
  authorNameLink: 'story-contents__author-link ',
  authorDate: 'story-contents__author-date f ',
  authorEmail: 'story-contents__author-email  ',
}

const StoryContentChildAuthorLite = ({
  author,
  authorLink,
  updatedDate,
  authorEmail,
  primarySection = '',
}) => {
  return (
    <>
      <div className={classes.author}>
        {/* // TODO: Cambiar este div por <address> */}
        {primarySection !== 'Columnistas' && (
          <>
            <span className="f">Por</span>
            {author && (
              <a href={authorLink} className={classes.authorNameLink}>
                {author}
              </a>
            )}
            {authorEmail && true && (
              <p className={classes.authorEmail}> {authorEmail} </p>
            )}
          </>
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
