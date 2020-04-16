import React from 'react'
import PropTypes from 'prop-types'
import { useFusionContext } from 'fusion:context'
import Static from 'fusion:static'

import { sectionBlockAsyncScrip } from './_dependencies/scripts'

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
  const { arcSite, contextPath } = useFusionContext()

  return (
    <Static id="GridSectionColumns">
      <h2 className="w-full mt-20 custom-title text-center col-3 custom-border large">
        SECCIONES
      </h2>

      <div
        id="section-columns-lazy"
        className="grid grid--content grid--col-1 grid--col-2 grid--col-3 col-3">
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: sectionBlockAsyncScrip(
              [
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
              ],
              htmlAds,
              contextPath,
              arcSite
            ),
          }}></script>
      </div>
    </Static>
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

GridSectionColumns.label = 'Noticias por sección - async'
GridSectionColumns.static = true

export default GridSectionColumns
