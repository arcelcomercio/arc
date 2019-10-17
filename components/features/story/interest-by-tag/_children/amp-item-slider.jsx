import React from 'react'

const StorySeparatorChildItemSliderAmp = ({ data }) => {
  const { title, link, multimediaLandscapeMD, multimediaType } = data
  return (
    <>
      {multimediaType === 'video' && <span>&#8227;</span>}
      {multimediaType === 'gallery' && <span>G</span>}
      {link && (
        <a href={link} title={title}>
          <amp-img
            src={multimediaLandscapeMD}
            width="240"
            height="160"
            alt={title}>
            <amp-fit-text
              class="caption"
              width="240"
              height="160"
              layout="responsive"
              max-font-size="36">
              {title}
            </amp-fit-text>
          </amp-img>
        </a>
      )}
    </>
  )
}

export default StorySeparatorChildItemSliderAmp
