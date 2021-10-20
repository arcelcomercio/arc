import { useEditableContent } from 'fusion:content'
import * as React from 'react'

import Image from '../../../../global-components/image'
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

const getModel = (model) => {
  const type = {
    basic: ' featured-premium--card ',
    twoCol: ' col-2 ',
    full: ' col-2 row-2 ',
  }
  return type[model] || type.basic
}

const FeaturedStoryPremiumChild = ({
  websiteLink,
  title,
  subTitle,
  author,
  authorLink,
  primarySectionLink,
  primarySection,
  multimedia,
  multimediaType,
  multimediaSubtitle,
  imgType,
  isPremium,
  model,
  lastMinute,
  bgColor,
  logo,
  titleField,
  categoryField,
  arcSite,
}) => {
  const { editableField } = useEditableContent()

  const getEditableField = (element) =>
    editableField ? editableField(element) : null

  // width y height para imagen dinámico en mobile
  const imageMobileWidth = 314
  let imageMobileHeight = 374
  if (model === 'basic' && !imgType) {
    imageMobileHeight = 157
  }

  // if (model === 'twoCol') 648x374
  // width y height para imagen dinámico
  let imageWidth = 648
  let imageHeight = 374
  if (model === 'basic') {
    imageWidth = 314
    imageHeight = imgType ? 374 : 157
  } else if (model === 'full') {
    imageWidth = 900
    imageHeight = 900
  }

  const isComercio = arcSite === SITE_ELCOMERCIO
  const isGestion = arcSite === SITE_GESTION

  return (
    <article
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
            {isPremium && isGestion ? (
              <img
                className={classes.iconImagePremium}
                src={logo}
                alt="premium"
              />
            ) : null}
          </div>

          {isPremium && !isGestion && (
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
          <Image
            src={multimedia}
            width={imageWidth}
            height={imageHeight}
            sizes={`(max-width: 480px) ${imageMobileWidth}px, ${imageWidth}px`}
            sizesHeight={[imageMobileHeight]}
            alt={multimediaSubtitle || title}
            className={classes.image}
            loading="lazy"
          />
        </a>
      </div>
    </article>
  )
}

export default React.memo(FeaturedStoryPremiumChild)
