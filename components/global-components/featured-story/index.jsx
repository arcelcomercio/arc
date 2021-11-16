import { useEditableContent } from 'fusion:content'
import * as React from 'react'

import { SITE_TROME } from '../../utilities/constants/sitenames'
import Image from '../image'
import Icon from '../multimedia-icon'

const SIZE_ONE_COL = 'oneCol'
const SIZE_TWO_COL = 'twoCol'
// const IMAGE_BOT = 'partialBot'
const IMAGE_TOP = 'parcialTop'
const IMAGE_COMPLETE = 'complete'

const classes = {
  featuredStory: `featured-story position-relative pt-10 pb-10 pr-20 pl-20 flex md:flex-col md:p-0`,
  featuredStoryInvertedColor: `featured-story--inverted`,
  detail: `featured-story__detail flex flex-col position relative md:p-20`,
  detailInverted: `featured-story__detail__inverted`,

  category:
    'featured-story__category pb-15 hidden md:inline-block position-relative',
  categoryLink: 'featured-story__category-link text-md',
  titleHeader: 'featured-story__header',
  title: 'featured-story__title overflow-hidden mb-10 line-h-xs',
  titleInvertedColor: 'featured-story__title__inverted-color',
  titleLink: 'featured-story__title-link title-xs line-h-sm ',
  titleClamp: 'featured-story__title--clamp',

  author: 'featured-story__author uppercase',
  authorLink: 'featured-story__author-link text-gray-200 text-xs',

  imageLink: 'featured-story__img-link block h-full ml-10 md:ml-0',
  imageBox: `featured-story__img-box block position-relative overflow-hidden w-full h-full`,
  image: 'featured-story__img w-full h-full object-cover',

  imgComplete: 'img-complete justify-end',
  imgCompleteInvertedTitle: 'img-complete top-text',
  parcialTop: 'featured-story--reverse',

  [SIZE_TWO_COL]: 'col-2',
  // Headbands
  headband: 'featured-story__headband mb-5 text-lg',
  headbandLink: 'featured-story__headband-link font-bold text-white uppercase',

  live: 'featured-story--live',
  livetv: 'featured-story--livetv',

  icon: `featured-story__icon`,
}

const FeaturedStory = (props) => {
  const {
    primarySection,
    primarySectionLink,
    title,
    websiteLink,
    author,
    authorLink,
    multimediaType,
    multimediaCaption,
    multimedia,
    imageSize, // Se espera "parcialBot", "parcialTop" o "complete"
    headband, // OPCIONAL, otros valores: "live"
    size, // Se espera "oneCol" o "twoCol"
    hightlightOnMobile,
    titleField, // OPCIONAL, o pasar el customField de los props
    categoryField, // OPCIONAL, o pasar el customField de los props
    arcSite,
    siteName,
    isLazyLoadActivate = true,
    titleHeader = '',
    invertedTitle = false,
    invertedColor = false,
    hideAuthor = false,
  } = props
  const { editableField } = useEditableContent()

  const noExpandedClass = !hightlightOnMobile
    ? 'featured-story--no-expanded'
    : ''

  const getImageSizeClass = () => {
    switch (imageSize) {
      case IMAGE_COMPLETE:
        return classes.imgComplete
      case IMAGE_TOP:
        return size !== SIZE_TWO_COL ? classes.parcialTop : classes.imgComplete
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

  const getEditableField = (element) =>
    editableField ? editableField(element) : null

  let headbandText = ''
  if (headband === 'live') headbandText = 'En vivo'
  else if (headband === 'tv') headbandText = `${siteName} TV`

  // width y height para imagen dinámico
  let imageWidth = 648
  let imageHeight = 374
  if (size === SIZE_ONE_COL) {
    if (imageSize === IMAGE_COMPLETE) {
      imageWidth = 314
      imageHeight = 374
    } else {
      imageWidth = 314
      imageHeight = 157
    }
  }

  // width y height para imagen dinámico en mobile
  let imageMobileWidth = arcSite === SITE_TROME ? 314 : 150
  let imageMobileHeight = arcSite === SITE_TROME ? 157 : 150
  if (hightlightOnMobile) {
    if (imageSize === IMAGE_COMPLETE) {
      if (size === SIZE_ONE_COL) {
        imageMobileWidth = 314
        imageMobileHeight = 374
      } else if (size === SIZE_TWO_COL) {
        imageMobileWidth = 648
        imageMobileHeight = 347
      }
    } else {
      imageMobileWidth = 314
      imageMobileHeight = 157
    }
  }

  const getCategorySectionClass = () => {
    if (
      primarySectionLink[0] === '/' &&
      primarySectionLink[primarySectionLink.length - 1] === '/'
    )
      return primarySectionLink.slice(1, -1)
    return primarySectionLink
  }

  return (
    <article
      className={`${
        classes.featuredStory
      } ${getImageSizeClass()} ${getHeadBandClass()} ${
        size === SIZE_TWO_COL ? classes.twoCol : ''
      } ${hightlightOnMobile ? 'expand' : ''} ${noExpandedClass} ${
        invertedColor && classes.featuredStoryInvertedColor
      } ${invertedTitle && classes.imgCompleteInvertedTitle}`}>
      <div
        className={`${classes.detail} 
                      ${author ? ' justify-between' : ''}`}>
        {headband === 'normal' || !headband ? (
          <h3
            itemProp="name"
            className={`${classes.category} ${getCategorySectionClass()}`}>
            <a
              itemProp="url"
              className={classes.categoryLink}
              href={primarySectionLink}
              {...getEditableField('categoryField')}
              suppressContentEditableWarning>
              {categoryField || primarySection}
            </a>
          </h3>
        ) : (
          <div className={classes.headband}>
            <a
              itemProp="url"
              href={primarySectionLink}
              className={classes.headbandLink}>
              {headbandText}
            </a>
          </div>
        )}
        <h2
          itemProp="name"
          className={`${classes.title} ${
            titleHeader.length > 0 && classes.titleClamp
          }`}>
          <a
            itemProp="url"
            className={classes.titleLink}
            href={websiteLink}
            {...getEditableField('titleField')}
            suppressContentEditableWarning>
            {titleHeader.length > 0 && (
              <span className={classes.titleHeader}>{titleHeader}</span>
            )}
            {titleField || title}
          </a>
        </h2>

        {author
          ? !hideAuthor && (
              <address className={classes.author}>
                <a
                  itemProp="url"
                  className={classes.authorLink}
                  href={authorLink || '/autores/'}>
                  {author}
                </a>
              </address>
            )
          : null}
      </div>
      <a itemProp="url" className={classes.imageLink} href={websiteLink}>
        <Image
          src={multimedia}
          alt={multimediaCaption || titleField || title}
          height={imageHeight}
          width={imageWidth}
          sizes={`(max-width: 639px) ${imageMobileWidth}px, ${imageWidth}px`}
          sizesHeight={[imageMobileHeight]}
          className={classes.image}
          pictureClassName={classes.imageBox}
          loading={isLazyLoadActivate ? 'lazy' : 'auto'}>
          <Icon type={multimediaType} iconClass={classes.icon} />
        </Image>
      </a>
    </article>
  )
}

export default React.memo(FeaturedStory)
