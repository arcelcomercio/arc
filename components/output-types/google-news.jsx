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

  const { siteName = '', siteUrl = '', siteDomain = '' } = siteProperties

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
    descripcion:
      'Noticias de Perú y el mundo en Publimetro.pe. Noticias de actualidad, política, deportes, gastronomía, economía y espectáculos.',
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
  chanelString = chanelString.replace('@StringImageItem', StringImageItem(imageProps))

  chanelString = chanelString.replace('@ItemsNews', ArrayItemString)

  return (
    <NewElement nameElement="rss" propsNewElement={propsXml}>
      <chanel dangerouslySetInnerHTML={{ __html: chanelString }} />
    </NewElement>
  )
}

GoogleNews.contentType = 'text/xml'

export default GoogleNews
