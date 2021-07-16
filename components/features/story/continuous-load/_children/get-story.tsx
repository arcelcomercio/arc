import { useContent } from 'fusion:content'
import getProperties from 'fusion:properties'
import * as React from 'react'
import { ArcSite } from 'types/fusion'
import { Story } from 'types/story'

import { GALLERY_VERTICAL } from '../../../../utilities/constants/subtypes'
import { getMultimediaAnalitycs } from '../../../../utilities/helpers'
import StoryData from '../../../../utilities/story-data'
import RederStory from './render-story'

declare global {
  interface Window {
    lazyLoadInstance: any
    dataLayer: any
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
}> = props => {
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
  const { siteUrl = '' } = getProperties(arcSite)
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
      transform: story => {
        if (story?._id) {
          if (typeof window !== 'undefined') {
            const {
              multimediaType,
              id,
              getPremiumValue,
              author,
              nucleoOrigen,
              formatOrigen,
              contentOrigen,
              genderOrigen,
              primarySectionLink,
              tags,
            } = new StoryData({ data: story, arcSite, contextPath })
            const type = getMultimediaAnalitycs(multimediaType, subtype, true)
            const sectionList = primarySectionLink.split('/').slice(1) || []
            const premium = getPremiumValue === 'premium' && true

            document.title = title
            window.history.pushState({}, title, link)

            window.dataLayer = window.dataLayer || []
            window.dataLayer.push({
              event: 'carga_continua',
              url_path: `${link}?ref=nota&ft=cargacontinua&nota=${index + 1}`,
              seccion: sectionList[0] || 'sin-definir',
              subseccion: sectionList[1] || 'sin-definir',
              // url_title: title,
              tipo_nota: type,
              id_nota: id,
              tag1: tags[0]?.slug || 'sin-definir',
              tag2: tags[1]?.slug || 'sin-definir',
              premium: `${premium}`,
              autor: author || 'Redacción',
              nucleo_ID: nucleoOrigen,
              tipo_formato: formatOrigen,
              tipo_contenido: contentOrigen,
              genero: genderOrigen,
            })
          }

          setIsLoading(false)
        }
        return story
      },
    }) || {}

  const container = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
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
    <div
      id={`nota${index + 1}`}
      className={dataStory?.subtype || ''}
      ref={container}>
      {dataStory?._id && (
        <RederStory
          data={dataStory}
          contextPath={contextPath}
          arcSite={arcSite}
          requestUri={requestUri}
          deployment={deployment}
          siteUrl={siteUrl}
          index={index}
        />
      )}
    </div>
  )
}

export default GetStory
