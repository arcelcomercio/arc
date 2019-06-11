import React from 'react'
import UtilListKey from '../../../../utilities/list-keys'

const classes = {
  tagsName: '__tags',
  titulo: '__tag-title uppercase mb-5',
  item: '__tag-item text-sm mr-10 mb-5',
}
const StoryContentChildTags = props => {
  const { data, className: classTags, contextPath } = props
  return (
    data.length > 0 && (
      <div className={`${classTags}${classes.tagsName}`}>
        <h4 className={`${classTags}${classes.titulo}`}>Tags Relacionados:</h4>
        {data.map(
          ({ slug, text }, idx) =>
            slug &&
            text && (
              <h2
                key={UtilListKey(idx)}
                className={`${classTags}${classes.item}`}>
                <a href={slug && `${contextPath}/noticias/${slug}`}>{text}</a>
              </h2>
            )
        )}
      </div>
    )
  )
}

export default StoryContentChildTags
