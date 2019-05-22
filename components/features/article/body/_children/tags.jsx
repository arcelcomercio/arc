import React from 'react'
import UtilListKey from '../../../../utilities/list-keys'

const classes = {
  tagsName: '__tags',
  titulo: '__tag-title',
  item: '__tag-item',
}
const ArticleBodyChildTags = props => {
  const { data = {}, className: classTags } = props
  return (
    data && (
      <div className={`${classTags}${classes.tagsName}`}>
        <h4 className={`${classTags}${classes.titulo}`}>Tags Relacionados:</h4>
        {data.map(
          ({ slug, text }, idx) =>
            slug &&
            text && (
              <h2
                key={UtilListKey(idx)}
                className={`${classTags}${classes.item}`}>
                <a href={slug && `/noticias/${slug}`}>{text}</a>
              </h2>
            )
        )}
      </div>
    )
  )
}

export default ArticleBodyChildTags
