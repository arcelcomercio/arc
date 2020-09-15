import React from 'react'
import { useContent, useEditableContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'

import getLatinDate from '../../../utilities/date-time/latin-date'
import {
  SITE_TROME,
  SITE_ELCOMERCIOMAG,
  SITE_PERU21,
  SITE_PERU21G21,
  SITE_ELCOMERCIO,
} from '../../../utilities/constants/sitenames'

import Image from '../../../global-components/image'

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

  const { arcSite } = useAppContext()
  const { editableField } = useEditableContent()
  const { linkTabloide = '' } = getProperties(arcSite)

  const data =
    useContent(
      !urlImage
        ? {
            source: 'story-by-section-printed',
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
    section_name: sourceSectionName = '',
  } = data || {}

  /**
   * Estos sizes salen de la clase .tabloid__face
   * del core del feature y por marca
   */
  let sizes
  switch (arcSite) {
    case SITE_ELCOMERCIO:
      sizes = { width: 175, height: 0 }
      break
    case SITE_TROME:
      sizes = { width: 293, height: 0 }
      break
    case SITE_ELCOMERCIOMAG:
    case SITE_PERU21:
    case SITE_PERU21G21:
      sizes = { width: 215, height: 0 }
      break
    default:
      sizes = { width: 255, height: 0 }
  }

  const tabloidImage = urlImage || sourceImage
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
        <Image
          src={tabloidImage}
          width={sizes.width}
          height={sizes.height}
          alt={title}
          className={classes.face}
          loading="lazy"
        />
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
