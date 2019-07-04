import React from 'react'
import UtilListKey from '../../../../utilities/list-keys'

const classes = {
  container: 'story-tags mt-25 mb-20',
  title:
    'story-tags__title uppercase mb-5 primary-font font-bold text-md line-h-none',
  tag: 'inline-block primary-font text-md',
  link: 'story-tags__link text-gray-200 p-5',
}
const StoryContentChildTags = props => {
  const { data, isAmp } = props
  return (
    data.length > 0 && (
      <div className={classes.container}>
        <h4 className={isAmp ? `amp-${classes.title}` : classes.title}>
          Tags Relacionados:
        </h4>
        {data.map(
          ({ slug, text }, idx) =>
            slug &&
            text && (
              <h2 key={UtilListKey(idx)} className={classes.tag}>
                <a
                  className={isAmp ? `amp-${classes.link}` : classes.link}
                  href={slug && `/noticias/${slug}`}>
                  {text}
                </a>
              </h2>
            )
        )}
      </div>
    )
  )
}

export default StoryContentChildTags
