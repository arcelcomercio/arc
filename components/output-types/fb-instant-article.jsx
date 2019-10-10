import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import Channel from './_dependencies/fb-instant-article/channel'
import ListItemNews from './_dependencies/fb-instant-article/list-item-channel'
import NewElement from '../global-components/new-element'

@Consumer
class FbInstantOutputType extends PureComponent {
  constructor(props) {
    super(props)
    this.getMagContentElement()
  }

  getMagContentElement = () => {
    // const {
    //   arcSite,
    //   deployment,
    //   contextPath,
    // } = this.props

    this.fetchContent({
      dataApi: {
        source: 'story-feed-by-section-mag',
      },
    })
  }

  render() {
    const { dataApi = {} } = this.state

    let { content_elements: contentElementMag } = dataApi

    const {
      deployment = {},
      contextPath = '',
      arcSite = '',
      globalContent = [],
      siteProperties = {},
    } = this.props

    let { content_elements: contentElements } = globalContent || []
    const {
      siteName = '',
      siteUrl = '',
      siteDomain = '',
      idGoogleAnalitics = '',
      fbArticleStyle = '',
      listUrlAdvertisings = [],
    } = siteProperties

    console.log('AQUI MAG!!!!!!!!!')
    console.log(JSON.stringify(contentElementMag))

    console.log('AQUI elcomercio!!!!!!!!!')
    // console.log(JSON.stringify(contentElements))

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
}
FbInstantOutputType.contentType = 'text/xml'

export default FbInstantOutputType

/*
const FbInstantOutputType22 = ({
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
    listUrlAdvertisings = [],
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
*/
