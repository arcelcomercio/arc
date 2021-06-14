import { useContent } from 'fusion:content'
import * as React from 'react'
import { ArcSite } from 'types/fusion'
import { AnyObject } from 'types/utils'

import RederStory from './render-story'

const GetStory: React.FC<{
  link: string
  contextPath: string
  arcSite: ArcSite
  requestUri: string
  refCallback: string
  deployment: AnyObject
}> = (props) => {
  const {
    link = '',
    arcSite,
    refCallback,
    contextPath,
    deployment,
    requestUri,
  } = props
  const dataStory =
    useContent({
      source: 'story-by-url-and-related-filter',
      query: {
        website_url: link,
        presets: 'large:980x528,landscape_md:482x274,landscape_s:280x159',
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
            deployment={deployment}
          />
        )}
      </div>
    </div>
  )
}

export default GetStory
