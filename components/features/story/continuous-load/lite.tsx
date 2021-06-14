import { useAppContext } from 'fusion:context'
// import getProperties from 'fusion:properties'
import * as React from 'react'
import { FC } from 'types/features'
import { Story } from 'types/story'

import getLinks from './_children/get-links'
import GetStory from './_children/get-story'

const StoryContinousLoad: FC = () => {
  const {
    deployment,
    arcSite,
    requestUri,
    contextPath,
  } = useAppContext<Story>()
  // const { idGoogleAnalitics } = getProperties(arcSite)

  const [pageHtml, setPageHtml] = React.useState([])
  const [pageNumber, setPageNumber] = React.useState(0)
  const links = getLinks()

  const observer = React.useRef()
  const lastFooterElementRef = React.useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && links.length - 1 > pageNumber) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1)
          console.log('=>> footer child')
        }
      })
      if (node) observer.current.observe(node)
    },
    [links]
  )

  React.useEffect(() => {
    setPageHtml((prevPageHtml) => {
      const link = links[pageNumber]?.link
      return [
        ...prevPageHtml,
        <GetStory
          link={link}
          arcSite={arcSite}
          contextPath={contextPath}
          requestUri={requestUri}
          deployment={deployment}
          refCallback={lastFooterElementRef}
        />,
      ]
    })
  }, [pageNumber])
  return <div>{pageHtml}</div>
}

StoryContinousLoad.label = 'Artículo - Carga Conitnua'

export default StoryContinousLoad
