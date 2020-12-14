import * as React from 'react'

import { formatDateTime } from '../../../../utilities/date-time/dates'
import { SITE_DEPOR } from '../../../../utilities/constants/sitenames'

const classes = {
  author: 'story-contents__author  ',
  authorNameLink: 'story-contents__author-link ',
  authorDate: 'story-contents__author-date f ',
  authorEmail: 'story-contents__author-email  ',
}

const StoryContentChildAuthorLite = ({
  author,
  authorLink,
  displayDate,
  publishDate: updateDate,
  arcSite,
}) => {
  const storyDatetime = () => {
    const formattedDisplayDate = formatDateTime(displayDate)
    const formattedUpdateDate = formatDateTime(updateDate)

    return `${arcSite === SITE_DEPOR ? '' : 'Lima,'} ${formattedDisplayDate} ${
      formattedDisplayDate !== formattedUpdateDate
        ? `| Actualizado ${formattedUpdateDate}`
        : ''
    }`
  }

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
          <time dateTime={displayDate}>{storyDatetime()}</time>
        </div>
      </div>
    </>
  )
}

export default StoryContentChildAuthorLite
