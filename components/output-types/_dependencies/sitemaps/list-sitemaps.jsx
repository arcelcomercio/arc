import React from 'react'
import NewElement from '../../../global-components/new-element'

const SiteMapsItem = ({ siteUrl }) => {
  return (
    <NewElement nameElement="sitemap">
      <NewElement nameElement="loc">{siteUrl}</NewElement>
    </NewElement>
  )
}

const ListSiteMaps = ({ sections, siteUrl }) => {
  const list = sections.map(section => {
    const { _id = '' } = section
    const url = `${siteUrl}/sitemaps${_id}.xml`
    return <SiteMapsItem siteUrl={url} />
  })
  return list
}

export default ListSiteMaps
