import React from 'react'
import NewElement from './../utilities/new-element'
import ElementStringChanel from './_children/google-news/template-string-chanel'
import StringImageItem from './_children/google-news/template-string-item-image'
import StringTemplateArrayItem from './_children/google-news/template-string-item-chanel'

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

  const chanelProps = {
    siteName,
    siteUrl,
    siteDescription,
    googleNewsImage,
  }
  const imageProps = {
    siteDomain,
    siteUrl,
  }

  const itemsProps = {
    deployment,
    contextPath,
    arcSite,
    siteUrl,
    stories,
  }
  const ArrayItemString = StringTemplateArrayItem(itemsProps)
  let chanelString = ElementStringChanel(chanelProps)

  chanelString = chanelString.replace(
    '@StringImageItem',
    StringImageItem(imageProps)
  )

  chanelString = chanelString.replace('@ItemsNews', ArrayItemString)

  return (
    <NewElement nameElement="rss" propsNewElement={propsXml}>
      <chanel dangerouslySetInnerHTML={{ __html: chanelString }} />
    </NewElement>
    // <NewElement nameElement="rss" propsNewElement={propsXml}>
    //   <chanel dangerouslySetInnerHTML={{ __html: print(chanelProps.siteDescription) }} />
    // </NewElement>
  )
}

GoogleNews.contentType = 'text/xml'

export default GoogleNews
