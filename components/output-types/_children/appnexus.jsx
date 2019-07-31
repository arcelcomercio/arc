import React from 'react'
import StoryData from '../../utilities/story-data'
import { getMultimedia } from '../../utilities/helpers'
const getSite = site => {
  const sites = {
    elcomercio: 'eco',
    depor: 'dep',
    trome: 'trm',
    gestion: 'ges',
    publimetro: 'pub',
    peru21: 'p21',
    bocon: 'boc',
    ojo: 'ojo',
    correo: 'cor',
  }
  return sites[site] || sites.elcomercio
}

const getTypeStory = data => {
  const type = data.promo_items
  const arrType = Object.keys(type)
  return arrType[0] === 'basic_gallery'
}

const getVars = (
  { globalContent, arcSite, isStory, requestUri, port = 'port1' },
  isGallery
) => {
  const { id, multimediaType, primarySectionLink } = new StoryData({
    data: globalContent,
    arcSite,
  })

  const typeSpace = isGallery ? 'nota2' : port
  const site = arcSite
  const template = isStory ? 'nota' : 'portada'
  const path = requestUri.split('?')[0]
  let section = ''
  let subsection = ''
  if (requestUri) {
    if (path === '/') {
      section = 'home'
    } else {
      const sectionList = path.split('/').slice(1)
      section =
        sectionList[0] === 'noticia' ? 'tags' : sectionList[0].replace('-', '')
      const storySlug = sectionList[sectionList.length - 1]
      const hasStory =
        storySlug.endsWith('-noticia') || storySlug.endsWith('-noticia/')
      if (
        (hasStory && sectionList.length >= 3) ||
        (!hasStory && sectionList.length >= 2)
      ) {
        const subSectionList = primarySectionLink.split('/').slice(1)
        subsection = subSectionList[1].replace('-', '')
      }
    }
  }

  return `
  var type_space = '${typeSpace}'
  var site = '${getSite(site)}'
  var type_template = '${template}'
  var section = '${section}'
  var subsection = '${subsection}'
  var path_name = '${path}'
  var tipo_nota = '${getMultimedia(multimediaType, true)}'
  var id_nota = '${id}'
`
}
const AppNexus = props => {
  const { isStory, globalContent } = props
  const isGallery = isStory && getTypeStory(globalContent)
  const data = getVars(props, isGallery)
  return (
    <script type="text/javascript" dangerouslySetInnerHTML={{ __html: data }} />
  )
}

export default AppNexus
