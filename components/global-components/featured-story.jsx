import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StoryData from '../../resources/components/utils/data-story'

const classes = {
  featuredStory: 'featured-story padding-normal flex flex--column row-1',
  gradient: 'featured-story__gradient full-width block',
  detail: 'featured-story__detail flex flex--column flex--justify-between',
  image: 'featured-story__image',
  multimediaIconContainer: 'featured-story__multimedia-icon',
  multimediaIconSpan: 'featured-story__multimedia-icon-span',

  category: 'featured-story__category',
  title: 'featured-story__title',
  oneline: 'featured-story-oneline ',
  twoline: 'featured-story-twoline',
  threeline: 'featured-story-threeline',
  author: 'featured-story__author',

  link: 'featured-story__link',
  imageLink: 'block featured-story__img-link',
  img: 'full-width featured-story__img',

  imgComplete: 'featured-story--img-complete',
  parcialTop: 'flex--column-reverse',

  twoCol: 'col-2',
  // Headbands
  headband: 'featured-story__headband',
  headbandLink: 'featured-story__headband-link',

  live: 'featured-story--live',

  playIcon: 'featured-story__play-icon',
  galleryIcon: 'featured-story__gallery-icon',
}

export default class FeaturedStory extends Component {
  render() {
    const {
      category, // Se espera un objeto {name: '', url: ''}
      title, // Se espera un objeto {name: '', url: ''}
      author, // Se espera un objeto {name: '', url: ''}
      image, // Url de la imágen
      imageSize, // Se espera "parcialBot", "parcialTop" o "complete"
      headband, // OPCIONAL, otros valores: "live"
      size, // Se espera "oneCol" o "twoCol"
      // editableField, // OPCIONAL, o pasar la función editableField de los props
      titleField, // OPCIONAL, o pasar el customField de los props
      categoryField, // OPCIONAL, o pasar el customField de los props
      multimediaType,
      arcSite,
    } = this.props

    const getImageSizeClass = () => {
      switch (imageSize) {
        case 'complete':
          return classes.imgComplete
        case 'parcialTop':
          return size !== 'twoCol' ? classes.parcialTop : classes.imgComplete
        default:
          return size !== 'twoCol' ? '' : classes.imgComplete
      }
    }

    const getHeadBandClass = () => {
      if (headband === 'live') {
        return classes.live
      }
      return ''
    }

    /* const getEditableField = element => {
      if (editableField) {
        return editableField(element)
      }
      return null
    } */

    const getMultimediaIcon = () => {
      let icon
      switch (multimediaType) {
        case StoryData.VIDEO:
          icon = classes.playIcon
          break
        case StoryData.GALLERY:
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

    let numline = ''
    switch (arcSite) {
      case 'elcomercio':
        numline = classes.threeline
        break
      case 'depor':
        numline = classes.twoline
        break
      default:
        numline = classes.twoline
        break
    }
    return (
      <article
        className={`${
          classes.featuredStory
        } ${getImageSizeClass()} ${getHeadBandClass()} ${
          size === 'twoCol' ? classes.twoCol : ''
        }`}>
        {(imageSize === 'complete' || size === 'twoCol') && (
          <span className={classes.gradient} />
        )}
        <div className={classes.detail}>
          {headband === 'normal' || !headband ? (
            <h3 className={classes.category}>
              <a
                className={classes.link}
                href={category.url}
                /* {...getEditableField('categoryField')}
              suppressContentEditableWarning */
              >
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
          <h2 className={`${classes.title} ${numline}`}>
            <a
              className={classes.link}
              href={title.url}
              /* {...getEditableField('titleField')}
            suppressContentEditableWarning */
            >
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
            <img src={image} className={classes.img} alt="" />
            {getMultimediaIcon()}
          </a>
        </figure>
      </article>
    )
  }
}

FeaturedStory.propTypes = {
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
  imageSize: PropTypes.oneOf(['parcialTop', 'complete', 'parcialBot']),
  headband: PropTypes.oneOf(['normal', 'live']),
  size: PropTypes.oneOf(['oneCol', 'twoCol']),
  // editableField: PropTypes.func,
  titleField: PropTypes.string,
  categoryField: PropTypes.string,
  multimediaType: PropTypes.oneOf([
    StoryData.IMAGE,
    StoryData.VIDEO,
    StoryData.GALLERY,
    StoryData.HTML,
  ]),
}
