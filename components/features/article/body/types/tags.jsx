import React, { Fragment } from 'react'
const Tables = props => {
  const { tags } = props.data
  const classes = {
    tags: 'tags',
    titulo: 'tags__title',
    item: 'tags__item',
  }
  return (
    <Fragment>
      <div className={classes.tags}>
        <h4 className={classes.titulo}>Tags Relacionados:</h4>
        {tags.map(itemRows => (
          <h2 className={classes.item}>
            <a href={'/noticias/' + itemRows.slug}>{itemRows.text}</a>
          </h2>
        ))}
      </div>
    </Fragment>
  )
}
export default Tables
