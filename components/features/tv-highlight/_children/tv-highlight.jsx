import React from 'react'
import { getMultimediaIcon } from '../../../utilities/helpers'

const classes = {
  tv: 'tv-highlight bg-gray-300 pt-20 pb-20 md:pt-40 md:pb-40 md:pr-0 md:pl-0',
  container: 'tv-highlight__container m-0 mx-auto',
  titleBox: 'mb-10',
  title: 'tv-highlight__title primary-font text-white title-lg',
  subBox: 'flex justify-between pt-15 pb-15 mb-10',
  section: `tv-highlight__section flex uppercase position-relative text-white text-sm`,
  imageBox: 'block position-relative',
  image: 'w-full h-full object-contain object-center',
  iconContainer: `tv-highlight__icon position-absolute flex justify-center items-center rounded text-gray-300`,
  icon: 'title-xl',
  tags: 'tv-highlight__tags mt-15',
  related: 'tv-highlight__related uppercase mb-5 font-bold text-sm',
  list: 'flex',
  item: 'tv-highlight__item mr-15',
  link: 'tv-highlight__link text-sm text-gray-200',
}

const TVHighlightChild = props => {
  const {
    title: { nameTitle, urlTitle },
    category: { nameSection, urlSection },
    multimedia: { multimediaImg, multimediaType },
    tags,
    // multimediaSubtitle,
    multimediaCaption,
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
          <img
            className={classes.image}
            src={multimediaImg}
            alt={multimediaCaption || nameTitle}
          />
          {multimediaType !== 'basic' && (
            <span className={classes.iconContainer}>
              <i
                className={`${getMultimediaIcon(multimediaType)} ${
                  classes.icon
                  }`}
              />
            </span>
          )}
        </a>
        {tags && (
          <div className={classes.tags}>
            <p className={classes.related}>Tags Relacionados:</p>
            <ul className={classes.list}>
              {tags.map(el => {
                return (
                  <li key={el.slug} className={classes.item}>
                    <a className={classes.link} href={`/noticias/${el.slug}/`}>
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
