import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import ChildrenSectionColumn from './_children/section-column'
import ChildernCinemaBillboardCard from './_children/cinema-billboard-card'

import { createMarkup, createScript } from '../../../utilities/helpers'

const loadSrcScript = (html = '') => {
  const match = html.match(/<script.+src="(.+)"(\s|>).+><\/script>/) || []
  const src = match[1]
  if (src) {
    document.head.appendChild(createScript({ src }))
  }
}

const GridSectionColumns = ({
  customFields: {
    htmlAds,
    section1,
    section2,
    section3,
    section4,
    section5,
    section6,
    section7,
    section8,
    section9,
    section10,
    section11,
    section12,
    section13,
  } = {},
}) => {
  const [isOnViewPort, setIsOnViewPort] = useState(false)

  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const { IntersectionObserver } = window
      const options = {
        rootMargin: '0px 0px 500px 0px',
      }
      const callback = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsOnViewPort(true)
            loadSrcScript(htmlAds)
            observer.unobserve(entry.target)
          }
        })
      }
      const observer = new IntersectionObserver(callback, options)
      observer.observe(document.querySelector('#section-columns-lazy'))
    } else {
      setIsOnViewPort(true)
    }
  }, [htmlAds])

  return (
    <>
      <h2 className="w-full mt-20 custom-title text-center col-3 custom-border large">
        SECCIONES
      </h2>

      <div
        id="section-columns-lazy"
        className="grid grid--content grid--col-1 grid--col-2 grid--col-3 col-3">
        {isOnViewPort && (
          <>
            <ChildrenSectionColumn section={section1} />
            <ChildrenSectionColumn section={section2} />
            <ChildrenSectionColumn section={section3} />
            <ChildrenSectionColumn section={section4} />
            <ChildrenSectionColumn section={section5} />
            <div dangerouslySetInnerHTML={createMarkup(htmlAds)}></div>
            <ChildrenSectionColumn section={section6} />
            <ChildernCinemaBillboardCard />
            <ChildrenSectionColumn section={section7} />
            <ChildrenSectionColumn section={section8} />
            <ChildrenSectionColumn section={section9} />
            <ChildrenSectionColumn section={section10} />
            <ChildrenSectionColumn section={section11} />
            <ChildrenSectionColumn section={section12} />
            <ChildrenSectionColumn section={section13} />
          </>
        )}
      </div>
    </>
  )
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
    section9: PropTypes.string.tag({
      name: 'Campo 12 (URL de la sección)',
    }),
    section10: PropTypes.string.tag({
      name: 'Campo 13 (URL de la sección)',
    }),
    section11: PropTypes.string.tag({
      name: 'Campo 14 (URL de la sección)',
    }),
    section12: PropTypes.string.tag({
      name: 'Campo 15 (URL de la sección)',
    }),
    section13: PropTypes.string.tag({
      name: 'Campo 16 (URL de la sección)',
    }),
  }),
}

GridSectionColumns.label = 'Grid de noticias por sección - async'

export default GridSectionColumns
