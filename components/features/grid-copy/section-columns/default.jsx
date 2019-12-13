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
          const { customFields: { htmlAds } = {} } = this.props || {}

          for (let i = 1; i < 10; i++) {
            const { customFields = {} } = this.props || {}
            this.fetchSection(`section${i}`, customFields[`section${i}`])
          }
          this.fetchCinemaContent()

          loadSrcScript(htmlAds)

          observer.unobserve(entry.target)
        }
      })
    }
    const observer = new IntersectionObserver(callback, options)
    observer.observe(document.querySelector('#section-columns-lazy'))
  }

  fetchSection(key, section) {
    const { arcSite, deployment, contextPath } = this.props

    this.fetchContent({
      [key]: {
        source: 'story-feed-by-section-v2',
        query: {
          section,
          size: 4,
          presets: 'mobile:314x157',
          includedFields: 'headlines.basic,websites,promo_items,credits',
        },
        filter: `{ 
          content_elements {
            headlines { basic }
            websites { ${arcSite} { website_url } }
            promo_items {
              basic { resized_urls { mobile } }
              basic_video {
                promo_items {
                  basic { resized_urls { mobile } }
                }
              }
              basic_gallery {
                promo_items {
                  basic { resized_urls { mobile } }
                }
              }
              youtube_id { content }
            }
            credits { by { name url } }
          }
        }`,
        transform: resp => {
          console.log(resp)
          const { content_elements: contentElements = [] } = resp || {}
          return {
            sectionName: '',
            sectionUrl: '',
            contentElements: contentElements.map(
              ({
                headlines: { basic } = {},
                websites: { [arcSite]: { website_url: websiteUrl } = {} } = {},
                credits: { by: [{ name, url } = {}] = [] } = {},
                promo_items: {
                  basic: { resized_urls: { mobile: basicUrl } = {} } = {},
                  basic_video: {
                    promo_items: {
                      basic: {
                        resized_urls: { mobile: basicVideoUrl } = {},
                      } = {},
                    } = {},
                  } = {},
                  basic_gallery: {
                    promo_items: {
                      basic: {
                        resized_urls: { mobile: basicGalleryUrl } = {},
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
          }
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
      section1,
      section2,
      section3,
      section4,
      section5,
      section6,
      section7,
      section8,
      section9,
    } = this.state || {}

    const {
      deployment,
      contextPath,
      arcSite,
      customFields: { htmlAds, ads } = {},
    } = this.props

    return (
      <>
        <h2 className="w-full mt-20 custom-title text-center col-3 custom-border large">
          SECCIONES
        </h2>
        <div id="section-columns-lazy" className="grid grid--content col-3">
          <ChildrenSectionColumn {...section1} />
          <ChildrenSectionColumn {...section2} />
          <ChildrenSectionColumn {...section3} />
          <ChildrenSectionColumn {...section4} />
          <ChildrenSectionColumn {...section5} />
          {isOnViewPort && (
            <div dangerouslySetInnerHTML={createMarkup(htmlAds)}></div>
          )}
          <ChildrenSectionColumn {...section6} />
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
          <ChildrenSectionColumn {...section7} />
          <ChildrenSectionColumn {...section8} />
          <div dangerouslySetInnerHTML={createMarkup(ads)}></div>
          <ChildrenSectionColumn {...section9} />
        </div>
      </>
    )
  }
}

GridSectionColumns.propTypes = {
  customFields: PropTypes.shape({
    section1: PropTypes.string.tag({
      name: 'Campo 1 (URL de la sección)',
    }),
    section2: PropTypes.string.tag({
      name: 'Campo 2 (URL de la sección)',
    }),
    section3: PropTypes.string.tag({
      name: 'Campo 3 (URL de la sección)',
    }),
    section4: PropTypes.string.tag({
      name: 'Campo 4 (URL de la sección)',
    }),
    section5: PropTypes.string.tag({
      name: 'Campo 5 (URL de la sección)',
    }),
    htmlAds: PropTypes.richtext.tag({
      name: 'Campo 6 (Suplemento HTML)',
    }),
    section6: PropTypes.string.tag({
      name: 'Campo 7 (URL de la sección)',
    }),
    billboard: PropTypes.label.tag({
      name: 'Campo 8 (Cartelera)',
    }),
    section7: PropTypes.string.tag({
      name: 'Campo 9 (URL de la sección)',
    }),
    section8: PropTypes.string.tag({
      name: 'Campo 10 (URL de la sección)',
    }),
    ads: PropTypes.richtext.tag({
      name: 'Campo 11 (Publicidad HTML)',
    }),
    section9: PropTypes.string.tag({
      name: 'Campo 12 (URL de la sección)',
    }),
  }),
}

GridSectionColumns.label = 'Grid de noticias por sección - multiple fetch'

export default GridSectionColumns
