import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'

import Spinner from '../../../global-components/spinner'
import { includePrimarySection } from '../../../utilities/included-fields'
import StoryData from '../../../utilities/story-data'
import VideoListItem from './_children/item'
import customFields from './_dependencies/custom-fields'
import SchemaFilter from './_dependencies/schema-filter'

const source = 'story-feed-by-section'
const presets = 'landscape_md:314x0'

@Consumer
class VideoList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      dataList: {},
      isLoading: false,
    }
    this.section = '/'
    const { globalContent, arcSite } = this.props

    if (globalContent && globalContent.type === 'story') {
      const { websites = {} } = globalContent
      const {
        website_section: { path = '' },
      } = websites[arcSite] || {}
      this.section = path
      this.initialFetch(this.section)
    } else {
      this.section = globalContent._id
      this.initialFetch(this.section)
    }
  }

  includedFields = (arcSite) =>
    `websites.${arcSite}.website_url,headlines.basic,${includePrimarySection({
      arcSite,
    })},promo_items.basic.url,promo_items.basic.type,promo_items.basic.resized_urls,promo_items.basic_video._id,promo_items.basic_video.embed_html,promo_items.basic_video.promo_items.basic.url,promo_items.basic_video.promo_items.basic.type,promo_items.basic_video.promo_items.basic.resized_urls,promo_items.basic_video.duration,promo_items.youtube_id.content,promo_items.basic_jwplayer.embed.config.thumbnail_url,promo_items.basic_jwplayer.embed.config.resized_urls`

  initialFetch = (section = '/') => {
    const { arcSite } = this.props
    const {
      customFields: { offSetNote = 5, quantyStory = 16 } = {},
    } = this.props
    this.fetchContent({
      dataList: {
        source,
        query: {
          section,
          feedOffset: offSetNote,
          stories_qty: quantyStory,
          presets,
          includedFields: this.includedFields(arcSite),
        },
        filter: SchemaFilter(arcSite),
      },
    })
  }

  infinityScrollFetch = (section = '/') => {
    const { arcSite, customFields: { quantyStory = 16 } = {} } = this.props
    const {
      dataList: { next = 0, content_elements: contentElements = [] } = {},
    } = this.state

    this.fetchContent({
      dataList: {
        source,
        query: {
          section,
          feedOffset: next,
          stories_qty: quantyStory,
          presets,
          includedFields: this.includedFields(arcSite),
        },
        filter: SchemaFilter(arcSite),
        transform: (res) => {
          this.setState({ isLoading: false })
          const { content_elements: stories = [] } = res || {}
          if (contentElements && res) {
            res.content_elements = [...contentElements, ...stories]
            return res
          }
          const { dataList } = this.state
          return dataList
        },
      },
    })
  }

  buttonHandler = () => {
    const { isAdmin } = this.props
    const { dataList } = this.state
    const { content_elements: contentElements, next = 0 } = dataList
    if (!isAdmin) {
      const { isLoading } = this.state
      if (!isLoading && next > 0 && contentElements.length <= 160) {
        this.infinityScrollFetch(this.section)
        this.setState({ isLoading: true })
      }
    }
  }

  render() {
    const {
      dataList: { content_elements: contentElements = [], next = 0 } = {},
      isLoading,
    } = this.state
    const { globalContent, arcSite, contextPath, deployment } = this.props

    const sectionName = globalContent?.websites[arcSite]?.website_section?.name
    const Story = new StoryData({
      data: {},
      arcSite,
      contextPath,
      deployment,
      defaultImgSize: 'sm',
    })

    const {
      customFields: { showTitle = false, quantyStory = 16 } = {},
    } = this.props

    return (
      <>
        {showTitle && (
          <div className="video-list__section-title">
            Lo último en&nbsp;
            <span className="video-list__section-name"> {sectionName}</span>
            {arcSite === 'trome' && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="video-list__secction-icon">
                <path d="M8.59,16.59,13.17,12,8.59,7.41,10,6l6,6-6,6Z" />
              </svg>
            )}
          </div>
        )}
        <div className="video-list video-list__container">
          {contentElements.map((video, i) => {
            Story.__data = video
            const {
              websiteLink,
              title,
              multimediaLandscapeMD,
              primarySection,
              primarySectionLink,
              videoDuration,
            } = Story
            const params = {
              websiteLink,
              title,
              multimediaLandscapeMD,
              primarySection,
              primarySectionLink,
              videoDuration,
              index: i,
              arcSite,
            }
            return <VideoListItem {...params} isLazy={i < quantyStory} />
          })}
          <div
            className={`video-list__btn-container ${
              next > 0 && contentElements.length <= 160 ? '' : 'empty'
            }`}>
            {next > 0 && contentElements.length <= 160 ? (
              <button
                type="button"
                onClick={this.buttonHandler}
                disabled={isLoading}>
                {isLoading ? <Spinner /> : <span>Cargar más</span>}
              </button>
            ) : null}
          </div>
        </div>
      </>
    )
  }
}

VideoList.propTypes = {
  customFields,
}

VideoList.label = 'Video - Lista'
export default VideoList
