import React from 'react'

import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import { SITE_ELCOMERCIO } from '../../../utilities/constants/sitenames'
import StoryContentsChildAuthor from './_children/author'
import StoryContentsChildAuthorTrust from './_children/author-trust'
import { getDateSeo } from '../../../utilities/date-time/dates'

const StoryAuthor = () => {
  const { arcSite, contextPath, globalContent: data } = useFusionContext()

  const {
    subtype,
    displayDate: updatedDate,
    authorImage,
    authorLink,
    author,
    role: authorRole,
    locality,
    primarySection,
    authorEmail,
    authorImageSecond,
    authorLinkSecond,
    authorSecond,
    authorEmailSecond,
    roleSecond: authorRoleSecond,
    createdDate,
  } = new StoryData({
    data,
    contextPath,
  })

  const params = {
    authorImage,
    author,
    authorRole,
    authorLink,
    updatedDate: getDateSeo(updatedDate || createdDate),
    locality,
    authorEmail,
    primarySection,
    subtype,
    authorImageSecond,
    authorLinkSecond,
    authorSecond,
    authorEmailSecond,
    authorRoleSecond,
  }

  return (
    <>
      {SITE_ELCOMERCIO === arcSite ? (
        <StoryContentsChildAuthorTrust {...params} />
      ) : (
        <StoryContentsChildAuthor {...params} />
      )}
    </>
  )
}

StoryAuthor.label = 'Artículo - Author'
StoryAuthor.static = true

export default StoryAuthor
