import * as React from 'react'

// TODO: import { formatDateTime } from '../../../../utilities/date-time/dates'
import { GALLERY_VERTICAL } from '../../../../utilities/constants/subtypes'
import {
  SITE_DEPOR,
  SITE_TROME,
} from '../../../../utilities/constants/sitenames'

const classes = {
  author: 'story-contents__author',
  authorNameLink: 'story-contents__author-link ',
  authorDate: 'story-contents__author-date f ',
  authorEmail: 'story-contents__author-email  ',
}

export const formatDateTime = date => {
  const newDate = new Date(date)
  const dateTime = new Intl.DateTimeFormat('es-419-u-hc-h12', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'America/Lima',
    hour12: true,
  })

  return dateTime.format(newDate)
}

const StoryContentChildAuthorLite = ({
  author,
  authorLink,
  displayDate,
  publishDate: updateDate,
  subtype,
  arcSite,
  primarySection = '',
}) => {
  const storyDatetime = () => {
    const formattedDisplayDate = formatDateTime(displayDate)
    const formattedUpdateDate = formatDateTime(updateDate)

    if (arcSite === SITE_TROME) {
      return `Actualizado el ${formattedUpdateDate}`
    }
    return `${arcSite === SITE_DEPOR ? '' : 'Lima,'} ${formattedDisplayDate} ${
      formattedDisplayDate !== formattedUpdateDate
        ? `| Actualizado ${formattedUpdateDate}`
        : ''
    }`
  }

  return (
    <>
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
    </>
  )
}

export default StoryContentChildAuthorLite
