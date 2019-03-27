/* eslint-disable prefer-template */
import React, { Fragment } from 'react'

export default props => {
  const { data: { tags: data = [] } = {} } = props
  const classes = {
    tagsName: 'tags',
    titulo: 'tags__title',
    item: 'tags__item',
  }
  return (
    <Fragment>
      <div className={classes.tagsName}>
        <h4 className={classes.titulo}>Tags Relacionados:</h4>
        {data.map((itemRows, key) => (
          // eslint-disable-next-line react/no-array-index-key
          <h2 key={key} className={classes.item}>
            <a href={itemRows && itemRows.slug && '/noticias/' + itemRows.slug}>
              {itemRows && itemRows.text && itemRows.text}
            </a>
          </h2>
        ))}
      </div>
    </Fragment>
  )
}
