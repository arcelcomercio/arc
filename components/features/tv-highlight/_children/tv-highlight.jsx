import React from 'react'
import { getIcon } from '../../../utilities/helpers'

const classes = {
  tv: 'tv-highlight',
  container: 'tv-highlight__container',
  titleBox: 'tv-highlight__box-title',
  title: 'tv-highlight__title',
  subBox: 'tv-highlight__box-sub flex justify-between',
  section: 'tv-highlight__section flex uppercase position-relative',
  imageBox: 'block position-relative',
  image: 'w-full h-full object-contain object-center',
  icon: 'tv-highlight__icon position-absolute flex justify-center items-center',
  tags: 'tv-highlight__tags',
  related: 'tv-highlight__related uppercase font-bold',
  list: 'flex',
  item: 'tv-highlight__item',
  link: 'tv-highlight__link',
}

const TVHighlightChild = props => {
  const {
    title: { nameTitle, urlTitle },
    category: { nameSection, urlSection },
    multimedia: { multimediaImg, multimediaType },
    tags,
  } = props
  return (
    <div className={classes.tv}>
      <div className={classes.container}>
        <div className={classes.titleBox}>
          <h1>
            <a href={urlTitle} className={classes.title}>
              {nameTitle}
            </a>
          </h1>
        </div>
        <div className={classes.subBox}>
          <span>
            <a href={urlSection} className={classes.section}>
              {nameSection}
            </a>
          </span>
        </div>
        <a href={urlTitle} className={classes.imageBox}>
          <img className={classes.image} src={multimediaImg} alt="foto" />
          {multimediaType !== 'basic' && (
            <span className={classes.icon}>{getIcon(multimediaType)}</span>
          )}
        </a>
        {tags && (
          <div className={classes.tags}>
            <p className={classes.related}>Tag Relacionados:</p>
            <ul className={classes.list}>
              {tags.map(el => {
                return (
                  <li key={el.slug} className={classes.item}>
                    <a className={classes.link} href={`/tag/${el.slug}`}>
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

export default TVHighlightChild
