import React from 'react'
import StoryData from '../../../utilities/story-data'
import ConfigParams from '../../../utilities/config-params'
import { clearHtml, clearBrTag } from '../../../utilities/helpers'

const buildParagraphText = elementText => {
  let result = ''
  const cleanParagraph = clearHtml(elementText)
  result = cleanParagraph !== '' ? `<p>${clearHtml(cleanParagraph)}</p>` : ''
  return result
}

const buildParagraphList = listParagraph => {
  let result = ''
  const newListParagraph = StoryData.paragraphsNews(listParagraph)
  newListParagraph.forEach(({ type = '', payload = '' }) => {
    const paragraphParams = {
      type,
      payload,
    }

    // eslint-disable-next-line no-use-before-define
    const processedParagraph = analyzeParagraph(paragraphParams)
    result += `<li>${processedParagraph}</li>`
  })
  result = `<ul>${result}</ul>`
  return result
}

const buildHeaderParagraph = paragraph => {
  return `<h2>${clearBrTag(paragraph)}</h2>`
}

const analyzeParagraph = paragraph => {
  let result = ''
  switch (paragraph.type) {
    case ConfigParams.ELEMENT_TEXT:
      result += buildParagraphText(paragraph.payload)
      break
    case ConfigParams.ELEMENT_LIST:
      result += buildParagraphList(paragraph.payload)
      break
    case ConfigParams.ELEMENT_HEADER:
      result += buildHeaderParagraph(paragraph.payload)
      break
    case ConfigParams.ELEMENT_RAW_HTML:
      result += paragraph.payload

      break
    default:
      result += ''
  }
  return result
}

const buildContent = ({ paragraphsNews = [] }) => {
  let result = ''

  paragraphsNews.forEach(element => {
    result += analyzeParagraph(element)
  })

  return result
}

const StoryItem = props => {
  const {
    title,
    description,
    urlNew,
    id,
    publishedAt,
    epigraph,
    seccion,
    urlSeccion,
    authorName,
    authorUrl,
    authorTwitterUrl,
    thumb,
    volada,
    authorImage,
    authorSlug,
    authorCargo = 'null',
    authorColumn = 'null',
    paragraphsNews = [],
  } = props

  const {
    tbmax = '',
    tbmin = '',
    tb250x366 = '',
    tb148x83 = '',
    tb210x118 = '',
    tb403x227 = '',
    tb241x136 = '',
    tbgrande = '',
    tbflujo = '',
  } = thumb

  const buildContentParams = {
    paragraphsNews,
  }
  const content = buildContent(buildContentParams)

  return (
    <article>
      <title>{title}</title>
      <url>{urlNew}</url>
      <id>{id}</id>
      <description>
        {!(
          description === undefined ||
          description === null ||
          description === ''
        )
          ? description
          : 'null'}
      </description>
      <publishedAt>{publishedAt}</publishedAt>
      <imagen>
        <thumbnail_max> {tbmax}</thumbnail_max>
        <thumbnail_min> {tbmin} </thumbnail_min>
        <thumbnail_250x366>{tb250x366}</thumbnail_250x366>
        <thumbnail_148x83>{tb148x83}</thumbnail_148x83>
        <thumbnail_210x118>{tb210x118}</thumbnail_210x118>
        <thumbnail_403x227>{tb403x227}</thumbnail_403x227>
        <thumbnail_241x136>{tb241x136}</thumbnail_241x136>
        <thumbnail_grande>{tbgrande}</thumbnail_grande>
        <thumbnail_flujo>{tbflujo}</thumbnail_flujo>
      </imagen>
      <volada>{volada}</volada>
      <epigraph> {epigraph}</epigraph>
      <seccion> {seccion}</seccion>
      <url_seccion>{urlSeccion}</url_seccion>
      <content>{content}</content>
      <autor>
        <nombre>{authorName}</nombre>
        <url>{authorUrl}</url>
        <cargo>{authorCargo}</cargo>
        <columna>{authorColumn}</columna>
        <twitter>{authorTwitterUrl}</twitter>
        <imagen>{authorImage}</imagen>
        <thumb>{authorSlug}</thumb>
      </autor>
    </article>
  )
}
// const CONTENT_SOURCE = 'story-by-id'

const NewsLetterContent = ({
  deployment,
  contextPath,
  arcSite,
  contentElements,
  websked,
  siteUrl,
  imagenNewsLetter,
  storiesContent,
}) => {
  const storydata = new StoryData({
    deployment,
    contextPath,
    arcSite,
    defaultImgSize: 'sm',
  })

  const {
    name: nameWebsked = 'null',
    description: descriptionWebsked = 'null',
  } = websked || {}

  const listItemStories = (
    <>
      <nameCollection>{nameWebsked}</nameCollection>
      <descriptionCollection>{descriptionWebsked}</descriptionCollection>
      {contentElements.map((story, index) => {
        storydata.__data = storiesContent[index]

        const thumb =
          story &&
          story.promo_items &&
          story.promo_items.basic &&
          story.promo_items.basic.resized_urls
            ? story.promo_items.basic.resized_urls
            : {}

        const description =
          story && story.description && story.description.basic
            ? story.description.basic
            : ''

        const title = (story && story.headlines && story.headlines.basic) || ''
        // comentario
        const params = {
          title,
          description,
          urlNew: `${siteUrl}${storydata.websiteLink}`,
          id: storydata.id,
          publishedAt: storydata.date,
          thumb,
          image: imagenNewsLetter,
          volada: 'null',
          epigraph: storydata.subTitle,
          seccion: storydata.section,
          urlSeccion: `${siteUrl}${storydata.sectionLink}`,
          authorName: storydata.author,
          authorUrl: `${siteUrl}${storydata.authorLink}`,
          authorTwitterUrl: storydata.authorTwitterLink,
          authorImage: `${siteUrl}${storydata.authorImage}`,
          authorSlug: storydata.authorSlug,
          authorCargo: storydata.authorRoleByNewsLetter
            ? storydata.authorRoleByNewsLetter
            : 'null',
          authorColumn: storydata.authorBiography
            ? storydata.authorBiography
            : 'null',
          paragraphsNews: storydata.paragraphsNews,
        }

        return <StoryItem {...params} />
      })}
    </>
  )
  return listItemStories
}

export default NewsLetterContent
