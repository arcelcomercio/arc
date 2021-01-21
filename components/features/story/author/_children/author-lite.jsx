import * as React from 'react'

import { formatDateTime } from '../../../../utilities/date-time/dates'
import { GALLERY_VERTICAL } from '../../../../utilities/constants/subtypes'
import {
  SITE_DEPOR,
  SITE_TROME,
  SITE_PERU21,
} from '../../../../utilities/constants/sitenames'

const classes = {
  author: 'story-contents__author',
  authorNameLink: 'story-contents__author-link ',
  authorDate: 'story-contents__author-date f ',
  authorEmail: 'story-contents__author-email  ',
}

const StoryContentChildAuthorLite = ({
  author,
  authorLink,
  displayDate,
  publishDate: updateDate,
  subtype,
  arcSite,
  primarySection = '',
  authorEmail,
}) => {
  const storyDatetime = () => {
    const formattedDisplayDate = formatDateTime(displayDate)
    const formattedUpdateDate = formatDateTime(updateDate)

    if (arcSite === SITE_TROME || arcSite === SITE_PERU21) {
      return `Actualizado el ${formattedUpdateDate}`
    }
    return `${arcSite === SITE_DEPOR ? '' : 'Lima,'} ${formattedDisplayDate} ${
      formattedDisplayDate !== formattedUpdateDate
        ? `| Actualizado ${formattedUpdateDate}`
        : ''
    }`
  }

  return arcSite === SITE_PERU21 ? (
    <div
      className={`${classes.author} ${subtype === GALLERY_VERTICAL && 'gv'} f`}>
      <div>
        {author && (
          <a
            itemProp="url"
            href={authorLink}
            className={classes.authorNameLink}>
            {author}
          </a>
        )}

        <div itemProp="description" className={classes.authorEmail}>
          {authorEmail}
        </div>
      </div>

      <div className={`${classes.authorDate} just-center`}>
        <time dateTime={displayDate}>{storyDatetime()}</time>
      </div>
    </div>
  ) : (
    <div
      className={`${classes.author} ${subtype === GALLERY_VERTICAL && 'gv'}`}>
      {/* // TODO: Cambiar este div por <address> */}
      {primarySection !== 'Columnistas' && (
        <>
          {author && (
            <a
              itemProp="url"
              href={authorLink}
              className={classes.authorNameLink}>
              {author}
            </a>
          )}
        </>
      )}
      <div className={classes.authorDate}>
        <time dateTime={displayDate}>{storyDatetime()}</time>
      </div>
    </div>
  )
}

export default StoryContentChildAuthorLite
