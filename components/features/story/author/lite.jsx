import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { SITE_ELCOMERCIO } from '../../../utilities/constants/sitenames'
import { getDateSeo } from '../../../utilities/date-time/dates'
import StoryData from '../../../utilities/story-data'
import StoryContentChildAuthorLiteV2 from '../contents/_children/author-lite-v2'
import StoryContentsChildAuthor from './_children/author-lite'
import StoryContentsChildAuthorTrust from './_children/author-trust-lite'

const StoryAuthorLite = () => {
  const {
    arcSite,
    contextPath,
    globalContent: data,
    metaValue,
  } = useAppContext()

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

  const isStoryV2StandarStyle =
    metaValue('section_style') === 'story-v2-standard'

  return (
    <>
      {(() => {
        if (isStoryV2StandarStyle)
          return (
            <StoryContentChildAuthorLiteV2
              displayDate={getDateSeo(displayDate || createdDate)}
              publishDate={getDateSeo(updateDate)}
            />
          )
        if (SITE_ELCOMERCIO === arcSite)
          return <StoryContentsChildAuthorTrust {...params} />
        return <StoryContentsChildAuthor {...params} />
      })()}
    </>
  )
}

StoryAuthorLite.label = 'Artículo - Author'
StoryAuthorLite.static = true

export default StoryAuthorLite
