import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'

import { defaultImage } from '../../../utilities/helpers'
import getLatinDate from '../../../utilities/date-name'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'

const classes = {
  tabloid: 'tabloid row-1 flex flex-col',
  header: 'tabloid__header flex items-center justify-center bg-gray-200',
  headerLink:
    'tabloid__header-link text-white uppercase font-bold text-xl primary-font',
  body:
    'tabloid__body flex flex-col items-center justify-center h-full position-relative pt-30 pb-10 pr-30 pl-30 bg-base-200',
  date:
    'tabloid__date flex items-center justify-center text-sm text-gray-300 font-bold p-20 bg-base-200',
  face: 'tabloid__face object-cover',
}

const CONTENT_SOURCE = 'story-by-section-printed'

// TODO: Modificar para usar Hooks.
// TODO: Aplicar resizer a la imagen cuando viene por URL personalizada.

@Consumer
class CardTabloid extends PureComponent {
  constructor(props) {
    super(props)

    const {
      arcSite,
      customFields: { feedOffset = 0, urlImage = '' } = {},
    } = this.props

    if (!urlImage) {
      this.fetchContent({
        data: {
          source: CONTENT_SOURCE,
          query: {
            website: arcSite,
            feedOffset,
          },
          filter: schemaFilter(arcSite),
        },
      })
    }
  }

  render() {
    const {
      deployment,
      contextPath,
      arcSite,
      editableField,
      isAdmin,
      siteProperties: { linkTabloide = '' },
      customFields: {
        date: dateField,
        sectionName = '',
        urlImage = '',
        link = '',
      } = {},
    } = this.props

    const { data = {} } = this.state || {}

    const {
      title = '',
      createdDate = '',
      primarySectionLink = '',
    } = new StoryData({
      data,
      contextPath,
      arcSite,
    })

    const {
      section_name: sourceSectionName = '',
      promo_items: {
        basic: {
          resized_urls: {
            lazy_default: lazyImage = '',
            printed_md: printedImage = defaultImage({
              deployment,
              contextPath,
              arcSite,
              size: 'sm',
            }),
          } = {},
        } = {},
      } = {},
    } = data

    const tabloidImage = urlImage || printedImage
    const nameDate = getLatinDate(createdDate, ' del', true)
    return (
      <div className={classes.tabloid}>
        <h4 className={classes.header}>
          <a
            className={classes.headerLink}
            href={link || primarySectionLink || '/impresa/'}
            {...editableField('sectionName')}
            suppressContentEditableWarning>
            {sectionName || sourceSectionName}
          </a>
        </h4>
        <a
          className={classes.body}
          href={link || linkTabloide}
          target="_blank"
          rel="noopener noreferrer">
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
}

CardTabloid.label = 'Tabloide'
CardTabloid.static = true

CardTabloid.propTypes = {
  customFields,
}

export default CardTabloid
