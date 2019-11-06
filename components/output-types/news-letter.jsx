import React from 'react'

import NewsLetterContent from './_dependencies/newsletter/newsletter-content'
import NewElement from '../global-components/new-element'

const propsXml = {
  version: '2.0',
}

const Newsletter = ({
  globalContent = [],
  siteProperties = {},
  deployment = {},
  contextPath = '',
  arcSite = '',
}) => {
  const { siteUrl = '' } = siteProperties
  const { content_elements: contentElements, websked = {} } =
    globalContent || {}

  const propsNewsLetterContent = {
    deployment,
    contextPath,
    arcSite,
    contentElements,
    websked,
    siteUrl,
  }
  const listNewsLetter = NewsLetterContent(propsNewsLetterContent)

  return (
    <NewElement nameElement="rss" propsNewElement={propsXml}>
      <channel>
        {listNewsLetter}
      </channel>
    </NewElement>
  )
}

Newsletter.contentType = 'text/xml'

export default Newsletter
