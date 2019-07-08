import React from 'react'
import NewElement from '../global-components/new-element'
import Channel from './_dependencies/google-news/channel'
import ItemImage from './_dependencies/google-news/item-image'
import ListItemChannel from './_dependencies/google-news/list-item-channel'

const GoogleNews = ({
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
    siteDescription = '',
    googleNewsImage = '',
  } = siteProperties

  const stories = contentElements

  const propsXml = {
    version: '2.0',
    'xmlns:dc':'http://purl.org/dc/elements/1.1/'
  }

  const channelProps = {
    siteName,
    siteUrl,
    siteDescription,
    
  }
  const imageProps = {
    siteDomain,
    siteUrl,
    googleNewsImage,
  }

  const itemsProps = {
    deployment,
    contextPath,
    arcSite,
    siteUrl,
    stories,
  }
  const ArrayItemString = ListItemChannel(itemsProps)
  let channelString = Channel(channelProps)

  channelString = channelString.replace(
    '@StringImageItem',
    ItemImage(imageProps)
  )

  channelString = channelString.replace('@ItemsNews', ArrayItemString)

  return (
    <NewElement nameElement="rss" propsNewElement={propsXml}>
      <channel dangerouslySetInnerHTML={{ __html: channelString }} />
    </NewElement>
  )
}

GoogleNews.contentType = 'text/xml'

export default GoogleNews
