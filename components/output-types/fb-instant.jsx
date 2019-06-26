import React from 'react'

import ElementStringChanel from './_children/fb-instant-article/template-string-chanel'
import ListItemNews from './_children/fb-instant-article/template-string-item-chanel'
import NewElement from './_children/fb-instant-article/new-element'

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
    urlAddfbInstantArticle=''
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
    urlAddfbInstantArticle
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

/*
 <channel 
      dangerouslySetInnerHTML={{__html: ElementStringChanel(chanelProps)}}  >
        </channel>
<channel>
  <language>es</language>
  <title>{chanelProps.siteName}</title>
  <description>{chanelProps.descripcion}</description>
  <lastBuildDate>{chanelProps.fechaIso}</lastBuildDate>
  <NewElement nameElement="lnktmp">{chanelProps.siteUrl}</NewElement>
  {ListItemNews(stories, buildProps)}
</channel>
*/

// FbInstantOutputType.contentType = 'application/rss+xml'

// FbInstantOutputType.fallback = ['amp', 'default']
/* FbInstantOutputType.transform = {
  arcio({ context, data }) {

    return {
      contentType: 'application/rss+xml',
      data: {
        tree: context.tree,
        globalContent: context.globalContent,
        featureContent: data,
      },
    }
  },
}
 */

{
  /* {React.createElement('link', { allowInvalidVoidElementChildren: true }, 'https://reactjs.org/blog/')} */
}
{
  /* <link allowInvalidVoidElementChildren={true} dangerouslySetInnerHTML={{ __html: 'https://reactjs.org/blog/' }} /> */
}

{
  /* <link dangerouslySetInnerHTML={{ __html: `<link>
http://elcomercio.pe/mundo/latinoamerica/colombia-deroga-norma-obligaba-presentar-esposa-amigos-vecinos-noticia-646213
</link>` }} /> */
}

// item

{
  /* <item>
<title>{ItemDataXml.title}</title>
<pubDate>{ItemDataXml.date}</pubDate>

<NewElement nameElement="lnktmp">{`${ItemDataXml.siteUrl}${
  storydata.link
}`}</NewElement>

<guid>{ItemDataXml.codigoGUID}</guid>
<author>{ItemDataXml.author}</author>
<NewElement nameElement="content:encoded">
  {ItemDataXml.htmlString}
</NewElement>
<NewElement nameElement="slash:comments">{'0'} </NewElement>
</item> */
}
