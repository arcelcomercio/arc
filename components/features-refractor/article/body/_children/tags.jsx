import React from 'react'

const classes = {
  tagsName: 'article-body__tags',
  titulo: 'article-body__tag-title',
  item: 'article-body__tag-item',
}
const ArticleBodyChildTags = props => {
  const { data: { tags: data = [] } = {} } = props
  return (
    data && (
      <div className={classes.tagsName}>
        <h4 className={classes.titulo}>Tags Relacionados:</h4>
        {data.map(
          ({ slug, text }, idx) =>
            slug &&
            text && (
              <h2 key={idx} className={classes.item}>
                <a href={slug && `/noticias/${slug}`}>{text}</a>
              </h2>
            )
        )}
      </div>
    )
  )
}

export default ArticleBodyChildTags
