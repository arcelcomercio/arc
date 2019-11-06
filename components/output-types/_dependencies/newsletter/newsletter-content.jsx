import React from 'react'
import StoryData from '../../../utilities/story-data'

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
      <content>
        hola
      </content>
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

const NewsLetterContent = ({
  deployment,
  contextPath,
  arcSite,
  contentElements,
  websked,
  siteUrl,
  imagenNewsLetter,
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
      <nameWebsked>{nameWebsked}</nameWebsked>
      <descriptionWebsked>{descriptionWebsked}</descriptionWebsked>
      {contentElements.map(story => {
        storydata.__data = story

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

        const params = {
          title: storydata.title,
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
        }

        return <StoryItem {...params} />
      })}
    </>
  )
  return listItemStories
}

export default NewsLetterContent
