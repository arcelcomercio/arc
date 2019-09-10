import md5 from 'md5'
import BuildHtml from './build-html'
import mediaContent from './media-content-html'
import StoryData from '../../../utilities/story-data'

const ListItemNews = (contentElements, buildProps) => {
  const {
    deployment = '',
    contextPath = {},
    arcSite = '',
    siteDomain = '',
    siteUrl,
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

      const BuildHtmlProps = {
        subTitle: storydata.subTitle,
        author: storydata.author,
        paragraphsNews: storydata.paragraphsNews,
        gallery: storydata.getGallery,
        video: storydata.getVideoPrincipal,
        typeNota: storydata.multimediaType,
      }

      const htmlMultimedia = {
        multimedia: storydata.multimedia,
        title: storydata.title,
        type: storydata.multimediaType,
      }

      const htmlString = BuildHtml(BuildHtmlProps)
      const codigoGUID = md5(storydata.id)
      const mediaContentHtml = mediaContent(htmlMultimedia)
      const tagList = storydata.tags.map(tg => `${tg.text.replace('&', '-')}`)

      const ItemDataXml = {
        siteUrl,
        siteDomain,
        title: storydata.title,
        date: storydata.date,
        author: storydata.author,
        codigoGUID,
        htmlString,
        tags: tagList,
        subTitle: storydata.subTitle,
        mediaContentHtml,
        multimediaUrl: storydata.multimedia,
      }
      const template = `
        <item>
          <title><![CDATA[${ItemDataXml.title}]]></title>
          <pubDate>${ItemDataXml.date}</pubDate>
          <dcterms:modified>${ItemDataXml.date}</dcterms:modified>
          <dcterms:alternative>${ItemDataXml.title.replace(
            '&',
            '-'
          )}</dcterms:alternative>
          <link>${ItemDataXml.siteUrl}${storydata.link}</link>
          <guid isPermaLink="false">${ItemDataXml.codigoGUID}</guid>
          <author>${ItemDataXml.author}</author>
          <dc:creator>${ItemDataXml.author}</dc:creator>
          <media:keywords>${ItemDataXml.tags}</media:keywords>
          <description><![CDATA[${ItemDataXml.subTitle}]]></description>
          <content:encoded><![CDATA[${
            ItemDataXml.htmlString
          }]]></content:encoded>
          <media:content url="${
            ItemDataXml.multimediaUrl
          }" type="image/jpeg" medium="image">${
        ItemDataXml.mediaContentHtml
      }</media:content>
        </item>
      `
      return template
    })
    .join('')

  return elements
}
export default ListItemNews
