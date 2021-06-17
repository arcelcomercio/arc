import { useContent } from 'fusion:content'
import * as React from 'react'
import { ArcSite } from 'types/fusion'
import { Story } from 'types/story'

import { GALLERY_VERTICAL } from '../../../../utilities/constants/subtypes'
import RederStory from './render-story'

declare global {
  interface Window {
    lazyLoadInstance: any
  }
}

const GetStory: React.FC<{
  link: string
  title: string
  contextPath: string
  arcSite: ArcSite
  requestUri: string
  subtype: string
  deployment: (resource: string) => string | string
  setIsLoading: (value: boolean) => void
  index: number
}> = (props) => {
  const {
    link = '',
    title = '',
    subtype = '',
    arcSite,
    contextPath,
    deployment,
    requestUri,
    setIsLoading,
    index,
  } = props

  const presets =
    subtype === GALLERY_VERTICAL
      ? 'large:980x0,landscape_md:482x0,landscape_s:280x0'
      : 'large:980x528,landscape_md:482x274,landscape_s:280x159'
  const dataStory: Story =
    useContent({
      source: 'story-by-url-and-related-filter',
      query: {
        website_url: link,
        presets,
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
            if (entry.isIntersecting && window.location.pathname !== link) {
              document.title = title
              window.history.pushState({}, title, link)
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

  React.useEffect(() => {
    if (window.lazyLoadInstance && dataStory?._id) {
      setTimeout(() => {
        window.lazyLoadInstance.update()
      }, 300)
    }
  }, [dataStory?._id])

  return (
    <div id={`nota${index + 1}`} ref={container}>
      {dataStory?._id && (
        <RederStory
          data={dataStory}
          contextPath={contextPath}
          arcSite={arcSite}
          requestUri={requestUri}
          deployment={deployment}
          index={index}
        />
      )}
    </div>
  )
}

export default GetStory
