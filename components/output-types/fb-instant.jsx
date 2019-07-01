import React from 'react'

import ElementStringChanel from './_children/fb-instant-article/template-string-chanel'
import ListItemNews from './_children/fb-instant-article/template-string-item-chanel'
import NewElement from '../global-components/new-element'

const FbInstantOutputType = ({
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
    urlAddfbInstantArticle = '',
  } = siteProperties

  const stories = contentElements

  const propsXml = {
    version: '2.0',
    'xmlns:atom': 'http://www.w3.org/2005/Atom',
    'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
    'xmlns:slash': 'http://purl.org/rss/1.0/modules/slash/',
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
    urlAddfbInstantArticle,
  }

  let chanelSctring = ElementStringChanel(chanelProps)
  const itemsString = ListItemNews(stories, buildProps)

  chanelSctring = chanelSctring.replace('@ListItems', itemsString)

  return (
    <NewElement nameElement="rss" propsNewElement={propsXml}>
      <channel dangerouslySetInnerHTML={{ __html: chanelSctring }} />
    </NewElement>
  )
}

FbInstantOutputType.contentType = 'text/xml'

export default FbInstantOutputType
