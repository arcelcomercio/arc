import React from 'react'

const MsnXmlOutputType = () => {
  // Debe redireccionar a la home del 
  const script =`document.location.href="/";`
  return (
    <html lang="es">
      <body>
        <script dangerouslySetInnerHTML={{ __html: script }} />
      </body>
    </html>
  )
}

// MsnXmlOutputType.contentType = 'text/html; charset=utf-8'
export default MsnXmlOutputType

/* import React from 'react'

import Channel from './_dependencies/msn-xml/channel'
import ListItemNews from './_dependencies/msn-xml/list-item-channel'
import NewElement from '../global-components/new-element'

const MsnXmlOutputType = ({
  deployment = {},
  contextPath = '',
  arcSite = '',
  globalContent = [],
  siteProperties = {},
}) => {
  const { content_elements: contentElements } = globalContent || []
  const {
    siteName = '',
    siteUrl = '',
    siteDomain = '',
    idGoogleAnalitics = '',
    fbArticleStyle = '',
    listUrlAdvertisings=[]
  } = siteProperties

  const stories = contentElements

  const propsXml = {
    version: '2.0',
    'xmlns:atom': 'http://www.w3.org/2005/Atom',
    'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
    'xmlns:slash': 'http://purl.org/rss/1.0/modules/slash/',
    'xmlns:mi' : 'http://schemas.ingestion.microsoft.com/common/',
    'xmlns:dcterms' : 'http://purl.org/dc/terms/',
    'xmlns:media' : 'http://search.yahoo.com/mrss/',
    'xmlns:dc' : 'http://purl.org/dc/elements/1.1/'
  }

  const chanelProps = {
    siteName,
    siteUrl,
    fechaIso: new Date().toISOString(),
    descripcion: 'Todas las Noticias',
  }

  const buildProps = {
    siteUrl,
    deployment,
    contextPath,
    arcSite,
    siteDomain,
    idGoogleAnalitics,
    fbArticleStyle,
    listUrlAdvertisings,
  }

  let chanelSctring = Channel(chanelProps)
  const itemsString = ListItemNews(stories, buildProps)

  chanelSctring = chanelSctring.replace('@ListItems', itemsString)

  return (
    <NewElement nameElement="rss" propsNewElement={propsXml}>
      <channel dangerouslySetInnerHTML={{ __html: chanelSctring }} />
    </NewElement>
  )
}

MsnXmlOutputType.contentType = 'text/xml'

export default MsnXmlOutputType
*/
