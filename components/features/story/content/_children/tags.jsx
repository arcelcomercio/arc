import React from 'react'
import UtilListKey from '../../../../utilities/list-keys'

const classes = {
  container: 'mt-25 mb-20',
  title:
    'amp-story-tags__title uppercase mb-5 primary-font font-bold text-sm line-h-none',
  tag: 'inline-block primary-font text-sm mr-10 mb-5',
  link: 'amp-story-tags__link text-gray-200',
}
const StoryContentChildTags = props => {
  const { data, contextPath } = props
  return (
    data.length > 0 && (
      <div className={classes.container}>
        <h4 className={classes.title}>Tags Relacionados:</h4>
        {data.map(
          ({ slug, text }, idx) =>
            slug &&
            text && (
              <h2 key={UtilListKey(idx)} className={classes.tag}>
                <a
                  className={classes.link}
                  href={slug && `${contextPath}/noticias/${slug}`}>
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
