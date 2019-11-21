import md5 from 'md5'
import BuildHtml from './build-html'
import StoryData from '../../../utilities/story-data'
import { getMultimedia, nbspToSpace } from '../../../utilities/helpers'

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

      let pagePath = ''
      let fiaContent = ''

      if (!storydata.isPremium) {
        if (storydata.fiaOrigen === true) {
          // if (storydata.canonicalWebsite === 'elcomerciomag') {
            // se cambio la validacion del canonicalWebsite para la url,
            // se solicito que ya no se concatene las notas de mag cuando sea el comercio
          if (storydata.canonicalWebsite === 'xxxxxxxasdf') {
            fiaContent = 'MAG'
            pagePath = `${siteUrl}/mag${storydata.link}`
          } else {
            pagePath = `${siteUrl}${storydata.link}`
            fiaContent = fbArticleStyle
          }

          const pageview = `${storydata.link}?outputType=fia`
          const propsScriptHeader = {
            siteDomain,
            title: nbspToSpace(storydata.title),
            sections: storydata.allSections,
            tags: storydata.tags,
            author: nbspToSpace(storydata.author),
            typeNews: storydata.multimediaType,
          }

          const scriptAnaliticaProps = {
            siteDomain,
            idGoogleAnalitics,
            name: siteDomain,
            section: storydata.sectionsFIA.section,
            subsection: storydata.sectionsFIA.subsection,
            newsId: storydata.id,
            author: nbspToSpace(storydata.author),
            newsType: getMultimedia(storydata.multimediaType),
            pageview,
            newsTitle: nbspToSpace(storydata.title),
            nucleoOrigen: storydata.nucleoOrigen,
            formatOrigen: storydata.formatOrigen,
            contentOrigen: storydata.contentOrigen,
            genderOrigen: storydata.genderOrigen,
          }

          const BuildHtmlProps = {
            scriptAnaliticaProps,
            propsScriptHeader,
            canonical:pagePath,
            oppublished: storydata.date,
            title: nbspToSpace(storydata.title),
            subTitle: nbspToSpace(storydata.subTitle),
            multimedia: storydata.multimediaNews,
            author: nbspToSpace(storydata.author),
            paragraphsNews: storydata.paragraphsNews,
            fbArticleStyle: fiaContent,
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
            <title>${nbspToSpace(ItemDataXml.title)}</title>
            <pubDate>${ItemDataXml.date}</pubDate>
            <link>${ItemDataXml.pagePath}</link>
            <guid>${ItemDataXml.codigoGUID}</guid>
            <author>${nbspToSpace(ItemDataXml.author)}</author>
            <content:encoded><![CDATA[${
              ItemDataXml.htmlString
            }]]></content:encoded>
            <slash:comments>0</slash:comments>
          </item>
        `
          return template
        }
      }

      return ''
    })
    .join('')

  return elements
}
export default ListItemNews
