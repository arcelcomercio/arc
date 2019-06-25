// import Consumer from 'fusion:consumer'
import React from 'react'
import StoryData from '../utilities/story-data'
import md5 from 'md5'
import BuildHtml from './_children/fb-instant-article/template-string-html'

const NewElement = props => {
  const {
    nameElement = 'Element',
    propsNewElement = {},
    children: childrenElement = [],
  } = props
  const Element = React.createElement(
    nameElement,
    propsNewElement,
    childrenElement
  )
  return Element
}

const StringElement = StringElementProps => {
  const { name = '', childStringElement = '' } = StringElementProps
  return childStringElement !== ''
    ? `<${name}>${childStringElement}</${name}>`
    : `<${name} />`
}

const ListItemNews = (contentElements, buildProps) => {
  const {
    deployment = '',
    contextPath = {},
    arcSite = '',
    siteDomain = '',
    idGoogleAnalitics = '',
    siteUrl,
    fbArticleStyle = '',
  } = buildProps

  const elements = contentElements.map(story => {
    const storydata = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'sm',
    })
    storydata.__data = story

    const propsScriptHeader = {
      siteDomain,
      title: storydata.title,
      sections: storydata.allSections,
      tags: storydata.tags,
      author: storydata.author,
      typeNews: storydata.multimediaType,
    }

    const scriptAnaliticaProps = {
      link: storydata.link,
      siteDomain,
      idGoogleAnalitics,
    }

    const BuildHtmlProps = {
      scriptAnaliticaProps,
      propsScriptHeader,
      title: storydata.title,
      subTitle: storydata.subTitle,
      multimedia: storydata.multimedia,
      author: storydata.author,
      paragraphsNews: storydata.paragraphsNews,
      fbArticleStyle,
    }

    const htmlString = BuildHtml(BuildHtmlProps)
    const codigoGUID = md5(storydata.id)

    const ItemDataXml = {
      siteUrl,
      siteDomain,
      title: storydata.title,
      date: storydata.date,
      author: storydata.author,
      codigoGUID,
      htmlString,
    }
    return (
      <item>
        <title>{ItemDataXml.title}</title>
        <pubDate>{ItemDataXml.date}</pubDate>

        <NewElement nameElement="lnktmp">{`${ItemDataXml.siteUrl}${
          storydata.link
        }`}</NewElement>
        <demo  dangerouslySetInnerHTML={{__html:StringElement({name:'link'}) }}/>
            
          
        <guid>{ItemDataXml.codigoGUID}</guid>
        <author>{ItemDataXml.author}</author>
        <NewElement nameElement="content:encoded">
          {ItemDataXml.htmlString}
        </NewElement>
        <NewElement nameElement="slash:comments">{'0'} </NewElement>

        <NewElement nameElement="slash:printss">
          {propsScriptHeader.sections.map((seccionName, index) =>
            index < propsScriptHeader.sections.length - 1
              ? `${seccionName}, `
              : `${seccionName}`
          )}
        </NewElement>
      </item>
    )
  })

  return elements
}

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
  }

  return (
    <NewElement nameElement="rss" propsNewElement={propsXml}>
      <channel>
        {/* <demo
          dangerouslySetInnerHTML={{
            __html: `<link>
http://elcomercio.pe/mundo/latinoamerica/colombia-deroga-norma-obligaba-presentar-esposa-amigos-vecinos-noticia-646213
</link>`,
          }}
        />  */}

        {/* <link>
          {'http://elcomercio.pe/mundo/latinoamerica/colombia-deroga-norma-obligaba-presentar-esposa-amigos-vecinos-noticia-646213'}
        </link> */}

        <language>es</language>
        <title>{chanelProps.siteName}</title>
        <description>{chanelProps.descripcion}</description>
        <lastBuildDate>{chanelProps.fechaIso}</lastBuildDate>
        <NewElement nameElement="lnktmp">{chanelProps.siteUrl}</NewElement>
        {ListItemNews(stories, buildProps)}
      </channel>
    </NewElement>
  )
}

FbInstantOutputType.contentType = 'text/xml'

export default FbInstantOutputType

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
