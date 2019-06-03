import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StoryData from '../utilities/story-data'

const classes = {
  featuredStory: 'featured-story position-relative padding-normal flex',
  gradient: 'featured-story__gradient position-absolute full-width block',
  detail: 'featured-story__detail flex flex--column flex--justify-between',
  image: 'featured-story__image overflow-hidden full-width full-height',
  multimediaIconContainer: 'featured-story__multimedia-icon position-absolute',
  multimediaIconSpan:
    'featured-story__multimedia-icon-span flex-center full-width full-height',

  category: 'featured-story__category pd-bottom-15',
  title: 'featured-story__title overflow-hidden',
  oneline: 'featured-story-oneline ',
  twoline: 'featured-story-twoline',
  threeline: 'featured-story-threeline',
  author: 'featured-story__author text-uppercase',

  link: 'featured-story__link',
  imageLink: 'block position-relative full-height',
  img: 'full-width full-height object-fit-cover',

  imgComplete: 'featured-story--img-complete flex--justify-end overflow-hidden',
  parcialTop: 'flex--column-reverse',

  twoCol: 'col-2',
  // Headbands
  headband: 'featured-story__headband mg-bottom-5',
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
      // hightlightOnMobile,
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
        {/* Aqui colocar la logica del span */}
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
  // hightlightOnMobile: PropTypes.bool,
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
