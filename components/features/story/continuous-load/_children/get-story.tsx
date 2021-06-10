import { useContent } from 'fusion:content'
// import * as React from 'react'

const getStory: any = (link: string, arcSite: string) => {
  const dataStory =
    useContent({
      source: 'story-by-url-and-related-filter',
      query: {
        website_url: link,
        section: '',
        includedFields: `websites.${arcSite}.website_url,headlines.basic,promo_items.basic_gallery.type,subtype,content_restrictions.content_code`,
      },
    }) || {}

  console.log('=> link', link)
  console.log('=> arcSite', arcSite)
  console.log('=> data story', dataStory)
  return { title: dataStory.title }
}

export default getStory
