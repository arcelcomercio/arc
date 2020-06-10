import React from 'react'
import { useContent, useEditableContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'

import { defaultImage } from '../../../utilities/assets'
import getLatinDate from '../../../utilities/date-time/latin-date'
import { getResizedUrl } from '../../../utilities/resizer'
import {
  SITE_TROME,
  SITE_ELCOMERCIOMAG,
  SITE_PERU21,
  SITE_PERU21G21,
  SITE_ELCOMERCIO,
} from '../../../utilities/constants/sitenames'

const classes = {
  tabloid: 'tabloid row-1 flex flex-col',
  header: 'tabloid__header flex items-center justify-center bg-gray-200',
  headerLink:
    'tabloid__header-link text-white uppercase font-bold text-xl primary-font',
  body:
    'tabloid__body flex flex-col items-center justify-center h-full position-relative pt-30 pb-10 pr-30 pl-30 bg-base-200',
  date:
    'tabloid__date flex items-center justify-center text-sm text-gray-300 font-bold p-20 bg-base-200',
  face: 'tabloid__face',
}

const CONTENT_SOURCE = 'story-by-section-printed'
const PHOTO_SOURCE = 'photo-resizer'

const CardTabloid = props => {
  const {
    customFields: {
      date: dateField,
      sectionName = '',
      urlImage = '',
      link = '',
      feedOffset = 0,
    } = {},
  } = props

  const { deployment, contextPath, arcSite, isAdmin } = useFusionContext()
  const { editableField } = useEditableContent()
  const { linkTabloide = '' } = getProperties(arcSite)

  const data =
    useContent(
      !urlImage
        ? {
            source: CONTENT_SOURCE,
            query: {
              website: arcSite,
              feedOffset,
            },
            filter: schemaFilter(arcSite),
          }
        : {}
    ) || {}

  const {
    headlines: { basic: title = '' } = {},
    created_date: createdDate = '',
    taxonomy: { primary_section: { path: primarySectionLink = '' } = {} } = {},
    promo_items: { basic: { url: sourceImage = '' } = {} } = {},
  } = data || {}

  /**
   * Estos sizes salen de la clase .tabloid__face
   * del core del feature y por marca
   */
  let sizes
  switch (arcSite) {
    case SITE_ELCOMERCIO:
      sizes = '175x0'
      break
    case SITE_TROME:
      sizes = '293x0'
      break
    case SITE_ELCOMERCIOMAG:
    case SITE_PERU21:
    case SITE_PERU21G21:
      sizes = '215x0'
      break
    default:
      sizes = '255x0'
  }
  const presets = `printed_md:${sizes}`

  const { resized_urls: adminResizer = {} } =
    useContent(
      isAdmin
        ? {
            source: PHOTO_SOURCE,
            query: {
              url: urlImage || sourceImage,
              presets,
            },
          }
        : {}
    ) || {}

  /**
   * El admin de PB renderiza de nuevo en cliente y no funciona
   * el getResizedUrl() desde cliente, por eso en caso de
   * estar en el admin, se solicita la imagen de la
   * content source photo-resizer.
   */
  const { printed_md: resizedImage } = isAdmin
    ? adminResizer
    : getResizedUrl({
        url: urlImage || sourceImage,
        presets,
        arcSite,
      })

  const lazyImage = defaultImage({
    deployment,
    contextPath,
    arcSite,
    size: 'sm',
  })

  const {
    section_name: sourceSectionName = '',
    promo_items: {
      basic: {
        resized_urls: { printed_md: printedImage = lazyImage } = {},
      } = {},
    } = {},
  } = data

  const tabloidImage = resizedImage || urlImage || printedImage
  const nameDate = getLatinDate(createdDate, ' del', true)

  return (
    <div className={classes.tabloid}>
      <h4 itemProp="name" className={classes.header}>
        <a
          itemProp="url"
          className={classes.headerLink}
          href={link || primarySectionLink || '/impresa/'}
          {...editableField('sectionName')}
          suppressContentEditableWarning>
          {sectionName || sourceSectionName}
        </a>
      </h4>
      <a
        itemProp="url"
        className={classes.body}
        href={link || linkTabloide}
        target="_blank"
        rel="noopener noreferrer"
        title="Ver la versión impresa">
        <picture>
          <img
            className={`${isAdmin ? '' : 'lazy'} ${classes.face}`}
            src={isAdmin ? tabloidImage : lazyImage}
            data-src={tabloidImage}
            alt={title}
          />
        </picture>
        <time className={classes.date}>{dateField || nameDate}</time>
      </a>
    </div>
  )
}

CardTabloid.label = 'Tabloide'
CardTabloid.static = true

CardTabloid.propTypes = {
  customFields,
}

export default CardTabloid
