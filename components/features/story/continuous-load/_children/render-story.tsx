/* eslint-disable react/no-children-prop */
import * as React from 'react'
import { ArcSite } from 'types/fusion'
import { Story } from 'types/story'

import { ELEMENT_RAW_HTML } from '../../../../utilities/constants/element-types'
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

const rederStory: React.FC<{
  data: Story
  contextPath: string
  arcSite: ArcSite
  requestUri: string
  deployment: (resource: string) => string | string
  index: number
}> = props => {
  const { contextPath, arcSite, requestUri, data, deployment, index } = props
  const trustproject = data?.label?.trustproject
  console.log('Render Notaaaaaa')

  const {
    isPremium,
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
      viewImage: true,
      storiesQty: 3,
      customTitle: '',
      customLink: '',
    }),
  ]

  const changeTwitter = () => {
    const windowW = 600
    const windowH = 400
    const $shareButtons = document.body.querySelectorAll('a[data-share]')
    if ($shareButtons && $shareButtons.length > 0) {
      const wLeft = window.screen.width / 2 - windowW / 2
      const wTop = window.screen.height / 2 - windowH / 2
      $shareButtons.forEach(button => {
        button.addEventListener('click', e => {
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
    videos.forEach(entry => {
      const { id = '' } = entry
      if (id) {
        const nameId = id.split('_')
        if (nameId[1]) {
          const linkElem = `https://cdn.jwplayer.com/players/${nameId[1]}-${nameId[2]}.js`
          const node = document.createElement('script')
          node.type = 'text/javascript'
          node.src = linkElem
          document.head.append(node)
        }
      }
    })
  }

  // const jsSpacesAds = () => {
  //   const typeNote = subtype == 'gallery_vertical' ? 'galeria_v' : 'post'
  //   const sectionClean = primarySectionLink?.split('/')[1]?.replace(/-/gm, '')
  //   const linkUrl = `https://d37z8six7qdyn4.cloudfront.net/${arcSite}/${typeNote}/${sectionClean}/spaces.js?nota=${index +
  //     1}&date=${new Date().toISOString().slice(0, 10)}`
  //   try {
  //     const node = document.createElement('script')
  //     node.type = 'text/javascript'
  //     node.async = true
  //     node.src = linkUrl
  //     document.head.append(node)
  //   } catch (error) {}
  // }
  // jsSpacesAds()

  React.useEffect(() => {
    contentElements.map((element: { content?: string; type: string }) => {
      const content = element?.content || ''
      const type = element?.type
      const isRawHtml = type === ELEMENT_RAW_HTML
      return isRawHtml && ScriptsContinue({ content })
    })
    changeTwitter()
    jwplayerObserver()
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
