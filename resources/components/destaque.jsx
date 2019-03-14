import React from 'react'

const classes = {
  destaque: 'destaque padding-normal flex flex--column row-1',
  gradient: 'destaque__gradient full-width block',
  detail: 'destaque__detail flex flex--column flex--justify-between',
  image: 'destaque__image',

  category: 'destaque__category',
  title: 'destaque__title',
  author: 'destaque__author',

  link: 'destaque__link',
  imageLink: 'block',

  imgComplete: 'destaque--img-complete',
  parcialTop: 'flex--column-reverse',

  twoCol: 'col-2',
  // Headbands
  headband: 'destaque__headband',
  headbandLink: 'destaque__headband-link',

  live: 'destaque--live',
}

export default props => {
  const {
    category,
    title,
    author,
    image,
    imageSize,
    headband,
    size,
    editableField,
    titleField,
    categoryField,
  } = props

  const getImageSizeClass = () => {
    switch (imageSize) {
      case 'complete':
        return classes.imgComplete
      case 'parcialTop':
        return classes.parcialTop
      default:
        return ''
    }
  }

  const getHeadBandClass = () => {
    if (headband === 'live') {
      return classes.live
    }
    return ''
  }

  const getEditafleField = element => {
    if (editableField) {
      return editableField(element)
    }
    return null
  }

  return (
    <article
      className={`${
        classes.destaque
      } ${getImageSizeClass()} ${getHeadBandClass()} ${
        size === 'twoCol' ? classes.twoCol : ''
      }`}>
      {imageSize === 'complete' && <span className={classes.gradient} />}
      <div className={classes.detail}>
        {headband === 'normal' || !headband ? (
          <h3 className={classes.category}>
            <a
              className={classes.link}
              href={category.url}
              {...getEditafleField('categoryField')}
              suppressContentEditableWarning>
              {categoryField || category.name}
            </a>
          </h3>
        ) : (
          <div className={classes.headband}>
            <a
              href={category.url}
              className={`${classes.link} ${classes.headbandLink}`}>
              {headband === 'live' ? 'En vivo' : ''}
            </a>
          </div>
        )}
        <h2 className={classes.title}>
          <a
            className={classes.link}
            href={title.url}
            {...getEditafleField('titleField')}
            suppressContentEditableWarning>
            {titleField || title.name}
          </a>
        </h2>

        <span className={classes.author}>
          <a className={classes.link} href={author.url}>
            {author.name}
          </a>
        </span>
      </div>
      <figure className={classes.image}>
        <a className={classes.imageLink} href={title.url}>
          <img src={image} alt="" />
        </a>
      </figure>
    </article>
  )
}
