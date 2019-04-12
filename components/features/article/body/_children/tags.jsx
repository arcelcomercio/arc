import React from 'react'

const classes = {
  tagsName: 'tags',
  titulo: 'tags__title',
  item: 'tags__item',
}
export default props => {
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
