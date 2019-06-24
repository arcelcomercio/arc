import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import StoryData from '../utilities/story-data'
import { getMultimediaIcon } from '../utilities/helpers'

const LIVE_TEXT = 'En vivo'

const classes = {
  featuredStory: `featured-story position-relative pt-10 pb-10 pr-20 pl-20 flex md:flex-col md:p-0`,
  detail: `featured-story__detail flex flex-col justify-between position relative md:p-20`,
  image:
    'featured-story__image position-relative overflow-hidden w-full h-full ml-10 md:ml-0',
  iconBox: `featured-story__box-icon position-absolute rounded`,
  icon: `featured-story__icon flex items-center justify-center w-full h-full text-gray-100`,

  category: 'featured-story__category pb-15 hidden md:inline-block',
  categoryLink: 'featured-story__category-link text-md capitalize',

  title: 'featured-story__title overflow-hidden mb-10 line-h-xs',
  titleLink: 'featured-story__title-link title-xs line-h-sm',

  author: 'featured-story__author uppercase',
  authorLink: 'featured-story__author-link text-gray-200 text-xs',

  oneline: 'featured-story-oneline ',
  twoline: 'featured-story-twoline',
  threeline: 'featured-story-threeline',

  imageLink: 'featured-story__img-link block h-full',
  img: 'featured-story__img w-full h-full object-cover',

  imgComplete: 'img-complete justify-end',
  parcialTop: 'featured-story--reverse',

  twoCol: 'col-2',
  // Headbands
  headband: 'featured-story__headband mb-5 text-lg',
  headbandLink: 'featured-story__headband-link font-bold text-white',

  live: 'featured-story--live',
}

export default class FeaturedStory extends PureComponent {
  render() {
    const {
      category, // Se espera un objeto {name: '', url: ''}
      title, // Se espera un objeto {name: '', url: ''}
      author, // Se espera un objeto {name: '', url: ''}
      image, // Url de la imágen
      imageSize, // Se espera "parcialBot", "parcialTop" o "complete"
      headband, // OPCIONAL, otros valores: "live"
      size, // Se espera "oneCol" o "twoCol"
      hightlightOnMobile,
      editableField, // OPCIONAL, o pasar la función editableField de los props
      titleField, // OPCIONAL, o pasar el customField de los props
      categoryField, // OPCIONAL, o pasar el customField de los props
      multimediaType,
      arcSite,
    } = this.props

    const multimediaIcon = getMultimediaIcon(multimediaType)

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

    const getEditableField = element => {
      if (editableField) {
        return editableField(element)
      }
      return null
    }
    // TODO: !IMPORTE, esto debería detectar el navegador para agregarle los 3 puntos, NO la marca
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
        } ${hightlightOnMobile ? 'expand' : ''}`}>
        <div className={classes.detail}>
          {headband === 'normal' || !headband ? (
            <h3 className={classes.category}>
              <a
                className={classes.categoryLink}
                href={category.url}
                {...getEditableField('categoryField')}
                suppressContentEditableWarning>
                {categoryField || category.name}
              </a>
            </h3>
          ) : (
            <div className={classes.headband}>
              <a href={category.url} className={classes.headbandLink}>
                {headband === 'live' ? LIVE_TEXT : ''}
              </a>
            </div>
          )}
          <h2 className={classes.title}>
            <a
              className={`${classes.titleLink} ${numline}`}
              href={title.url}
              {...getEditableField('titleField')}
              suppressContentEditableWarning>
              {titleField || title.name}
            </a>
          </h2>

          <address className={classes.author}>
            <a className={classes.authorLink} href={author.url}>
              {author.name}
            </a>
          </address>
        </div>
        <figure className={classes.image}>
          <a className={classes.imageLink} href={title.url}>
            <img src={image} className={classes.img} alt="" />
            {multimediaIcon && (
              <span className={classes.iconBox}>
                <i className={`${multimediaIcon} ${classes.icon}`} />
              </span>
            )}
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
  hightlightOnMobile: PropTypes.bool,
  editableField: PropTypes.func,
  titleField: PropTypes.string,
  categoryField: PropTypes.string,
  multimediaType: PropTypes.oneOf([
    StoryData.IMAGE,
    StoryData.VIDEO,
    StoryData.GALLERY,
    StoryData.HTML,
  ]),
}
