import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'

import ChildrenSectionColumn from './_children/section-column'
import ChildernCinemaBillboardCard from './_children/cinema-billboard-card'

const getMultimediaType = ({ basicVideoUrl, basicGalleryUrl }) => {
  if (basicVideoUrl) return 'basic_video'
  if (basicGalleryUrl) return 'basic_gallery'
  return 'basic'
}

const createMarkup = html => {
  return {
    __html: html,
  }
}

const loadSrcScript = html => {
  const match = html.match(/<script.+src="(.+)"(\s|>).+><\/script>/) || []
  const url = match[1]
  const script = document.createElement('script')
  script.src = url
  document.head.appendChild(script)
}

@Consumer
class GridSectionColumns extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOnViewPort: false,
    }
  }

  componentDidMount() {
    const { IntersectionObserver } = window
    const options = {
      rootMargin: '0px 0px 500px 0px',
    }
    const callback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.setState({ isOnViewPort: true })

          this.fetchSections()
          this.fetchCinemaContent()

          const { customFields: { htmlAds } = {} } = this.props

          loadSrcScript(htmlAds)

          observer.unobserve(entry.target)
        }
      })
    }
    const observer = new IntersectionObserver(callback, options)
    observer.observe(document.querySelector('#section-columns-lazy'))
  }

  fetchSections() {
    const {
      arcSite,
      deployment,
      contextPath,
      customFields: {
        storyConfig: { contentService = '', contentConfigValues = {} } = {},
      } = {},
    } = this.props

    this.fetchContent({
      sections: {
        source: contentService,
        query: contentConfigValues,
        filter: `{ 
          children {
            name
            _id
            content_elements {
              headlines { basic }
              websites { ${arcSite} { website_url } }
              promo_items {
                basic { resized_urls { 314x157 } }
                basic_video {
                  promo_items {
                    basic { resized_urls { 314x157 } }
                  }
                }
                basic_gallery {
                  promo_items {
                    basic { resized_urls { 314x157 } }
                  }
                }
                youtube_id { content }
              }
              credits { by { name url } }
            }  
          }
        }`,
        transform: resp => {
          const { children = [] } = resp || {}
          return children.map(
            ({
              name: sectionName,
              _id: sectionUrl,
              content_elements: contentElements = [],
            }) => ({
              sectionName,
              sectionUrl,
              contentElements: contentElements.map(
                ({
                  headlines: { basic } = {},
                  websites: {
                    [arcSite]: { website_url: websiteUrl } = {},
                  } = {},
                  credits: { by: [{ name, url } = {}] = [] } = {},
                  promo_items: {
                    basic: { resized_urls: { '314x157': basicUrl } = {} } = {},
                    basic_video: {
                      promo_items: {
                        basic: {
                          resized_urls: { '314x157': basicVideoUrl } = {},
                        } = {},
                      } = {},
                    } = {},
                    basic_gallery: {
                      promo_items: {
                        basic: {
                          resized_urls: { '314x157': basicGalleryUrl } = {},
                        } = {},
                      } = {},
                    } = {},
                  } = {},
                }) => ({
                  title: basic,
                  storyUrl: websiteUrl,
                  authorName: name,
                  authorUrl: url,
                  imageUrl:
                    basicVideoUrl ||
                    basicGalleryUrl ||
                    basicUrl ||
                    deployment(
                      `${contextPath}/resources/dist/${arcSite}/images/default-md.png`
                    ),
                  multimediaType: getMultimediaType({
                    basicVideoUrl,
                    basicGalleryUrl,
                  }),
                })
              ),
            })
          )
        },
      },
    })
  }

  fetchCinemaContent() {
    this.fetchContent({
      cinemaContent: {
        source: 'cinema-billboard',
        query: { format: 'single' },
      },
    })
  }

  render() {
    console.log('STATE->', this.state)
    const {
      sections = [],
      cinemaContent: {
        billboardData,
        premiereData: {
          alt: premiereAlt,
          img: premiereImg,
          title: premiereTitle,
          url: premiereUrl,
        } = {},
      } = {},
      isOnViewPort,
    } = this.state || {}

    const {
      deployment,
      contextPath,
      arcSite,
      customFields: { htmlAds, ads } = {},
    } = this.props

    return (
      <div
        id="section-columns-lazy"
        className="grid grid--content content-layout grid--col-1 grid--col-2 grid--col-3 col-3">
        <h2 className="w-full mt-20 custom-title text-center col-3 custom-border large">
          SECCIONES
        </h2>
        {sections
          .slice(0, 5)
          .map(({ sectionName, sectionUrl, contentElements } = {}) => (
            <ChildrenSectionColumn
              {...{
                sectionName,
                sectionUrl,
                contentElements,
              }}
              key={sectionUrl}
            />
          ))}
        {isOnViewPort && (
          <div dangerouslySetInnerHTML={createMarkup(htmlAds)}></div>
        )}
        {sections
          .slice(5, 6)
          .map(({ sectionName, sectionUrl, contentElements } = {}) => (
            <ChildrenSectionColumn
              {...{
                sectionName,
                sectionUrl,
                contentElements,
              }}
              key={sectionUrl}
            />
          ))}
        {premiereUrl && (
          <ChildernCinemaBillboardCard
            {...{
              billboardData,
              premiereAlt,
              premiereImg:
                premiereImg ||
                deployment(
                  `${contextPath}/resources/dist/${arcSite}/images/default-md.png`
                ),
              premiereTitle,
              premiereUrl,
            }}
          />
        )}
        {sections
          .slice(6, 8)
          .map(({ sectionName, sectionUrl, contentElements } = {}) => (
            <ChildrenSectionColumn
              {...{
                sectionName,
                sectionUrl,
                contentElements,
              }}
              key={sectionUrl}
            />
          ))}
        <div dangerouslySetInnerHTML={createMarkup(ads)}></div>
        {sections
          .slice(8, 9)
          .map(({ sectionName, sectionUrl, contentElements } = {}) => (
            <ChildrenSectionColumn
              {...{
                sectionName,
                sectionUrl,
                contentElements,
              }}
              key={sectionUrl}
            />
          ))}
      </div>
    )
  }
}

GridSectionColumns.propTypes = {
  customFields: PropTypes.shape({
    storyConfig: PropTypes.contentConfig('navigation').tag({
      name: 'Configuración del contenido',
    }),
    htmlAds: PropTypes.richtext.tag({
      name: 'HTML (Suplemento)',
    }),
    ads: PropTypes.richtext.tag({
      name: 'HTML (publicidad)',
    }),
  }),
}

GridSectionColumns.label = 'Grid de noticias por sección'

export default GridSectionColumns
