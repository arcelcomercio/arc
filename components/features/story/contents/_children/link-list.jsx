import React from 'react'

const classes = {
  related: 'related-internal position-relative p-20 mb-20 mt-20',
  item: 'related-internal__item flex flex-row mt-20',
  title: 'related-internal__title uppercase mb-20',

  linkAuthor: 'related-internal__link-author',

  icon:
    'related-internal__multimedia-icon position-absolute p-5 rounded-lg title-xl',
  info: 'related-internal__information w-full md:pr-10 pl-20',
  titleLink: 'related-internal__title-link underline font-bold',

  container: 'link-list position-relative p-20 mb-20 mt-20',
  multimedia: 'link-list__figure position-relative',
  image: 'w-full h-full lazy',
}

const Item = ({ url, title, image }) => {
  return (
    <div className={classes.item}>
      <figure className={classes.multimedia}>
        <a href={url}>
          <img
            src={image}
            data-src={image}
            alt={title}
            className={classes.image}
          />
        </a>
      </figure>
      <div className={classes.info}>
        <h2 className={classes.titleLink}>
          <a href={url}>{title}</a>
        </h2>
      </div>
    </div>
  )
}

function linkList({ items }) {
  return (
    <div className={classes.container}>
      <div className={classes.title}>Mira también:</div>
      {items &&
        items.map(data => {
          const { url = '', content = '', image: { url: urlImg = '' } = {} } =
            data || {}
          return <Item url={url} title={content} image={urlImg} />
        })}
    </div>
  )
}

export default linkList
