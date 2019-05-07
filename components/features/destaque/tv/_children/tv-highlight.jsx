import React from 'react'
import { getIcon } from '../../../../utilities/helpers'

const classes = {
  cardDestaque: 'card-destaque-tv',
  container: 'card-destaque-tv__container',
  titleBox: 'card-destaque-tv__box-title',
  title: 'card-destaque-tv__title',
  subtitleBox: 'card-destaque-tv__box-sub',
  subtitle: 'card-destaque-tv__section',
  imgBox: 'card-destaque-tv__box-image',
  image: 'card-destaque-tv__img',
  imgIcon: 'card-destaque-tv__icon',
  tagContainer: 'card-destaque-tv__tags',
  tagTitle: 'card-destaque-tv__related',
  list: 'card-destaque-tv__list',
  listItem: 'card-destaque-tv__item',
  listItemLink: 'card-destaque-tv__link',
}

const TVHighlightComponent = props => {
  const {
    title: { nameTitle, urlTitle },
    category: { nameSection, urlSection },
    multimedia: { multimediaImg, multimediaType },
    tags,
  } = props
  return (
    <div className={classes.cardDestaque}>
      <div className={classes.container}>
        <div className={classes.titleBox}>
          <h1>
            <a href={urlTitle} className={classes.title}>
              {nameTitle}
            </a>
          </h1>
        </div>
        <div className={classes.subtitleBox}>
          <span>
            <a href={urlSection} className={classes.subtitle}>
              {nameSection}
            </a>
          </span>
          {/* <span className="card-destaque-tv__social"></span> */}
        </div>
        <a href={urlTitle} className={classes.imgBox}>
          <img className={classes.image} src={multimediaImg} alt="foto" />
          {multimediaType !== 'basic' && (
            <span className={classes.imgIcon}>{getIcon(multimediaType)}</span>
          )}
        </a>
        {tags && (
          <div className={classes.tagContainer}>
            <p className={classes.tagTitle}>Tag Relacionados:</p>
            <ul className={classes.list}>
              {tags.map(el => {
                return (
                  <li key={el.slug} className={classes.listItem}>
                    <a
                      className={classes.listItemLink}
                      href={`/tag/${el.slug}`}>
                      {el.description}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default TVHighlightComponent
