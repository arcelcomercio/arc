import { useContent } from 'fusion:content'
import * as React from 'react'
import { ArcSite } from 'types/fusion'

import RederStory from './render-story'

const GetStory: React.FC<{
  link: string
  contextPath: string
  arcSite: ArcSite
  requestUri: string
  refCallback: string
}> = (props) => {
  const { link = '', arcSite, refCallback, contextPath, requestUri } = props
  console.log('Primerrrrrrrrrr', props)

  const dataStory =
    useContent({
      source: 'story-by-url-and-related-filter',
      query: {
        website_url: link,
        section: '',
        includedFields: `websites.${arcSite}.website_url,headlines.basic,promo_items.basic_gallery.type,subtype,content_restrictions.content_code`,
      },
    }) || {}
  const { headlines: { basic: title = '' } = {} } = dataStory || {}
  console.log('dataStorydataStoryxxx', dataStory)
  return (
    <div>
      {dataStory && (
        <RederStory
          data={dataStory}
          contextPath={contextPath}
          arcSite={arcSite}
          requestUri={requestUri}
        />
      )}
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
