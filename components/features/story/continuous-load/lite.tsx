import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
// import getProperties from 'fusion:properties'
import * as React from 'react'
import { FC } from 'types/features'
import { Story } from 'types/story'

import getLinks from './_children/get-links'
import getStory from './_children/get-story'

const StoryContinousLoad: FC = () => {
  const { globalContent, arcSite, requestUri } = useAppContext<Story>()
  // const { idGoogleAnalitics } = getProperties(arcSite)

  const [pageHtml, setPageHtml] = React.useState([])
  const [pageNumber, setPageNumber] = React.useState(0)
  const links = getLinks()
  console.log('=> linkss ', links)
  // const loading = false
  // const hasMore = true

  const observer = React.useRef()
  const lastFooterElementRef = React.useCallback(
    (node) => {
      // if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && links.length - 1 > pageNumber) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1)
          console.log('=>> footer child')
        }
      })
      if (node) observer.current.observe(node)
    },
    [/* loading, */ links]
  )

  const componentsHtml = ({ title = '' }) => (
    <div>
      <h2>{title}</h2>
      <section
        style={{
          height: 700,
          border: '1px solid red',
        }}>
        content
      </section>
      <div ref={lastFooterElementRef}>footer</div>
    </div>
  )

  React.useEffect(() => {
    // getStory(nextStoriesArray[0]?.link, arcSite)
    console.log('==> pageNumber', pageNumber)
    console.log('==> set LenLinks', links.length)
    setPageHtml((prevPageHtml) => {
      console.log('==> prevPageHtml', prevPageHtml)
      return [...prevPageHtml, componentsHtml(links[pageNumber])]
    })
  }, [pageNumber])

  /* *********** */

  /* const dataStory =
    useContent({
      source: 'story-by-url-and-related-filter',
      query: {
        website_url: nextStoriesArray[0]?.link,
        section: '',
        includedFields: `websites.${arcSite}.website_url,headlines.basic,promo_items.basic_gallery.type,subtype,content_restrictions.content_code`,
      },
    }) || {}

  console.log('=> link', nextStoriesArray[0]?.link)
  console.log('=> data story', dataStory) */

  /* React.useEffect(() => {
    setPageHtml(componentsHtml(nextStoriesArray[0]))
  }, []) */
  console.dir(pageHtml)
  return (
    <div>
      <h1>Hola mundo</h1>
      {pageHtml}
    </div>
  )
}

StoryContinousLoad.label = 'Artículo - Carga Conitnua'

export default StoryContinousLoad
