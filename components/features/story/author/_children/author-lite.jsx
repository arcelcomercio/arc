import React from 'react'
import { GALLERY_VERTICAL } from '../../../../utilities/constants/subtypes'
import { SITE_DEPOR } from '../../../../utilities/constants/sitenames'
import {
  formatDateStory,
  getDMYHours,
} from '../../../../utilities/date-time/dates'

const classes = {
  author: 'story-contents__author',
  authorNameLink: 'story-contents__author-link ',
  authorDate: 'story-contents__author-date f ',
  authorEmail: 'story-contents__author-email  ',
}

const StoryContentChildAuthorLite = ({
  author,
  authorLink,
  updatedDate,
  createdDate,
  primarySection = '',
  subtype,
  arcSite,
}) => {
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
          <time dateTime={updatedDate}>
            {arcSite === SITE_DEPOR &&
              createdDate &&
              updatedDate &&
              `${getDMYHours(createdDate)} | ${formatDateStory(updatedDate)
                .replace(/\//g, '.')
                .replace(' a las', ',')}`}
            {arcSite !== SITE_DEPOR &&
              updatedDate &&
              formatDateStory(updatedDate)}
          </time>
        </div>
      </div>
    </>
  )
}

export default StoryContentChildAuthorLite
