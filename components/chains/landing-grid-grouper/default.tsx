import PropTypes from 'prop-types'
import * as React from 'react'

import ChainGridGrouperContext from '../../contexts/chain-grid-grouper'

interface Props {
  customFields?: {
    type: '1x1-triple' | '1x1-double' | '2x1' | '3x1' | '3xauto' | undefined
  }

  children?: any
}

const GridGrouperDefault = (props: Props) => {
  const { customFields, children } = props

  if (customFields?.type === '1x1-double') {
    return (
      <div className="row-1 g-grouper c-1x1-double">
        <ChainGridGrouperContext.Provider value={{ type: customFields?.type }}>
          {children[0]}
          {children[1]}
        </ChainGridGrouperContext.Provider>
      </div>
    )
  }
  return (
    <div className="row-1 g-grouper c-1x1-triple">
      <ChainGridGrouperContext.Provider value={{ type: customFields?.type }}>
        {children[0]}
        {children[1]}
        {children[2]}
      </ChainGridGrouperContext.Provider>
    </div>
  )
}

GridGrouperDefault.static = true
GridGrouperDefault.label = 'Landing: agrupador de grilla'

GridGrouperDefault.propTypes = {
  customFields: PropTypes.shape({
    type: PropTypes.oneOf([
      '1x1-triple',
      '1x1-double',
      '2x1',
      '3x1',
      '3xauto',
    ]).tag({
      name: 'Tipo:',
      // labels: {
      // 	'with-menu': 'Navbar con menu',
      // 	simple: 'Navbar simple',
      // },
      defaultValue: '1x1-triple',
    }),
  }),
}

export default GridGrouperDefault
