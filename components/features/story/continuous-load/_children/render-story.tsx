/* eslint-disable react/no-children-prop */
import { useAppContext } from 'fusion:context'
import * as React from 'react'
import { ArcSite } from 'types/fusion'
import { Story } from 'types/story'

import { env } from '../../../../utilities/arc/env'
import { ELEMENT_RAW_HTML } from '../../../../utilities/constants/element-types'
import {
  SITE_ELCOMERCIOMAG,
  SITE_PERU21G21,
} from '../../../../utilities/constants/sitenames'
import {
  BIG_IMAGE,
  GALLERY_SLIDER,
  GALLERY_VERTICAL,
} from '../../../../utilities/constants/subtypes'
import StoryData from '../../../../utilities/story-data'
import ScriptsContinue from '../../_children/contents/_dependencies/scripts'
import StoryChildrenContentsLite from '../../_children/contents/lite'
import StoryChildrenContinueHeader from '../../_children/continue-header/lite'
import StoryChildrenGalleryLite from '../../_children/gallery/lite'
import StoryMostReadLite from '../../_children/most-read/lite'
import StoryChildrenMultimediaLte from '../../_children/multimedia/lite'
import StoryChildrenSocialHeaderLite from '../../_children/social-header/lite'
import StoryChildrenTitle from '../../_children/title/lite'
import StorySidebarContinueLayout from './layout'

declare global {
  interface Window {
    instgrm: any
    widgetsObserver: any
    createScript: any
    adsContinua: any
    userPaywall: any
  }
}

