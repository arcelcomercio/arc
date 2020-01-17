import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'

import { getActualDate } from '../../../utilities/helpers'
import StoryData from '../../../utilities/story-data'
import schemaFilter from './_dependencies/schema-filter'
import {
  includeCredits,
  includeCreditsImage,
  includePrimarySection,
  includeSections,
  includePromoItems,
} from '../../../utilities/included-fields'

import RenderPagination from './_children/pagination-by-date'
import Ads from '../../../global-components/ads'
import ListItem from './_children/list-item'
import Spinner from '../../../global-components/spinner'
import ConfigParams from '../../../utilities/config-params'

const classes = {
  adsBox: 'flex items-center flex-col no-desktop pb-20',
}

@Consumer
class StoriesListInfiniteScroll extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      isLoading: false,
      isRender: false,
    }

    const {
      customFields: {
        storyConfig: { contentService = '', contentConfigValues = {} } = {},
      } = {},
      arcSite,
    } = this.props

    this.fetchContent({
      data: {
        source: contentService,
        query: contentConfigValues,
        filter: schemaFilter(arcSite),
      },
    })
  }

  componentDidMount() {
    this.setState({ isRender: true })
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

    const presets = 'landscape_s:234x161,landscape_xs:118x72'
    const includedFields = `&_sourceInclude=websites.${arcSite}.website_url,_id,headlines.basic,subheadlines.basic,display_date,${includeCredits},${includeCreditsImage},${includePrimarySection},${includeSections},${includePromoItems},promo_items.basic_html.content`

    this.fetchContent({
      data: {
        source: contentService,
        query: Object.assign(contentConfigValues, {
          from: next,
          presets,
          includedFields,
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

  hasAds = (index, adsList) => adsList.filter(el => el.pos === index)

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
      customFields: customFieldsProps = {},
      siteProperties: { isDfp = false },
    } = this.props

    const { sectionField, dateField } = customFieldsProps

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
          primarySectionLink,
          primarySection,
          date,
          websiteLink,
          title,
          subTitle,
          authorLink,
          author,
          authorImage,
          multimediaType,
          multimediaLandscapeXS,
          multimediaLandscapeS,
          id,
        } = storyData

        const isOpinionCorreo =
          primarySectionLink === '/opinion/' &&
          arcSite === ConfigParams.SITE_DIARIOCORREO

        const imgItemLandscapeXS = isOpinionCorreo
          ? authorImage
          : multimediaLandscapeXS
        const imgItemLandscapeS = isOpinionCorreo
          ? authorImage
          : multimediaLandscapeS

        return {
          primarySectionLink,
          primarySection,
          date,
          link: websiteLink,
          title,
          subTitle,
          authorLink,
          author,
          multimediaType,
          multimediaLandscapeXS: imgItemLandscapeXS,
          multimediaLandscapeS: imgItemLandscapeS,
          id,
        }
      }),
      'id'
    )

    const activeAds = Object.keys(customFieldsProps)
      .filter(prop => prop.match(/adsMobile(\d)/))
      .filter(key => customFieldsProps[key] === true)
    const typeSpace = isDfp ? 'caja' : 'movil'

    const activeAdsArray = activeAds.map(el => {
      return {
        name: `${typeSpace}${el.slice(-1)}`,
        pos: customFieldsProps[`adsMobilePosition${el.slice(-1)}`] || 0,
        inserted: false,
      }
    })

    const { isRender } = this.state

    return (
      <>
        <div>
          {stories.map((story, index) => {
            const ads = this.hasAds(index + 1, activeAdsArray)
            return (
              <Fragment key={`Archivo-${story.id}`}>
                <ListItem
                  {...{
                    story,
                    isRender,
                  }}
                />
                {ads.length > 0 && (
                  <div className={classes.adsBox}>
                    <Ads
                      adElement={ads[0].name}
                      isDesktop={false}
                      isMobile
                      isDfp={isDfp}
                    />
                  </div>
                )}
              </Fragment>
            )
          })}
        </div>
        {next > 0 && <Spinner />}
        <RenderPagination
          section={sectionField}
          date={dateField || getActualDate()}
        />
      </>
    )
  }
}

StoriesListInfiniteScroll.propTypes = {
  customFields: PropTypes.shape({
    storyConfig: PropTypes.contentConfig('stories-dev').tag({
      name: 'Configuración del contenido',
    }),
    adsMobile2: PropTypes.bool.tag({
      name: 'Mostrar "movil2"',
      group: 'Publicidad Movil',
    }),
    adsMobilePosition2: PropTypes.number.tag({
      name: 'Posición en la lista',
      group: 'Publicidad Movil',
    }),
    adsMobile3: PropTypes.bool.tag({
      name: 'Mostrar "movil3"',
      group: 'Publicidad Movil',
    }),
    adsMobilePosition3: PropTypes.number.tag({
      name: 'Posición en la lista',
      group: 'Publicidad Movil',
    }),
    adsMobile4: PropTypes.bool.tag({
      name: 'Mostrar "movil4"',
      group: 'Publicidad Movil',
    }),
    adsMobilePosition4: PropTypes.number.tag({
      name: 'Posición en la lista',
      group: 'Publicidad Movil',
    }),
    adsMobile5: PropTypes.bool.tag({
      name: 'Mostrar "movil5"',
      group: 'Publicidad Movil',
    }),
    adsMobilePosition5: PropTypes.number.tag({
      name: 'Posición en la lista',
      group: 'Publicidad Movil',
    }),
    sectionField: PropTypes.string.tag({
      name: 'Sección',
      group: 'Configuración de la paginación',
    }),
    dateField: PropTypes.string.tag({
      name: 'Fecha',
      group: 'Configuración de la paginación',
    }),
  }),
}

StoriesListInfiniteScroll.label = 'Listado con scroll infinito'

export default StoriesListInfiniteScroll
