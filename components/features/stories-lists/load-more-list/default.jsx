import Consumer from 'fusion:consumer'
import React, { Fragment, PureComponent } from 'react'

import Ads from '../../../global-components/ads'
import Spinner from '../../../global-components/spinner'
import StoryGrid from '../../../global-components/story-grid'
import { getAssetsPath } from '../../../utilities/assets'
import { SITE_DIARIOCORREO } from '../../../utilities/constants/sitenames'
import { reduceWord } from '../../../utilities/helpers'
import {
  includeCredits,
  includeCreditsImage,
  includePrimarySection,
  includePromoItems,
  includeSections,
} from '../../../utilities/included-fields'
import StoryData from '../../../utilities/story-data'
import ListItem from './_children/list-item'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'

const SECTION_SOURCE = 'story-feed-by-section'

const classes = {
  listado: 'stories-news w-full',
  listadoContent: 'stories-news__list',
  listadoLoadMoreContainer:
    'stories-news__btn-container flex justify-center mt-20',
  listadoLoadMore: 'stories-news__btn uppercase',
  adsBox: 'flex items-center flex-col no-desktop pb-20',
}

@Consumer
class StoriesListLoadMore extends PureComponent {
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
        sectionField,
      } = {},
      arcSite,
    } = this.props

    this.section = contentConfigValues.section || sectionField

    this.isSection =
      this.section && this.section !== '/' && this.section !== '/todas'
    this.isMultipleSections = (this.section || '').includes(',')

    this.presets = 'landscape_s:234x161,landscape_xs:118x72'
    this.includedFields = `&_sourceInclude=websites.${arcSite}.website_url,_id,headlines.basic,headlines.mobile,subheadlines.basic,display_date,content_restrictions.content_code,${includeCredits},${includeCreditsImage},${includePrimarySection(
      { arcSite }
    )},${includeSections},${includePromoItems},promo_items.basic_html.content`

    this.fetchContent({
      data: {
        source:
          this.isSection && !this.isMultipleSections
            ? SECTION_SOURCE
            : contentService,
        query:
          this.isSection && !this.isMultipleSections
            ? {
                section: this.section,
                stories_qty:
                  contentConfigValues.size ||
                  contentConfigValues.stories_qty ||
                  100,
                presets: this.presets,
                includedFields: this.includedFields,
              }
            : Object.assign(contentConfigValues, {
                presets: this.presets,
                includedFields: this.includedFields,
              }),
        filter: schemaFilter(arcSite),
      },
    })
  }

  componentDidMount() {
    this.setState({ isRender: true })

    document.getElementById('loadbtn').addEventListener('click', () => {
      const { isAdmin } = this.props
      const { data: { next = 0 } = {} } = this.state

      if (!isAdmin) {
        const { isLoading } = this.state
        if (!isLoading && next > 0) {
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
        source:
          this.isSection && !this.isMultipleSections
            ? SECTION_SOURCE
            : contentService,
        query:
          this.isSection && !this.isMultipleSections
            ? {
                section: this.section,
                feedOffset: next,
                stories_qty:
                  contentConfigValues.size ||
                  contentConfigValues.stories_qty ||
                  100,
                presets: this.presets,
                includedFields: this.includedFields,
              }
            : Object.assign(contentConfigValues, {
                from: next,
                presets: this.presets,
                includedFields: this.includedFields,
              }),
        filter: schemaFilter(arcSite),
        transform: (res) => {
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

  hasAds = (index, adsList) => adsList.filter((el) => el.pos === index)

  removeDuplicates = (array, key) => {
    const lookup = new Set()
    return array.filter((obj) => !lookup.has(obj[key]) && lookup.add(obj[key]))
  }

  render() {
    const {
      data: { content_elements: contentElements = [], next = 0 } = {},
      isLoading,
    } = this.state || {}

    const {
      deployment,
      contextPath,
      arcSite,
      customFields: customFieldsProps = {},
      siteProperties: {
        isDfp = false,
        assets: {
          premium: { logo },
        },
      },
    } = this.props

    const storyData = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'sm',
    })

    const stories = this.removeDuplicates(
      contentElements.map((story) => {
        storyData._data = story
        const {
          isPremium,
          primarySectionLink,
          primarySection,
          date,
          websiteLink,
          title,
          titleHeader,
          subTitle,
          authorLink,
          author,
          authorImage,
          multimediaType,
          multimediaLandscapeXS,
          multimediaLazyDefault,
          multimediaLandscapeS,
          id,
        } = storyData

        const isOpinionCorreo =
          primarySectionLink === '/opinion/' && arcSite === SITE_DIARIOCORREO

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
          titleHeader,
          subTitle,
          authorLink,
          author,
          multimediaType,
          multimediaLandscapeXS: imgItemLandscapeXS,
          multimediaLazyDefault,
          multimediaLandscapeS: imgItemLandscapeS,
          id,
          isPremium,
          arcSite,
          logo: `${getAssetsPath(
            arcSite,
            contextPath
          )}/resources/dist/${arcSite}/images/${logo}?d=1`,
        }
      }),
      'id'
    )

    const activeAds = Object.keys(customFieldsProps)
      .filter((prop) => prop.match(/adsMobile(\d)/))
      .filter((key) => customFieldsProps[key] === true)
    const typeSpace = isDfp ? 'caja' : 'movil'

    const activeAdsArray = activeAds.map((el) => ({
      name: `${typeSpace}${el.slice(-1)}`,
      pos: customFieldsProps[`adsMobilePosition${el.slice(-1)}`] || 0,
      inserted: false,
    }))

    const isTrome = arcSite === 'trome'

    const { isRender } = this.state
    return (
      <div className={classes.listado}>
        <div className={classes.listadoContent}>
          {stories.map((story, index) => {
            const ads = this.hasAds(index + 1, activeAdsArray)
            return (
              <Fragment key={`Archivo-${story.id}`}>
                {isTrome ? (
                  <StoryGrid
                    key={index.toString()}
                    isAdmin
                    primarySectionLink={story.primarySectionLink}
                    primarySection={story.primarySection}
                    date={story.date}
                    websiteLink={story.websiteLink}
                    title={reduceWord(story.title)}
                    titleHeader={story.titleHeader}
                    subTitle={reduceWord(story.subTitle)}
                    authorLink={story.authorLink}
                    author={story.author}
                    multimediaType={story.multimediaType}
                    multimediaLazyDefault={story.multimediaLazyDefault}
                    multimediaLandscapeS={story.multimediaLandscapeS}
                    imgRendering="img"
                  />
                ) : (
                  <ListItem {...story} isRender={isRender} />
                )}

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

        <div className={classes.listadoLoadMoreContainer}>
          {next > 0 && contentElements.length <= 160 ? (
            <button
              id="loadbtn"
              type="button"
              className={classes.listadoLoadMore}
              disabled={isLoading}>
              {isLoading ? <Spinner /> : <span>Ver Más</span>}
            </button>
          ) : null}
        </div>
      </div>
    )
  }
}

StoriesListLoadMore.propTypes = {
  customFields,
}

StoriesListLoadMore.label = 'Listado con Botón de carga'

export default StoriesListLoadMore
