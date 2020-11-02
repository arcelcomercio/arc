import React from 'react'

import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import StoryContentsChildAuthorAmp from './_children/amp-author'
import { getDateSeo } from '../../../utilities/date-time/dates'

const StoryAuthorAmp = () => {
  const { contextPath, globalContent: data } = useFusionContext()

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
      <StoryContentsChildAuthorAmp {...params} />
    </>
  )
}

StoryAuthorAmp.label = 'Artículo - Author'
StoryAuthorAmp.static = true

export default StoryAuthorAmp
