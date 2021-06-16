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
import RawHTMLContinue from '../../_children/contents/_children/rawHtml'
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
}> = (props) => {
  const { contextPath, arcSite, requestUri, data, deployment } = props
  const trustproject = data?.label?.trustproject

  const {
    isPremium,
    primarySection,
    primarySectionLink,
    title,
    websiteLink,
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
      canonicalUrl: websiteLink,
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
      postPermaLink: websiteLink,
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
      canonicalUrl: websiteLink,
      authorsList,
      liteAdsEvery: 2,
    }),
    StoryMostReadLite({
      primarySectionLink,
      deployment,
      contextPath,
      arcSite,
      viewImage: true,
      storiesQty: 10,
      customTitle: '',
      customLink: '',
    }),
  ]
  React.useEffect(() => {
    contentElements.map((element: { content?: string; type: string }) => {
      const content = element?.content || ''
      const type = element?.type
      const isRawHtml = type === ELEMENT_RAW_HTML
      return isRawHtml && RawHTMLContinue({ content })
    })
  }, [contentElements])

  return (
    <>
      <StorySidebarContinueLayout children={children} />
    </>
  )
}

export default rederStory
