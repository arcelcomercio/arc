import * as React from 'react'
import { useAppContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import { SITE_ELCOMERCIO } from '../../../utilities/constants/sitenames'
import StoryContentsChildAuthor from './_children/author-lite'
import StoryContentsChildAuthorTrust from './_children/author-trust-lite'
import { getDateSeo } from '../../../utilities/date-time/dates'

const StoryAuthorLite = () => {
  const { arcSite, contextPath, globalContent: data } = useAppContext()

  const {
    subtype,
    displayDate,
    publishDate: updateDate,
    createdDate,
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
  } = new StoryData({
    data,
    contextPath,
  })

  const params = {
    authorImage,
    author,
    authorRole,
    authorLink,
    displayDate: getDateSeo(displayDate || createdDate),
    publishDate: getDateSeo(updateDate),
    locality,
    authorEmail,
    primarySection,
    subtype,
    authorImageSecond,
    authorLinkSecond,
    authorSecond,
    authorEmailSecond,
    authorRoleSecond,
    galleryVertical: true,
    arcSite,
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

StoryAuthorLite.label = 'Artículo - Author'
StoryAuthorLite.static = true

export default StoryAuthorLite
