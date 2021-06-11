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
  const dataStory =
    useContent({
      source: 'story-by-url-and-related-filter',
      query: {
        website_url: link,
        section: '',
        includedFields: `websites.${arcSite}.website_url,headlines.basic,promo_items.basic_gallery.type,subtype,content_restrictions.content_code`,
      },
    }) || {}
  return (
    <div>
      <div ref={refCallback}>
        {dataStory && (
          <RederStory
            data={dataStory}
            contextPath={contextPath}
            arcSite={arcSite}
            requestUri={requestUri}
          />
        )}
      </div>
    </div>
  )
}

export default GetStory
