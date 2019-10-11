import React from 'react'
import { useContent } from 'fusion:content'
import Channel from './_dependencies/fb-instant-article/channel'
import ListItemNews from './_dependencies/fb-instant-article/list-item-channel'
import NewElement from '../global-components/new-element'

const FbInstantOutputType = ({
  deployment = {},
  contextPath = '',
  arcSite = '',
  globalContent = [],
  siteProperties = {},
}) => {
  const {
    content_elements: contentElements,
    
  } = globalContent || []
  const {
    siteName = '',
    siteUrl = '',
    siteDomain = '',
    idGoogleAnalitics = '',
    fbArticleStyle = '',
    listUrlAdvertisings = [],
  } = siteProperties

  let stories = []

  if (siteDomain === 'elcomercio.pe') {
    const data =
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useContent({
        source: 'story-feed-by-section-mag',
        // query: {
        //   website_url: url,
        // },
        // filter: schemaNote(arcSite),
      }) || {}
    const {
      content_elements: contentElementsMag,
      
    } = data
    stories = contentElements.concat(contentElementsMag)
  } else {
    stories = contentElements
  }

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
    listUrlAdvertisings,
  }

  let result = null
  try {
    let chanelSctring = Channel(chanelProps)
    const itemsString = ListItemNews(stories, buildProps)

    chanelSctring = chanelSctring.replace('@ListItems', itemsString)

    result = (
      <NewElement nameElement="rss" propsNewElement={propsXml}>
        <channel dangerouslySetInnerHTML={{ __html: chanelSctring }} />
      </NewElement>
    )
  } catch (ex) {
    console.log(ex)
    result = null
  }

  return result
}

FbInstantOutputType.contentType = 'text/xml'

export default FbInstantOutputType
