import React from 'react'
import { getIcon } from '../../../../utilities/helpers'

const classes = {
  cardDestaque: 'tv-highlight',
  container: 'tv-highlight__container',
  titleBox: 'tv-highlight__box-title',
  title: 'tv-highlight__title',
  subtitleBox: 'tv-highlight__box-sub',
  subtitle: 'tv-highlight__section',
  imgBox: 'tv-highlight__box-image',
  image: 'tv-highlight__img',
  imgIcon: 'tv-highlight__icon',
  tagContainer: 'tv-highlight__tags',
  tagTitle: 'tv-highlight__related',
  list: 'tv-highlight__list',
  listItem: 'tv-highlight__item',
  listItemLink: 'tv-highlight__link',
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
          {/* <span className="tv-highlight__social"></span> */}
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
