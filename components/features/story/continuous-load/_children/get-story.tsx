import { useContent } from 'fusion:content'
import * as React from 'react'
import { ArcSite } from 'types/fusion'
import { Story } from 'types/story'

import RederStory from './render-story'

const GetStory: React.FC<{
  link: string
  title: string
  contextPath: string
  arcSite: ArcSite
  requestUri: string
  deployment: (resource: string) => string | string
  setIsLoading: (value: boolean) => void
}> = (props) => {
  const {
    link = '',
    title = '',
    arcSite,
    contextPath,
    deployment,
    requestUri,
    setIsLoading,
  } = props
  const dataStory: Story =
    useContent({
      source: 'story-by-url-and-related-filter',
      query: {
        website_url: link,
        presets: 'large:980x528,landscape_md:482x274,landscape_s:280x159',
        section: '',
        includedFields: `websites.${arcSite}.website_url,headlines.basic,promo_items.basic_gallery.type,subtype,content_restrictions.content_code`,
      },
      transform: (story) => {
        if (story?._id) {
          setIsLoading(false)
        }
        return story
      },
    }) || {}

  const container = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (window.location.pathname !== link) {
                document.title = title
                window.history.pushState({}, title, link)
              }
            }
          })
        },
        { rootMargin: '0px 0px 0px 0px', threshold: 0.1 }
      )
      if (container.current) {
        observer.observe(container.current)
      }
    }
  }, [])

  return (
    <div ref={container}>
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
