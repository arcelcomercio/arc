import React from 'react'

const classes = {
  image: 'story-content__visual--image w-full',
  caption: 'story-content__caption pt-10 secondary-font text-md',
}

const StoryContentChildImage = ({
  multimediaLandscapeMD,
  multimediaStorySmall,
  multimediaLarge,
  caption,
  showCaption = true,
}) => {
  return (
    <>
      <picture>
        <source srcSet={multimediaLandscapeMD} media="(max-width: 320px)" />
        <source srcSet={multimediaStorySmall} media="(max-width: 767px)" />
        <img
          className={classes.image}
          srcSet={multimediaLarge}
          alt={caption}          
        />
        {showCaption && (
          <figcaption className={classes.caption}>{caption} </figcaption>
        )}
      </picture>
    </>
  )
}

export default StoryContentChildImage
