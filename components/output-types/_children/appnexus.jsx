import React from 'react'

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

const getVars = ({ arcSite, isStory, requestUri, port = 'port1' }) => {
  const typeSpace = port
  const site = arcSite
  const template = isStory ? 'nota' : 'portada'
  let path = ''
  let section = ''
  let subsection = ''
  if (requestUri) {
    path = requestUri.includes('?_website')
      ? requestUri.slice(0, requestUri.length - 20)
      : requestUri
    if (path === '/') {
      section = 'home'
    } else {
      const sectionList = path.split('/').slice(1)
      section =
        sectionList[0] === 'noticia' ? 'tags' : sectionList[0].replace('-', '')
      const hasNew = sectionList[sectionList.length - 1].endsWith('-noticia')
      if (hasNew && sectionList.length >= 3) {
        subsection = sectionList[1].replace('-', '')
      }
      if (!hasNew && sectionList.length >= 2) {
        subsection = sectionList[1].replace('-', '')
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
`
}
const AppNexus = props => {
  const data = getVars(props)
  return (
    <script type="text/javascript" dangerouslySetInnerHTML={{ __html: data }} />
  )
}

export default AppNexus
