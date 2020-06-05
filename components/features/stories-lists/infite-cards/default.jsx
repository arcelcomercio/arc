import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'

import StoryData from '../../../utilities/story-data'
import schemaFilter from './_dependencies/schema-filter'
import {
  includePrimarySection,
  includePromoItems,
  includePromoItemsCaptions,
} from '../../../utilities/included-fields'

import Spinner from '../../../global-components/spinner'

@Consumer
class StoriesLiestInfiniteCards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      isLoading: false,
    }

    const {
      customFields: {
        storyConfig: { contentService = '', contentConfigValues = {} } = {},
      } = {},
      arcSite,
    } = this.props

    const presets = 'portrait_md:306x225'
    const includedFields = `websites.${arcSite}.website_url,headlines.basic,${includePromoItems},${includePromoItemsCaptions},${includePrimarySection},promo_items.basic_gallery.content_elements.type`

    this.fetchContent({
      data: {
        source: contentService,
        query: Object.assign(contentConfigValues, { presets, includedFields }),
        filter: schemaFilter(arcSite),
      },
    })
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      const { isAdmin } = this.props
      const { data: { next = 0 } = {} } = this.state

      if (!isAdmin) {
        const { isLoading } = this.state
        if (
          window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 1400 &&
          !isLoading &&
          next > 0
        ) {
          this.fetch()
          this.setState({ isLoading: true })
        }
      }
    })
  }

  fetch = () => {
    const { data } = this.state
    const { next = 0, content_elements: contentElements = [] } = data || {}
    const {
      customFields: {
        storyConfig: { contentService = '', contentConfigValues = {} } = {},
      } = {},
      arcSite,
    } = this.props

    const presets = 'portrait_md:306x225'
    const includedFields = `websites.${arcSite}.website_url,headlines.basic,${includePromoItems},${includePromoItemsCaptions},${includePrimarySection},promo_items.basic_gallery.content_elements.type`

    this.fetchContent({
      data: {
        source: contentService,
        query: Object.assign(contentConfigValues, {
          presets,
          includedFields,
          from: next,
          feedOffset: next,
        }),
        filter: schemaFilter(arcSite),
        transform: res => {
          this.setState({ isLoading: false })
          const { content_elements: stories = [] } = res || {}
          if (contentElements && res) {
            res.content_elements = [...contentElements, ...stories]
          }
          return res
        },
      },
    })
  }

  removeDuplicates = (array, key) => {
    const lookup = new Set()
    return array.filter(obj => !lookup.has(obj[key]) && lookup.add(obj[key]))
  }

  render() {
    const { data: { content_elements: contentElements = [], next = 0 } = {} } =
      this.state || {}

    const {
      deployment,
      contextPath,
      arcSite,
      // customFields: customFieldsProps = {},
    } = this.props

    // const { sectionField, dateField } = customFieldsProps

    const storyData = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'sm',
    })

    const stories = this.removeDuplicates(
      contentElements.map(story => {
        storyData._data = story
        const {
          title,
          multimediaPortraitMD,
          websiteLink,
          primarySectionLink,
          primarySection,
          id,
        } = storyData

        const {
          promo_items: {
            basic_gallery: { content_elements: photos = [] } = {},
          } = {},
        } = story || {}

        return {
          title,
          multimediaPortraitMD,
          websiteLink: `${websiteLink}?ref=home-galerias`,
          primarySectionLink: `${primarySectionLink}?ref=home-galerias`,
          primarySection,
          id,
          galerryLength: photos.length,
        }
      }),
      'id'
    )

    return (
      <div>
        <div className="flex flex-wrap">
          {stories.map(
            ({
              title,
              multimediaPortraitMD,
              websiteLink,
              galerryLength,
              primarySectionLink,
              primarySection,
              id,
            }) => (
              <div
                key={id}
                className="infinite-cards__card pt-20 pb-20 pl-10 pr-10">
                <div className="position-relative">
                  <a
                    className="infinite-cards__media block position-relative"
                    href={websiteLink}>
                    <picture>
                      <img
                        className="infinite-cards__img object-cover w-full block"
                        src={multimediaPortraitMD}
                        alt={title}
                      />
                    </picture>
                    {galerryLength > 0 && (
                      <span className="infinite-cards__len position-absolute bottom-0 left-0 p-5">
                        <svg
                          width="23"
                          height="18"
                          viewBox="0 0 33 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.4161 0.75707C12.1155 0.824789 12.0563 1.00375 12.0561 1.84502C12.0559 2.59082 12.0744 2.66486 12.2858 2.76078C12.4202 2.82184 12.5729 2.82284 21.1124 2.8245C31.0034 2.8265 30.3981 2.80574 30.6579 3.15056C30.8688 3.43042 30.8539 3.01245 30.8594 8.81732C30.8648 14.5096 30.856 14.2404 31.0402 14.377C31.1765 14.4781 32.5461 14.4799 32.7199 14.3792C32.9806 14.2282 32.9588 14.7368 32.9618 8.73761C32.9632 5.80959 32.9749 3.07684 32.9876 2.66486C33.0294 1.31381 32.973 0.944131 32.704 0.803142L32.5764 0.736199L22.5633 0.731537C16.3577 0.72865 12.4992 0.738309 12.4161 0.75707ZM6.47242 6.65774C6.25953 6.79951 6.23609 6.89876 6.23609 7.65943C6.23609 8.41522 6.24587 8.45208 6.47752 8.5702C6.5808 8.62282 7.06333 8.62604 15.181 8.62704C25.1904 8.62837 24.6189 8.60773 24.8631 8.97674C25.0634 9.27937 25.0501 8.89026 25.0558 14.615C25.0613 20.207 25.056 19.9857 25.1889 20.1131C25.4138 20.3285 26.7851 20.3307 27.0403 20.1161C27.2128 19.971 27.2064 20.2411 27.1965 13.4078L27.1872 7.04807L27.1075 6.88921C27.057 6.78852 26.987 6.70692 26.9162 6.66607C26.805 6.60202 26.7669 6.60179 16.6928 6.59358L6.58114 6.58536L6.47242 6.65774ZM0.776257 12.4229C0.60479 12.4727 0.515393 12.6266 0.479633 12.9334C0.409114 13.5381 0.455757 25.6822 0.529052 25.8083C0.6722 26.0545 -0.390916 26.0325 10.9398 26.0236C22.3894 26.0145 21.2103 26.0432 21.3453 25.7693C21.4149 25.6281 21.4401 13.04 21.3714 12.7844C21.3297 12.63 21.2391 12.5263 21.084 12.4558C20.9506 12.3953 0.982928 12.3628 0.776257 12.4229Z"
                            fill="#F9F9F9"
                          />
                        </svg>

                        <span className="text-white ml-10">
                          {galerryLength}
                        </span>
                      </span>
                    )}
                  </a>
                  <a
                    className="infinite-cards__section pt-5 pb-5 pl-15 pr-15 uppercase text-sm font-bold block position-absolute top-0 right-0 text-white"
                    href={primarySectionLink}>
                    {primarySection}
                  </a>
                </div>

                <h2 itemProp="name" className="text-xl font-bold line-h-sm mt-10 secondary-font overflow-hidden">
                  <a className="infinite-cards__link" href={websiteLink}>
                    {title}
                  </a>
                </h2>
              </div>
            )
          )}
        </div>
        {next > 0 && <Spinner />}
      </div>
    )
  }
}

StoriesLiestInfiniteCards.label = 'Listado de noticias con fotogalerías'

StoriesLiestInfiniteCards.propTypes = {
  customFields: PropTypes.shape({
    storyConfig: PropTypes.contentConfig('stories').tag({
      name: 'Configuración del contenido',
    }),
  }),
}

export default StoriesLiestInfiniteCards
