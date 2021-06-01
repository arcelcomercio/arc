// import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import * as React from 'react'
import { FC } from 'types/features'

import Widget from './_children/widget'
/* interface ElectionsProps {
  customFields?: {
    isMobile?: boolean
    freeHtml?: string
    columns?: 'w-full' | 'col-1' | 'col-2' | 'col-3'
    adsBorder?: 'border' | 'containerp'
    isDfp?: boolean
    rows?: 'empty' | 'row-1' | 'row-2'
  }
} */

// const WidgetElections: FC<ElectionsProps> = (props) => {
/* interface ElectionsQuery {
  website?: string
}

interface PoliticaParties {
  nombre?: string
  candidato?: string
  porcentaje_votos?: number
}
interface Elections {
  descripcion?: string
  link?: string
  partido_uno?: PoliticaParties
  partido_dos?: PoliticaParties
} */

const WidgetElections: FC = () => {
  const dataElections =
    useContent({
      source: 'get-data-elections-widget',
      query: {},
    }) || {}
  console.log('++++++++++++++dataElections+++++++++++++++++++', dataElections)
  const {
    descripcion = '',
    link = '',
    partido_uno: partidoUno = {},
    partido_dos: partidoDos = {},
  } = dataElections
  return (
    <Widget
      description={descripcion}
      link={link}
      politicaPartiesOne={partidoUno}
      politicaPartiesTwo={partidoDos}
    />
  )
}

WidgetElections.static = true
WidgetElections.label = 'Elecciones Finales'

/* WidgetElections.propTypes = {
  customFields: PropTypes.shape({
    section: PropTypes.kvp.tag({
      name: 'Path de la sección',
      description:
        'Si no se coloca el path de la sección, se renderiza la última historia publicada. Ejemplo: /deporte-total',
    }),
  }),
} */

export default WidgetElections
