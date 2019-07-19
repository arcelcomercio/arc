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
  const { siteUrl = '', imagenNewsLetter={} } = siteProperties
  const { content_elements: contentElements } = globalContent || []

  const propsNewsLetterContent={
    deployment,
    contextPath,
    arcSite,
    contentElements,
    siteUrl,
    imagenNewsLetter,
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

// Newsletter.contentType = 'application/json'

// export default Newsletter
// const propsXml = {
//   version: '2.0',
//   'xmlns:dc': 'http://purl.org/dc/elements/1.1/',
// }

// const JsonOutputType = props => {
//   return ({
//     "ssws": "asdasdasd"
//   })
// }

// const JsonOutputType = props => {
//   return (
// <NewElement nameElement="rss" propsNewElement={propsXml}>
//   <channel >asdasdasd</channel>
// </NewElement>
//   )
// }

Newsletter.contentType = 'text/xml'
// Newsletter.contentType = 'application/json'
// JsonOutputType.contentType = "text/javascript"
// Newsletter.contentType = 'text/plain'

export default Newsletter
