import React from 'react'
import Icon from '../../../../global-components/multimedia-icon'
import Notify from '../../../../global-components/notify'
import { formatAMPM } from '../../../../utilities/helpers'

const classes = {
  featuredPremium: 'featured-premium',
  left: 'featured-premium__left',
  section: 'featured-premium__section',
  title: 'featured-premium__title',
  detail: 'featured-premium__detail',
  read: 'featured-premium__read',
  description: 'featured-premium__description',
  author: 'featured-premium__author',
  boxIcon: 'featured-premium__box-icon',
  sectionSmall: 'featured-premium__section-small',
  iconImagePremium: 'featured-premium__icon-image',
  right: 'featured-premium__right',
  icon: 'featured-premium__icon',
  image: 'featured-premium__image',
}

const getModel = model => {
  const type = {
    basic: ' featured-premium--card ',
    twoCol: ' col-2 ',
    full: ' col-2 row-2 ',
  }
  return type[model] || type.basic
}

const FeaturedStoryPremiumChild = ({
  isPremium,
  model,
  bgColor,
  websiteLink,
  multimediaSquareMD,
  multimediaLandscapeMD,
  multimediaLandscapeL,
  multimediaLazyDefault,
  title,
  author,
  authorLink,
  subTitle,
  multimediaType,
  primarySectionLink,
  primarySection,
  isAdmin,
  logo,
  errorList = [],
  multimediaSubtitle,
  multimediaCaption,
}) => {
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
    <div
      className={classes.featuredPremium
        .concat(getModel(model))
        .concat(` featured-premium--${bgColor}`)}>
      <div className={classes.left}>
        <h3 className={classes.section}>
          <a href={primarySectionLink}>{primarySection}</a>
        </h3>
        <h2>
          <a className={classes.title} href={websiteLink}>
            {title}
          </a>
        </h2>
        <p className={classes.detail}>
          {subTitle}{' '}
          <a className={classes.read} href={websiteLink}>
            Leer
          </a>
        </p>
        <div className={classes.description}>
          <h6>
            <a className={classes.author} href={authorLink}>
              {author}
            </a>
          </h6>
          <div className={classes.boxIcon}>
            <p>
              <a className={classes.sectionSmall} href={primarySectionLink}>
                {primarySection || 'Sección'}
              </a>
            </p>
            {isPremium && (
              <img
                className={classes.iconImagePremium}
                src={logo}                
                alt="premium"
              />
            )}
          </div>
        </div>
      </div>
      <div className={classes.right}>
        <Icon type={multimediaType} iconClass={classes.icon} />
        <a href={websiteLink}>
          <picture>
            <source
              className={isAdmin ? '' : 'lazy'}
              srcSet={isAdmin ? multimediaLandscapeMD : multimediaLazyDefault}
              data-srcset={multimediaLandscapeMD}
              media="(max-width: 480px)" // 367px
            />
            <source
              className={isAdmin ? '' : 'lazy'}
              srcSet={isAdmin ? multimediaSquareMD : multimediaLazyDefault}
              data-srcset={multimediaSquareMD}
              media="(max-width: 620px)"
            />
            <img
              className={`${isAdmin ? '' : 'lazy'} ${classes.image}`}
              src={isAdmin ? multimediaLandscapeL : multimediaLazyDefault}
              data-src={multimediaLandscapeL}
              alt={multimediaSubtitle || title}              
            />
          </picture>
        </a>
      </div>
      {isAdmin && errorList.length > 0 && <Notify message={renderMessage()} />}
    </div>
  )
}

export default FeaturedStoryPremiumChild
