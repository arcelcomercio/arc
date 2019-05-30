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

const getVars = ({ arcSite, port = 'port1' }) => {
  const typeSpace = port
  const site = arcSite
  return `
  var type_space = '${typeSpace}'
  var site = '${getSite(site)}'
`
}
const AppNexus = props => {
  const data = getVars(props)
  return (
    <script type="text/javascript" dangerouslySetInnerHTML={{ __html: data }} />
  )
}

export default AppNexus
