import React from 'react'
import { useEditableContent } from 'fusion:content'
import Icon from '../../../../global-components/multimedia-icon'
import Notify from '../../../../global-components/notify'
import { formatAMPM } from '../../../../utilities/helpers'

const FeaturedStoryPremiumChild = ({
  // arcSite,
  isPremium,
  model,
  imgType,
  bgColor,
  websiteLink,
  // multimediaSquareMD,
  multimediaSquareXL,
  multimediaLandscapeMD,
  multimediaLandscapeL,
  multimediaPortraitMD,
  multimediaLazyDefault,
  title,
  author,
  authorLink,
  // subTitle,
  multimediaType,
  primarySectionLink,
  primarySection,
  isAdmin,
  // logo,
  errorList = [],
  multimediaSubtitle,
  titleField, // OPCIONAL, o pasar el customField de los props
  categoryField, // OPCIONAL, o pasar el customField de los props
}) => {
  const classes = {
    featuredPremium: `f-premium featured-story position-relative flex expand`,
    detail: `flex flex-col flex-1`,

    section: 'featured-story__category mt-10 mb-10',
    sectionLink: 'featured-story__category-link text-md',

    title: 'featured-story__title overflow-hidden mb-5 line-h-xs flex-1',
    titleLink: 'featured-story__title-link title-xs line-h-sm overflow-hidden',

    author: 'featured-story__author uppercase mb-10',
    authorLink: 'featured-story__author-link text-gray-200 text-xs',

    imageLink: 'featured-story__img-link block h-full ml-10 md:ml-0',
    imageBox: `featured-story__img-box block position-relative overflow-hidden w-full h-full`,
    image: 'featured-story__img w-full h-full object-cover',
    icon: 'featured-premium__icon',

    premiumWrapper:
      'premium__wrapper bg-primary flex justify-center items-center',
    premiumText:
      'premium__text flex justify-center items-center text-black font-bold icon-padlock',
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

  const { editableField } = useEditableContent()

  const getEditableField = element =>
    editableField ? editableField(element) : null

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

  if (model === 'basic' && imgType) {
    classes.featuredPremium =
      'f-premium featured-story position-relative flex expand img-complete'
    classes.detail = 'featured-story__detail'
    classes.title =
      'featured-story__title overflow-hidden mb-10 line-h-xs flex-1'
  }
  if (model === 'twoCol') {
    classes.featuredPremium =
      'f-premium featured-story position-relative flex expand img-complete col-2'
    classes.detail = 'featured-story__detail'
    classes.title =
      'featured-story__title overflow-hidden mb-10 line-h-xs flex-1'
  }
  if (model === 'full') {
    classes.featuredPremium =
      'f-premium featured-story position-relative flex expand img-complete col-2 row-2'
    classes.detail = 'featured-story__detail'
  }

  const getMobileImage = () => {
    const imgBasic = imgType ? multimediaPortraitMD : multimediaLandscapeMD
    return model === 'basic' ? imgBasic : multimediaPortraitMD
  }

  const getDesktopImage = () => {
    let imageDesktop
    if (model === 'basic')
      imageDesktop = imgType ? multimediaPortraitMD : multimediaLandscapeMD
    else if (model === 'twoCol') imageDesktop = multimediaLandscapeL
    else if (model === 'full') imageDesktop = multimediaSquareXL
    else imageDesktop = multimediaLandscapeL
    return imageDesktop
  }

  return (
    <article
      className={`${classes.featuredPremium}${
        bgColor === 'gray' ? ' featured-premium--gray' : ''
      }`}>
      <a itemProp="url" href={websiteLink} className={classes.imageLink}>
        <Icon type={multimediaType} iconClass={classes.icon} />
        <picture className={classes.imageBox}>
          <source
            className={isAdmin ? '' : 'lazy'}
            srcSet={isAdmin ? getMobileImage() : multimediaLazyDefault}
            data-srcset={getMobileImage()}
            media="(max-width: 480px)" // 367px
          />
          <img
            className={`${isAdmin ? '' : 'lazy'} ${classes.image}`}
            src={isAdmin ? getDesktopImage() : multimediaLazyDefault}
            data-src={getDesktopImage()}
            alt={multimediaSubtitle || title}
          />
        </picture>
      </a>

      <div className={classes.detail}>
        <h3 itemProp="name" className={classes.section}>
          <a
            itemProp="url"
            className={classes.sectionLink}
            href={primarySectionLink}
            {...getEditableField('categoryField')}
            suppressContentEditableWarning>
            {categoryField || primarySection}
          </a>
        </h3>
        <h2 itemProp="name" className={classes.title}>
          <a
            itemProp="url"
            className={classes.titleLink}
            href={websiteLink}
            {...getEditableField('titleField')}
            suppressContentEditableWarning>
            {titleField || title}
          </a>
        </h2>
        <h6 itemProp="name" className={classes.author}>
          {author && (
            <a itemProp="url" className={classes.authorLink} href={authorLink}>
              {author}
            </a>
          )}
        </h6>
        {isPremium && (
          <div className={classes.premiumWrapper}>
            <p itemProp="description" className={classes.premiumText}>
              Suscriptor Digital
            </p>
          </div>
        )}
      </div>

      {isAdmin && errorList.length > 0 && <Notify message={renderMessage()} />}
    </article>
  )
}

export default FeaturedStoryPremiumChild
