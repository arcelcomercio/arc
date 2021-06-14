import { useContent } from 'fusion:content'
import * as React from 'react'
import { ArcSite } from 'types/fusion'
import { Story } from 'types/story'

import RederStory from './render-story'

const GetStory: React.FC<{
  link: string
  contextPath: string
  arcSite: ArcSite
  requestUri: string
  deployment: (resource: string) => string | string
}> = (props) => {
  const { link = '', arcSite, contextPath, deployment, requestUri } = props
  const dataStory: Story | undefined = useContent({
    source: 'story-by-url-and-related-filter',
    query: {
      website_url: link,
      section: '',
      includedFields: `websites.${arcSite}.website_url,headlines.basic,promo_items.basic_gallery.type,subtype,content_restrictions.content_code`,
    },
  })

  console.log('GetStory>>', dataStory)

  return (
    <div>
      {dataStory?._id && (
        <RederStory
          data={dataStory}
          contextPath={contextPath}
          arcSite={arcSite}
          requestUri={requestUri}
          deployment={deployment}
        />
      )}
    </div>
  )
}

export default GetStory
