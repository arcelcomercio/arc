import React from 'react'
import NewElement from '../global-components/new-element'
import { ListNewsSiteMaps }  from './_dependencies/sitemaps/list-sitemaps'

const propsXml = {
  xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
}

const SiteMaps = props => {
  const {
    globalContent: { q_results: qresult = [] } = [],
    siteProperties: { siteUrl = '' } = [],
  } = props
  const params = {
    sections: qresult,
    siteUrl,
  }

  return (
    <NewElement nameElement="sitemapindex" propsNewElement={propsXml}>
      <ListNewsSiteMaps {...params} />
    </NewElement>
  )
}

SiteMaps.contentType = 'text/xml'

export default SiteMaps
