import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import StoryData from '../utilities/story-data'
import { formatAMPM } from '../utilities/helpers'
import Icon from './multimedia-icon'
import Notify from './notify'

const SIZE_ONE_COL = 'oneCol'
const SIZE_TWO_COL = 'twoCol'
// const IMAGE_BOT = 'partialBot'
const IMAGE_TOP = 'parcialTop'
const IMAGE_COMPLETE = 'complete'

const classes = {
  featuredStory: `featured-story position-relative pt-10 pb-10 pr-20 pl-20 flex md:flex-col md:p-0`,
  detail: `featured-story__detail flex flex-col justify-between position relative md:p-20`,

  category:
    'featured-story__category pb-15 hidden md:inline-block position-relative',
  categoryLink: 'featured-story__category-link text-md',

  title: 'featured-story__title overflow-hidden mb-10 line-h-xs',
  titleLink: 'featured-story__title-link title-xs line-h-sm ',

  author: 'featured-story__author uppercase',
  authorLink: 'featured-story__author-link text-gray-200 text-xs',

  imageLink: 'featured-story__img-link block h-full ml-10 md:ml-0',
  imageBox: `featured-story__img-box block position-relative overflow-hidden w-full h-full`,
  image: 'featured-story__img w-full h-full object-cover',

  imgComplete: 'img-complete justify-end',
  parcialTop: 'featured-story--reverse',

  [SIZE_TWO_COL]: 'col-2',
  // Headbands
  headband: 'featured-story__headband mb-5 text-lg',
  headbandLink: 'featured-story__headband-link font-bold text-white uppercase',

  live: 'featured-story--live',
  livetv: 'featured-story--livetv',

  icon: `featured-story__icon`,
}

export default class FeaturedStory extends PureComponent {
  render() {
    const {
      category, // Se espera un objeto {name: '', url: ''}
      title, // Se espera un objeto {name: '', url: ''}
      author, // Se espera un objeto {name: '', url: ''}
      multimediaLandscapeL,
      multimediaLandscapeMD,
      multimediaPortraitMD,
      multimediaSquareS, // Url de la imágen
      multimediaLazyDefault,
      imageSize, // Se espera "parcialBot", "parcialTop" o "complete"
      headband, // OPCIONAL, otros valores: "live"
      size, // Se espera "oneCol" o "twoCol"
      hightlightOnMobile,
      editableField, // OPCIONAL, o pasar la función editableField de los props
      titleField, // OPCIONAL, o pasar el customField de los props
      categoryField, // OPCIONAL, o pasar el customField de los props
      multimediaType,
      isAdmin,
      siteName,
      errorList = [],
    } = this.props

    const noExpandedClass = !hightlightOnMobile
      ? 'featured-story--no-expanded'
      : ''

    const getImageSizeClass = () => {
      switch (imageSize) {
        case IMAGE_COMPLETE:
          return classes.imgComplete
        case IMAGE_TOP:
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
      if (headband === 'tv') {
        return `${classes.live} ${classes.livetv}`
      }
      return ''
    }

    const getEditableField = element =>
      editableField ? editableField(element) : null

    let headbandText = ''
    if (headband === 'live') headbandText = 'En vivo'
    else if (headband === 'tv') headbandText = `${siteName} TV`

    const getMobileImage = () => {
      if (hightlightOnMobile) {
        if (imageSize === IMAGE_COMPLETE) {
          if (size === SIZE_ONE_COL) return multimediaPortraitMD
          if (size === SIZE_TWO_COL) return multimediaLandscapeL
        }
        return multimediaLandscapeMD
      }
      return multimediaSquareS
    }

    const getDesktopImage = () => {
      if (size === SIZE_ONE_COL) {
        if (imageSize === IMAGE_COMPLETE) return multimediaPortraitMD
        return multimediaLandscapeMD
      }
      return multimediaLandscapeL
    }

    const getCategorySectionClass = () => {
      const { url } = category
      if (url[0] === '/' && url[url.length - 1] === '/') return url.slice(1, -1)
      return url
    }

    const formaZeroDate = (numb = 0) => {
      return numb < 10 ? `0${numb}` : numb
    }

    const formateDate = (fecha = '') => {
      return () => {
        const date = fecha.toString()
        const _date = new Date(date.slice(0, date.indexOf('GMT') - 1))
        const day = formaZeroDate(_date.getDate())
        const month = formaZeroDate(_date.getMonth() + 1)
        const year = _date.getFullYear()

        return `${day}/${month}/${year} - ${formatAMPM(date)}`
      }
    }

    let fechaProgramada = ''
    let fechaPublicacion = ''
    const renderMessage = () => {
      return errorList.map(el => {
        fechaProgramada = formateDate(new Date(el.programate_date))
        fechaPublicacion = formateDate(el.publish_date)
        return `Nota Programada: Error en ${
          el.note
        }. La fecha Programada (${fechaProgramada()}) es menor a la fecha de publicación de la nota (${fechaPublicacion()})`
      })
    }

    return (
      <article
        className={`${
          classes.featuredStory
        } ${getImageSizeClass()} ${getHeadBandClass()} ${
          size === SIZE_TWO_COL ? classes.twoCol : ''
        } ${hightlightOnMobile ? 'expand' : ''} ${noExpandedClass}`}>
        <div className={classes.detail}>
          {headband === 'normal' || !headband ? (
            <h3 className={`${classes.category} ${getCategorySectionClass()}`}>
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
              className={classes.titleLink}
              href={title.url}
              title={titleField || title.name}
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
          <picture className={classes.imageBox}>
            <source
              className={isAdmin ? '' : 'lazy'}
              media="(max-width: 639px)"
              type="image/jpeg"
              srcSet={isAdmin ? getMobileImage() : multimediaLazyDefault}
              data-srcset={getMobileImage()}
            />
            <img
              src={isAdmin ? getDesktopImage() : multimediaLazyDefault}
              data-src={getDesktopImage()}
              className={`${isAdmin ? '' : 'lazy'} ${classes.image}`}
              alt=""
            />
            <Icon type={multimediaType} iconClass={classes.icon} />
          </picture>
        </a>
        {isAdmin && errorList.length > 0 && (
          <Notify message={renderMessage()} />
        )}
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
  multimediaLandscapeL: PropTypes.string,
  multimediaLandscapeMD: PropTypes.string,
  multimediaPortraitMD: PropTypes.string,
  multimediaSquareS: PropTypes.string,
  multimediaLazyDefault: PropTypes.string,
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
  isAdmin: PropTypes.bool,
}
