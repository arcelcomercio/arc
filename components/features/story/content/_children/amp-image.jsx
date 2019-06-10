import React from 'react'

import Image from '@arc-core-components/element_image'

const classes = {
  image: 'visual__image visual__image--cover',
  description: 'news-media-description text-left',
}

const StoryContentChildAmpImage = props => {
  const { data } = props
  return (
    <>
      <div className="media norowmargin">
        <figure>
          <amp-img i-amphtml-layout="responsive">
            <i-amphtml-sizer />
            <Image
              width="100%"
              className={classes.image}
              captionClassName={classes.description}
              sizePreset="large"
              {...data}
            />
          </amp-img>
        </figure>
      </div>
    </>
  )
}

export default StoryContentChildAmpImage
