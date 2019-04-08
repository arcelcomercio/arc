import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DataStory from './utils/data-story'

const classes = {
  destaque: 'destaque padding-normal flex flex--column row-1',
  gradient: 'destaque__gradient full-width block',
  detail: 'destaque__detail flex flex--column flex--justify-between',
  image: 'destaque__image',
  multimediaIconContainer: 'destaque__multimedia-icon',
  multimediaIconSpan: 'destaque__multimedia-icon-span',

  category: 'destaque__category',
  title: 'destaque__title',
  author: 'destaque__author',

  link: 'destaque__link',
  imageLink: 'block destaque__img-link',

  imgComplete: 'destaque--img-complete',
  parcialTop: 'flex--column-reverse',

  twoCol: 'col-2',
  // Headbands
  headband: 'destaque__headband',
  headbandLink: 'destaque__headband-link',

  live: 'destaque--live',

  playIcon: 'destaque__play-icon',
  galleryIcon: 'destaque__gallery-icon',
}

export default class Destaque extends Component {
  render() {
    const {
      category, // Se espera un objeto {name: '', url: ''}
      title, // Se espera un objeto {name: '', url: ''}
      author, // Se espera un objeto {name: '', url: ''}
      image, // Url de la imágen
      imageSize, // Se espera "parcialBot", "parcialTop" o "complete"
      headband, // OPCIONAL, otros valores: "live"
      size, // Se espera "oneCol" o "twoCol"
      editableField, // OPCIONAL, o pasar la función editableField de los props
      titleField, // OPCIONAL, o pasar el customField de los props
      categoryField, // OPCIONAL, o pasar el customField de los props
      multimediaType,
    } = this.props

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

    const getEditableField = element => {
      if (editableField) {
        return editableField(element)
      }
      return null
    }

    const getMultimediaIcon = () => {
      let icon
      switch (multimediaType) {
        case DataStory.VIDEO:
          icon = classes.playIcon
          break
        case DataStory.GALLERY:
          icon = classes.galleryIcon
          break
        default:
          return ''
      }
      return (
        <span className={classes.multimediaIconContainer}>
          <i className={`${classes.multimediaIconSpan} ${icon}`} />
        </span>
      )
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
                {...getEditableField('categoryField')}
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
              {...getEditableField('titleField')}
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
            {getMultimediaIcon()}
          </a>
        </figure>
      </article>
    )
  }
}

Destaque.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
  title: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
  author: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
  image: PropTypes.string,
  imageSize: PropTypes.oneOf(['parcialBot', 'parcialTop', 'complete']),
  headband: PropTypes.oneOf(['normal', 'live']),
  size: PropTypes.oneOf(['oneCol', 'twoCol']),
  editableField: PropTypes.func,
  titleField: PropTypes.string,
  categoryField: PropTypes.string,
  multimediaType: PropTypes.oneOf([
    DataStory.IMAGE,
    DataStory.VIDEO,
    DataStory.GALLERY,
    DataStory.HTML,
  ]),
}
