import md5 from 'md5'
import BuildHtml from './build-html'
import StoryData from '../../../utilities/story-data'
import { getMultimedia } from '../../../utilities/helpers'

const ListItemNews = (contentElements, buildProps) => {
  const {
    deployment = '',
    contextPath = {},
    arcSite = '',
    siteDomain = '',
    idGoogleAnalitics = '',
    siteUrl,
    fbArticleStyle = '',
    listUrlAdvertisings,
  } = buildProps

  const storydata = new StoryData({
    deployment,
    contextPath,
    arcSite,
    defaultImgSize: 'sm',
  })

  const elements = contentElements
    .map(story => {
      storydata.__data = story

      const pagePath = `${siteUrl}${storydata.link}`
      const pageview = `${storydata.link}?outputType=fia`
      const propsScriptHeader = {
        siteDomain,
        title: storydata.title,
        sections: storydata.allSections,
        tags: storydata.tags,
        author: storydata.author,
        typeNews: storydata.multimediaType,
      }

      const scriptAnaliticaProps = {
        siteDomain,
        idGoogleAnalitics,
        name: siteDomain,
        section: storydata.sectionsFIA.section,
        subsection: storydata.sectionsFIA.subsection,
        newsId: storydata.id,
        author: storydata.author,
        newsType: getMultimedia(storydata.multimediaType),
        pageview,
        newsTitle: storydata.title,
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
        listUrlAdvertisings,
      }

      const htmlString = BuildHtml(BuildHtmlProps)
      const codigoGUID = md5(storydata.id)

      const ItemDataXml = {
        pagePath,
        siteDomain,
        title: storydata.title,
        date: storydata.date,
        author: storydata.author,
        codigoGUID,
        htmlString,
      }
      const template = `
        <item>
          <title>${ItemDataXml.title}</title>
          <pubDate>${ItemDataXml.date}</pubDate>
          <link>${ItemDataXml.pagePath}</link>
          <guid>${ItemDataXml.codigoGUID}</guid>
          <author>${ItemDataXml.author}</author>
          <content:encoded><![CDATA[${ItemDataXml.htmlString}]]></content:encoded>
          <slash:comments>0</slash:comments>
        </item>
      `
      return template
    })
    .join('')

  return elements
}
export default ListItemNews
