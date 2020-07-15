import React from 'react'
import StoryData from '../../utilities/story-data'
import { SITE_DIARIOCORREO } from '../../utilities/constants/sitenames'
import { getAssetsPath } from '../../utilities/assets'
import { getResizedUrl } from '../../utilities/resizer'

export default ({
  twitterUser,
  title,
  contextPath,
  arcSite,
  description,
  twitterCreator,
  story,
  globalContent: data,
}) => {
  const {
    multimediaLarge,
    title: seoTitle,
    authorImage,
    primarySectionLink,
  } = new StoryData({
    data,
    arcSite,
  })

  let image =
    story && multimediaLarge
      ? getResizedUrl({
          url: multimediaLarge,
          presets: 'large:980x528',
          arcSite,
        }).large
      : `${getAssetsPath(
          arcSite,
          contextPath
        )}/resources/dist/${arcSite}/images/logo_twitter.jpg?d=1`

  if (arcSite === SITE_DIARIOCORREO && primarySectionLink === '/opinion/') {
    image = authorImage
  }
  return (
    <>
      {/* <!-- Twitter Cards --> */}
      <meta
        name="twitter:card"
        content={story ? 'summary_large_image' : 'summary'}
      />
      <meta name="twitter:site" content={twitterUser} />

      <meta name="twitter:title" content={story ? seoTitle : title} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:description" content={description} />
      {story && <meta name="twitter:creator" content={twitterCreator} />}
    </>
  )
}
