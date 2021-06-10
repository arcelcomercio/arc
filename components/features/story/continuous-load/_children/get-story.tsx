import { useContent } from 'fusion:content'
import * as React from 'react'

const GetStory: React.FC = (props) => {
  const { link = '', arcSite = '', refCallback } = props
  const dataStory =
    useContent({
      source: 'story-by-url-and-related-filter',
      query: {
        website_url: link,
        section: '',
        includedFields: `websites.${arcSite}.website_url,headlines.basic,promo_items.basic_gallery.type,subtype,content_restrictions.content_code`,
      },
    }) || {}

  console.log('=> link 2', link)
  console.log('=> arcSite', arcSite)
  console.log('=> data story', dataStory)
  const { headlines: { basic: title = '' } = {} } = dataStory || {}
  return (
    <div>
      <h2>{title}</h2>
      <section
        style={{
          height: 700,
          border: '1px solid red',
        }}>
        content 2
      </section>
      <div ref={refCallback}>footer</div>
    </div>
  )
}

export default GetStory