const rederStory: React.FC<{
  data: Story
  contextPath: string
  arcSite: ArcSite
  requestUri: string
  deployment: (resource: string) => string | string
  siteUrl: string
  index: number
}> = (props) => {
  const {
    contextPath,
    arcSite,
    requestUri,
    data,
    deployment,
    siteUrl,
    index,
  } = props
  const trustproject = data?.label?.trustproject

  const { siteProperties } = useAppContext()

  const {
    isPremium,
    getPremiumValue,
    primarySection,
    primarySectionLink,
    title,
    link,
    subTitle,
    promoItems,
    contentElementsListOne,
    subtype,
    multimediaLarge,
    multimediaLandscapeMD,
    multimediaLandscapeS,
    promoItemJwplayer,
    tags: tagsStory,
    displayDate,
    publishDate,
    createdDate,
    authorImage,
    authorLink,
    author,
    role,
    locality,
    contentElements,
    authorsList,
    authorEmail,
    metaTitle,
  } = new StoryData({
    data,
    contextPath,
    arcSite,
  })
  const typeGallery = data?.promo_items?.basic_gallery?.type
  const gellery =
    StoryChildrenGalleryLite({
      subtype,
      canonicalUrl: link,
      multimediaLarge,
      multimediaLandscapeMD,
      multimediaLandscapeS,
      isPremium,
      promoItems,
      primarySection,
      promoItemJwplayer,
    }) || ''

  const multimedia =
    StoryChildrenMultimediaLte({
      promoItems,
      primarySection,
      primarySectionLink,
      subtype,
      multimediaLarge,
      multimediaLandscapeMD,
      multimediaLandscapeS,
      promoItemJwplayer,
      tags: tagsStory,
    }) || ''

  let multimediaVertical
  let multimediaHorizontal
  if (
    subtype === BIG_IMAGE ||
    (typeGallery === 'gallery' && subtype === GALLERY_SLIDER)
  ) {
    multimediaHorizontal = typeGallery === 'gallery' ? gellery : multimedia
  } else {
    multimediaVertical = subtype === GALLERY_VERTICAL ? gellery : multimedia
  }

  const children = [
    StoryChildrenContinueHeader({
      hideAnchor: false,
      title,
      metaTitle,
    }),
    StoryChildrenSocialHeaderLite({
      arcSite,
      primarySectionLink,
      primarySection,
      postTitle: title,
      postPermaLink: link,
      isPremium,
      trustproject,
    }),
    StoryChildrenTitle({
      arcSite,
      primarySectionLink,
      primarySection,
      title,
      contentElementsListOne,
      subTitle,
      isPremium,
    }),
    multimediaHorizontal,
    multimediaVertical,
    StoryChildrenContentsLite({
      arcSite,
      contextPath,
      requestUri,
      shareAlign: 'right',
      copyLink: true,
      displayDate,
      publishDate,
      createdDate,
      authorImage,
      authorLink,
      author,
      role,
      locality,
      primarySection,
      authorEmail,
      subtype,
      isPremium,
      multimediaLarge,
      multimediaLandscapeMD,
      multimediaLandscapeS,
      tags: tagsStory,
      contentElements,
      canonicalUrl: link,
      authorsList,
      liteAdsEvery: 2,
      index,
    }),
    StoryMostReadLite({
      primarySectionLink,
      deployment,
      contextPath,
      arcSite,
      viewImage: arcSite !== 'depor',
      storiesQty: arcSite === 'depor' ? 7 : 3,
      customTitle: '',
      customLink: '',
    }),
  ]

  const jsSpacesAds = () => {
    const noteId = index + 1
    const typeNote = subtype === 'gallery_vertical' ? 'galeria_v' : 'post'
    const sectionList = link.split('/').slice(1)
    const sectionClean = sectionList[0]?.replace(/-/gm, '')
    const subSection = sectionList[1]
      ? sectionList[1]?.replace(/-/gm, '')
      : sectionClean
    const linkSpaceUrl = `https://d2dvq461rdwooi.cloudfront.net/${arcSite}/${typeNote}/${sectionClean}/spaces.js?nota=${noteId}&date=${new Date()
      .toISOString()
      .slice(0, 10)}`
    try {
      const node = document.createElement('script')
      node.type = 'text/javascript'
      node.async = true
      node.src = linkSpaceUrl
      document.head.append(node)
    } catch (error) {
      // TODO: ...
    }

    try {
      if (typeof window !== 'undefined') {
        let typeContent = getPremiumValue
        typeContent =
          typeContent === '' || typeContent === 'vacio'
            ? 'standar'
            : typeContent
        const targetingTags = tagsStory
          .map(({ slug = '' }) => slug.split('-').join(''))
          .join()
        window.adsContinua[noteId] = window.adsContinua[noteId] || {}
        window.adsContinua[noteId].targeting = {
          categoria: subSection,
          contenido: typeContent,
          fuente: 'WEB',
          paywall: window.userPaywall(),
          phatname: `${siteUrl}${link}`,
          publisher: arcSite,
          seccion: sectionClean,
          tags: targetingTags,
          tipoplantilla: 'post',
          tmp_ad: '',
        }
      }
    } catch (error) {
      // TODO: ...
    }
  }

  const changeTwitter = () => {
    const windowW = 600
    const windowH = 400
    const $shareButtons = document.body.querySelectorAll('a[data-share]')
    if ($shareButtons && $shareButtons.length > 0) {
      const wLeft = window.screen.width / 2 - windowW / 2
      const wTop = window.screen.height / 2 - windowH / 2
      $shareButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
          const href = button.getAttribute('href') || ''
          e.preventDefault()
          window.open(
            href,
            '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${windowW}, height=${windowH}, top=${wTop}, left=${wLeft}`
          )
        })
      })
    }
  }

  const jwplayerObserver = () => {
    const videos = Array.from(document.body.querySelectorAll('.jwplayer-lazy'))
    videos.forEach((entry) => {
      const { id = '' } = entry
      if (id) {
        const linkElem = `https://cdn.jwplayer.com/libraries/${id}.js`
        const node = document.createElement('script')
        node.type = 'text/javascript'
        node.src = linkElem
        document.head.append(node)
      }
    })
  }

  const isScriptLoaded = (src: string) =>
    !!document.querySelector(`script[src="${src}"]`)

  const createScript = ({ src, async }: { src: string; async: boolean }) => {
    const node = document.createElement('script')
    if (isScriptLoaded(src) === false) {
      if (src) {
        node.type = 'text/javascript'
        node.src = src
      }
      if (async) {
        node.async = true
      }
    }
    return document.body.append(node)
  }

  const checkInstagramScript = () => {
    if (
      document.querySelector('script[src="https://www.instagram.com/embed.js"]')
    ) {
      window.instgrm.Embeds.process()
    } else if ('IntersectionObserver' in window) {
      const options = {
        rootMargin: '0px 0px 500px 0px',
      }
      const embeds = Array.from(document.body.querySelectorAll('.embed-script'))
      const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
          const { isIntersecting, target } = entry
          if (isIntersecting) {
            const type = target.getAttribute('data-type')
            if (type === 'instagram') {
              createScript({
                src: 'https://www.instagram.com/embed.js',
                async: true,
              })
            } else {
              createScript({
                src: 'https://platform.twitter.com/widgets.js',
                async: true,
              })
            }
            currentObserver.unobserve(target)
          }
        })
      }, options)
      embeds.forEach((embed) => {
        observer.observe(embed)
      })
    }
  }

  const ckeckTikTokScript = () => {
    if (
      document.querySelectorAll('script[src="https://www.tiktok.com/embed.js"]')
        .length > 0
    ) {
      document
        .querySelectorAll('script[src="https://www.tiktok.com/embed.js"]')
        .forEach((e) => e.parentNode?.removeChild(e))
      createScript({
        src: 'https://www.tiktok.com/embed.js',
        async: true,
      })
    }
  }

  const setGalleryStyles = () => {
    const CURRENT_ENVIRONMENT = env
    const style = 'dlite-vgallery'
    if (subtype === GALLERY_VERTICAL) {
      let styleUrl = `${contextPath}/resources/dist/${arcSite}/css/${style}.css`
      if (CURRENT_ENVIRONMENT === 'prod') {
        styleUrl = `https://cdnc.${siteProperties.siteDomain}/dist/${arcSite}/css/${style}.css`
      }
      if (arcSite === SITE_ELCOMERCIOMAG && CURRENT_ENVIRONMENT === 'prod') {
        styleUrl = `https://cdnc.mag.elcomercio.pe/dist/${arcSite}/css/${style}.css`
      }
      if (arcSite === SITE_PERU21G21 && CURRENT_ENVIRONMENT === 'prod') {
        styleUrl = `https://cdnc.g21.peru21.pe/dist/${arcSite}/css/${style}.css`
      }
      styleUrl = deployment(styleUrl)
      const cssId = 'dlite-vgallery'
      if (!document.getElementById(cssId)) {
        const head = document.getElementsByTagName('head')[0]
        const linkEl = document.createElement('link')
        linkEl.id = cssId
        linkEl.rel = 'stylesheet'
        linkEl.type = 'text/css'
        linkEl.href = styleUrl
        head.appendChild(linkEl)
      }
    }
  }

  React.useEffect(() => {
    contentElements.map((element: { content?: string; type: string }) => {
      const content = element?.content || ''
      const type = element?.type
      const isRawHtml = type === ELEMENT_RAW_HTML
      return isRawHtml && ScriptsContinue({ content })
    })
    changeTwitter()
    jwplayerObserver()
    checkInstagramScript()
    ckeckTikTokScript()
    jsSpacesAds()
    setGalleryStyles()
  }, [contentElements])

  return (
    <>
      <StorySidebarContinueLayout
        children={children}
        index={index}
        arcSite={arcSite}
      />
    </>
  )
}

export default rederStory
