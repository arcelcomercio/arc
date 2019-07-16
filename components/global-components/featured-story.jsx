import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import StoryData from '../utilities/story-data'
import Icon from './multimedia-icon'

const SIZE_ONE_COL = 'oneCol'
const SIZE_TWO_COL = 'twoCol'

const classes = {
  featuredStory: `featured-story position-relative pt-10 pb-10 pr-20 pl-20 flex md:flex-col md:p-0`,
  detail: `featured-story__detail flex flex-col justify-between position relative md:p-20`,

  category: 'featured-story__category pb-15 hidden md:inline-block',
  categoryLink: 'featured-story__category-link text-md capitalize',

  title: 'featured-story__title overflow-hidden mb-10 line-h-xs',
  titleLink: 'featured-story__title-link title-xs line-h-sm',

  author: 'featured-story__author uppercase',
  authorLink: 'featured-story__author-link text-gray-200 text-xs',

  oneline: 'featured-story-oneline ',
  twoline: 'featured-story-twoline',
  threeline: 'featured-story-threeline',

  imageLink: 'featured-story__img-link block h-full ml-10 md:ml-0',
  imageBox: `featured-story__img-box position-relative overflow-hidden w-full h-full`,
  image: 'featured-story__img w-full h-full object-cover',

  imgComplete: 'img-complete justify-end',
  parcialTop: 'featured-story--reverse',

  [SIZE_TWO_COL]: 'col-2',
  // Headbands
  headband: 'featured-story__headband mb-5 text-lg',
  headbandLink: 'featured-story__headband-link font-bold text-white uppercase',

  live: 'featured-story--live',
  icon: `featured-story__icon`,
  section: `featured-story__section w-full position-absolute top-0 left-0 bg-gray-200 flex items-center justify-center`,
  sectionText: `featured-story__section-text uppercase primary-font font-bold text-lg`,
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

    const noExpandedClass = !hightlightOnMobile
      ? 'featured-story--no-expanded'
      : ''

    const getImageSizeClass = () => {
      switch (imageSize) {
        case 'complete':
          return classes.imgComplete
        case 'parcialTop':
          return size !== SIZE_TWO_COL
            ? classes.parcialTop
            : classes.imgComplete
        default:
          return size !== SIZE_TWO_COL ? '' : classes.imgComplete
      }
    }

    // Metodo preparado para indicar otros tipos estilos en base a otros casos que se definan.
    const getHeadBandClass = () => {
      if (headband === 'live') {
        return classes.live
      }
      if (headband === 'gestionTv') {
        return classes.live
      }
      return ''
    }

    const getEditableField = element =>
      editableField ? editableField(element) : null

    // TODO: !IMPORTE, esto debería detectar el navegador para agregarle los 3 puntos, NO la marca
    let numline = ''
    switch (arcSite) {
      case 'elcomercio':
        numline = classes.threeline
        break
      case 'publimetro':
        numline = classes.threeline
        break
      case 'depor':
        numline = classes.twoline
        break
      default:
        numline = classes.threeline
        break
    }

    let headbandText = ''
    if (headband === 'live') headbandText = 'En vivo'
    else if (headband === 'gestionTv') headbandText = 'Gestión TV'

    return (
      <article
        className={`${
          classes.featuredStory
        } ${getImageSizeClass()} ${getHeadBandClass()} ${
          size === SIZE_TWO_COL ? classes.twoCol : ''
        } ${hightlightOnMobile ? 'expand' : ''} ${noExpandedClass}`}>
        <div className={classes.section}>
          <a className={classes.sectionLink} href={category.url}>
            <p className={classes.sectionText}>Gestion Tv</p>
          </a>
        </div>
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
                {headbandText}
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
        <a className={classes.imageLink} href={title.url}>
          <figure className={classes.imageBox}>
            <img src={image} className={classes.image} alt="" />
            <Icon type={multimediaType} iconClass={classes.icon} />
          </figure>
        </a>
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
  size: PropTypes.oneOf([SIZE_ONE_COL, SIZE_TWO_COL]),
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
