import React from 'react'
import NewElement from '../../../global-components/new-element'

const SiteMapsItem = ({ siteUrl }) => {
  return (
    <NewElement nameElement="sitemap">
      <NewElement nameElement="loc">{siteUrl}</NewElement>
    </NewElement>
  )
}

export const ListSiteMaps = ({ sections, siteUrl }) => {
  const list = sections.map(section => {
    const { _id = '', parent = {} } = section
    const { default: primary } = parent

    let result = null
    if (primary === '/') {
      const url = `${siteUrl}/arcio/sitemap${_id}`
      result = <SiteMapsItem siteUrl={url} />
    }
    return result
  })
  return list
}

export const ListNewsSiteMaps = ({ sections, siteUrl }) => {
  const list = sections.map(section => {
    const { _id = '', parent = {} } = section
    const { default: primary } = parent

    let result = null
    if (primary === '/') {
      const url = `${siteUrl}/arcio/news-sitemap${_id}`
      result = <SiteMapsItem siteUrl={url} />
    }
    return result
  })
  return list
}
