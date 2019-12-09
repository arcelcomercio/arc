import React from 'react'

const classes = {
  image: 'story-content__visual--image w-full ',
  caption: 'story-content__caption pt-10 secondary-font text-md',
}

const StoryContentChildImage = ({
  multimediaLandscapeMD,
  multimediaStorySmall,
  multimediaLarge,
  multimediaLazyDefault,
  caption,
  showCaption = true,
  primaryImage = false,
}) => {
  return (
    <>
      <picture>
        {primaryImage ? (
          <>
            <source srcSet={multimediaLandscapeMD} media="(max-width: 320px)" />
            <source srcSet={multimediaStorySmall} media="(max-width: 767px)" />
            <img
              src={multimediaLarge}
              alt={caption}
              className={classes.image}
            />
          </>
        ) : (
          <>
            <source
              srcSet={multimediaLazyDefault}
              data-srcset={multimediaLandscapeMD}
              media="(max-width: 320px)"
              className="lazy"
            />
            <source
              srcSet={multimediaLazyDefault}
              data-srcset={multimediaStorySmall}
              media="(max-width: 767px)"
              className="lazy"
            />
            <img
              className={`${classes.image} lazy`}
              src={multimediaLazyDefault}
              data-src={multimediaLarge}
              alt={caption}
            />
          </>
        )}

        {showCaption && (
          <figcaption className={classes.caption}>{caption} </figcaption>
        )}
      </picture>
    </>
  )
}

export default StoryContentChildImage
