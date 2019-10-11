import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import SchemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'
import VideoListItem from './_children/item'
import StoryData from '../../../utilities/story-data'
import Spinner from '../../../global-components/spinner'

@Consumer
class VideoList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      dataList: {},
      isLoading: false,
    }
    this.section = '/'
    const { globalContent } = this.props

    if (globalContent && globalContent.type === 'story') {
      const {
        taxonomy: { primary_section: { path = '' } = {} } = {},
      } = globalContent
      this.section = path
      this.initialFetch(this.section)
    } else {
      this.section = globalContent._id
      this.initialFetch(this.section)
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      const { isAdmin } = this.props
      const { dataList: { next = 0 } = {} } = this.state

      if (!isAdmin) {
        const { isLoading } = this.state
        if (
          window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 1200 &&
          !isLoading &&
          next > 0 &&
          window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight
        ) {
          this.infinityScrollFetch(this.section)
          this.setState({ isLoading: true })
        }
      }
    })
  }

  initialFetch = (section = '/') => {
    const { arcSite } = this.props
    const {
      customFields: { offSetNote = 5, quantyStory = 16 } = {},
    } = this.props
    this.fetchContent({
      dataList: {
        source: 'story-feed-by-section',
        query: {
          section,
          feedOffset: offSetNote,
          stories_qty: quantyStory,
        },
        filter: SchemaFilter(arcSite),
      },
    })
  }

  infinityScrollFetch = (section = '/') => {
    const { arcSite } = this.props
    const {
      dataList: { next = 0, content_elements: contentElements = [] } = {},
    } = this.state

    this.fetchContent({
      dataList: {
        source: 'story-feed-by-section',
        query: {
          section,
          feedOffset: next,
          stories_qty: 16,
        },
        filter: SchemaFilter(arcSite),
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

  render() {
    const {
      dataList: { content_elements: contentElements = [], next = 0 } = {},
    } = this.state
    const { arcSite, contextPath, deployment } = this.props
    const Story = new StoryData({
      data: {},
      arcSite,
      contextPath,
      deployment,
      defaultImgSize: 'sm',
    })

    return (
      <>
        <div className="flex video-list justify-center md:justify-between mt-50 flex-wrap">
          {contentElements &&
            contentElements.map(video => {
              Story.__data = video
              const {
                websiteLink,
                title,
                multimediaSquareMD,
                primarySection,
                primarySectionLink,
              } = Story
              const params = {
                websiteLink,
                title,
                multimediaSquareMD,
                primarySection,
                primarySectionLink,
              }
              return <VideoListItem {...params} />
            })}
        </div>
        {next > 0 && <Spinner />}
      </>
    )
  }
}

VideoList.propTypes = {
  customFields,
}

VideoList.label = 'Video - Lista'
export default VideoList
