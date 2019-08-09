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
  date: 'tabloid__date flex items-center justify-center p-20 bg-base-200',
  dateLink: 'tabloid__date-link text-sm text-gray-300 font-bold',
  face: 'tabloid__face object-cover',
}

const CONTENT_SOURCE = 'story-by-section-printed'

@Consumer
class CardTabloid extends PureComponent {
  constructor(props) {
    super(props)

    const { arcSite, customFields: { feedOffset = 0 } = {} } = this.props

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

  render() {
    const {
      deployment,
      contextPath,
      arcSite,
      editableField,
      isAdmin,
      siteProperties: { linkTabloide = '' },
      customFields: { sectionName = '' } = {},
    } = this.props
    const { data = {} } = this.state
    const { title = '', date = '', primarySectionLink = '' } = new StoryData({
      data,
      contextPath,
      arcSite,
    })
    const {
      section_name: sourceSectionName,
      promo_items: {
        basic: {
          resized_urls: {
            lazy_default: lazyImage,
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

    const nameDate = getLatinDate(date, ' del', true)
    return (
      <div className={classes.tabloid}>
        <h4 className={classes.header}>
          <a
            className={classes.headerLink}
            href={primarySectionLink}
            {...editableField('sectionName')}
            suppressContentEditableWarning>
            {sectionName || sourceSectionName}
          </a>
        </h4>
        <div className={classes.body}>
          <picture>
            <a href={linkTabloide} target="_blank" rel="noopener noreferrer">
              <img
                className={`${isAdmin ? '' : 'lazy'} ${classes.face}`}
                src={isAdmin ? printedImage : lazyImage}
                data-src={printedImage}
                alt={title}
              />
            </a>
          </picture>
          <time className={classes.date}>
            <a
              className={classes.dateLink}
              href={linkTabloide}
              target="_blank"
              rel="noopener noreferrer">
              {nameDate}
            </a>
          </time>
        </div>
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
