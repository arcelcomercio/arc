import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'

import { getActualDate } from '../../../utilities/helpers'
import StoryData from '../../../utilities/story-data'
import schemaFilter from './_dependencies/schema-filter'

import RenderPagination from './_children/pagination-by-date'
import Ads from '../../../global-components/ads'
import ListItem from './_children/list-item'
import Spinner from './_children/spinner'

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
            document.documentElement.offsetHeight - 1000 &&
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

    this.fetchContent({
      data: {
        source: contentService,
        query: Object.assign(contentConfigValues, { from: next }),
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

  render() {
    const { data: { content_elements: contentElements = [], next = 0 } = {} } =
      this.state || {}

    const {
      deployment,
      contextPath,
      arcSite,
      customFields: customFieldsProps = {},
    } = this.props

    const { sectionField, dateField } = customFieldsProps

    const storyData = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'sm',
    })

    const stories = contentElements.map(story => {
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
        multimediaType,
        multimediaLandscapeXS,
        multimediaLandscapeS,
      } = storyData
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
        multimediaLandscapeXS,
        multimediaLandscapeS,
      }
    })

    const activeAds = Object.keys(customFieldsProps)
      .filter(prop => prop.match(/adsMobile(\d)/))
      .filter(key => customFieldsProps[key] === true)

    const activeAdsArray = activeAds.map(el => {
      return {
        name: `movil${el.slice(-1)}`,
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
              <Fragment key={`Archivo-${story.link}`}>
                <ListItem
                  {...{
                    story,
                    isRender,
                  }}
                />
                {ads.length > 0 && (
                  <div className={classes.adsBox}>
                    <Ads adElement={ads[0].name} isDesktop={false} isMobile />
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
