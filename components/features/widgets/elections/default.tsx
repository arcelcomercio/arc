import { useContent } from 'fusion:content'
import * as React from 'react'
import { FC } from 'types/features'

import Widget from './_children/widget'

const WidgetElections: FC = () => {
  const dataElections =
    useContent({
      source: 'get-data-elections-widget',
      query: {},
    }) || {}
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

export default WidgetElections
