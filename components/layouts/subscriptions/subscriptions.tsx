import * as React from 'react'
import { LayoutComponent } from 'types/layouts'
import { CommonProps } from 'types/utils'

const SubscriptionsLayout: LayoutComponent<CommonProps> = ({
  children = [],
}): JSX.Element =>
  Array.isArray(children) ? (
    <>
      <div>{children[0]}</div>
      <div>
        <div role="main">{children[1]}</div>
      </div>
      <div>
        <div>{children[2]}</div>
      </div>
    </>
  ) : (
    <h1>Ha ocurrido un error al renderizar el layout</h1>
  )

SubscriptionsLayout.sections = [
  'Cabecera de página',
  'Contenido',
  'Pie de página',
]

export default SubscriptionsLayout
