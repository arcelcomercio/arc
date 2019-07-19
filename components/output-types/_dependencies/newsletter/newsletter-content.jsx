import React from 'react'
import StoryData from '../../../utilities/story-data'

const StoryItem = props => {
  const {
    title,
    urlNew,
    id,
    publishedAt,
    epigraph,
    seccion,
    urlSeccion,
    authorName,
    authorUrl,
    authorTwitterUrl,
    image,
    volada,
    authorImage,
    authorSlug,
    authorCargo,
  } = props

  const {
    thumbnail_max: thumbnailMax = '',
    thumbnail_min: thumbnailMin = '',
    thumbnail_250x366: thumbnail250x366 = '',
    thumbnail_148x83: thumbnail148x83 = '',
    thumbnail_210x118: thumbnail210x118 = '',
    thumbnail_403x227: thumbnail403x227 = '',
    thumbnail_241x136: thumbnail241x136 = '',
    thumbnail_grande: thumbnailGrande = '',
    thumbnail_flujo: thumbnailFlujo = '',
  } = image
  return (
    <article>
      <title>{title}</title>
      <url>{urlNew}</url>
      <id>{id}</id>
      <publishedAt>{publishedAt}</publishedAt>
      <imagen>
        <thumbnail_max> {thumbnailMax}</thumbnail_max>
        <thumbnail_min> {thumbnailMin} </thumbnail_min>
        <thumbnail_250x366>{thumbnail250x366}</thumbnail_250x366>
        <thumbnail_148x83>{thumbnail148x83}</thumbnail_148x83>
        <thumbnail_210x118>{thumbnail210x118}</thumbnail_210x118>
        <thumbnail_403x227>{thumbnail403x227}</thumbnail_403x227>
        <thumbnail_241x136>{thumbnail241x136}</thumbnail_241x136>
        <thumbnail_grande>{thumbnailGrande}</thumbnail_grande>
        <thumbnail_flujo>{thumbnailFlujo}</thumbnail_flujo>
      </imagen>
      <volada>{volada}</volada>
      <epigraph> {epigraph}</epigraph>
      <seccion> {seccion}</seccion>
      <url_seccion>{urlSeccion}</url_seccion>
      <autor>
        <nombre>{authorName}</nombre>
        <url>{authorUrl}</url>
        <cargo>{authorCargo ? authorCargo : 'null'}</cargo>
        <columna>// TODO</columna>
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
  siteUrl,
  imagenNewsLetter,
}) => {
  const storydata = new StoryData({
    deployment,
    contextPath,
    arcSite,
    defaultImgSize: 'sm',
  })

  const listItemStories = contentElements.map(story => {
    storydata.__data = story

    const params = {
      title: storydata.title,
      urlNew: `${siteUrl}${storydata.link}`,
      id: storydata.id,
      publishedAt: storydata.date,
      image: imagenNewsLetter,
      volada:null,
      epigraph: storydata.subTitle,
      seccion: storydata.section,
      urlSeccion: `${siteUrl}${storydata.sectionLink}`,
      authorName: storydata.author,
      authorUrl: `${siteUrl}${storydata.authorLink}`,
      authorTwitterUrl: storydata.authorTwitterLink,
      authorImage: `${siteUrl}${storydata.authorImage}` ,
      authorSlug: storydata.authorSlug,
      authorCargo: null,
    }
    return <StoryItem {...params} />
  })
  return listItemStories
}

export default NewsLetterContent
