import * as React from 'react'
import { useEditableContent } from 'fusion:content'
import Icon from '../../../../global-components/multimedia-icon'
import {
  SITE_ELCOMERCIO,
  SITE_GESTION,
} from '../../../../utilities/constants/sitenames'

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
  premiumWrapper:
    'premium__wrapper bg-primary flex justify-center items-center',
  premiumText:
    'premium__text flex justify-center items-center text-black font-bold icon-padlock',
  lastMinute: 'featured-premium--last-minute',
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
  arcSite,
  isPremium,
  model,
  imgType,
  lastMinute = false,
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
  subTitle,
  multimediaType,
  primarySectionLink,
  primarySection,
  isAdmin,
  logo,
  multimediaSubtitle,
  titleField, // OPCIONAL, o pasar el customField de los props
  categoryField, // OPCIONAL, o pasar el customField de los props
}) => {
  const { editableField } = useEditableContent()

  const getEditableField = element =>
    editableField ? editableField(element) : null

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

  const isComercio = arcSite === SITE_ELCOMERCIO
  const isGestion = arcSite === SITE_GESTION

  return (
    <div
      className={classes.featuredPremium
        .concat(getModel(model))
        .concat(` featured-premium--${bgColor}`)
        .concat(imgType && isComercio ? ' complete ' : '')
        .concat(
          lastMinute && isGestion && model === 'twoCol'
            ? ` ${classes.lastMinute}`
            : ''
        )}>
      <div className={classes.left}>
        <h3 itemProp="name" className={classes.section}>
          {isGestion && lastMinute && model === 'twoCol' && (
            <span>Último minuto</span>
          )}
          {((isGestion && lastMinute && model !== 'twoCol') ||
            (isGestion && !lastMinute) ||
            !isGestion) && (
            <a
              itemProp="url"
              href={primarySectionLink}
              {...getEditableField('categoryField')}
              suppressContentEditableWarning>
              {categoryField || primarySection}
            </a>
          )}
        </h3>
        <h2 itemProp="name">
          <a
            itemProp="url"
            className={classes.title}
            href={websiteLink}
            {...getEditableField('titleField')}
            suppressContentEditableWarning>
            {titleField || title}
          </a>
        </h2>
        <p itemProp="description" className={classes.detail}>
          {subTitle}{' '}
          <a itemProp="url" className={classes.read} href={websiteLink}>
            Leer
          </a>
        </p>
        <div className={classes.description}>
          <h6 itemProp="name">
            <a
              itemProp="url"
              className={classes.author}
              href={authorLink || '/autores/'}>
              {author}
            </a>
          </h6>
          <div className={classes.boxIcon}>
            <p itemProp="description">
              <a
                itemProp="url"
                className={classes.sectionSmall}
                href={primarySectionLink}
                {...getEditableField('categoryField')}
                suppressContentEditableWarning>
                {categoryField || primarySection || 'Sección'}
              </a>
            </p>
            {isPremium && !isComercio && (
              <img
                className={classes.iconImagePremium}
                src={logo}
                alt="premium"
              />
            )}
          </div>
          {isPremium && isComercio && (
            <div className={classes.premiumWrapper}>
              <p itemProp="description" className={classes.premiumText}>
                Suscriptor Digital
              </p>
            </div>
          )}
        </div>
      </div>
      <div className={classes.right}>
        <Icon type={multimediaType} iconClass={classes.icon} />
        <a itemProp="url" href={websiteLink}>
          <picture>
            <source
              className={isAdmin ? '' : 'lazy'}
              srcSet={isAdmin ? getMobileImage() : multimediaLazyDefault}
              data-srcset={getMobileImage()}
              media="(max-width: 480px)" // 367px
            />
            <source
              className={isAdmin ? '' : 'lazy'}
              srcSet={isAdmin ? getDesktopImage() : multimediaLazyDefault}
              data-srcset={getDesktopImage()}
              media="(max-width: 620px)"
            />
            <img
              className={`${isAdmin ? '' : 'lazy'} ${classes.image}`}
              src={isAdmin ? getDesktopImage() : multimediaLazyDefault}
              data-src={getDesktopImage()}
              alt={multimediaSubtitle || title}
            />
          </picture>
        </a>
      </div>
    </div>
  )
}

export default React.memo(FeaturedStoryPremiumChild)
