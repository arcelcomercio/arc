import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

// import ChainGridGrouperContext from '../../../contexts/chain-grid-grouper'
import FeaturedStoryChildrenSimple from './_children/simple'

interface Props {
  customFields: {
    type:
      | 'simple'
      | 'with-subtitle'
      | 'with-image'
      | 'editorial'
      | 'columnist'
      | undefined
    titleField: string
  }
}

const CardsFeaturedStoryDefault: FC<Props> = (props) => {
  // const chainData = React.useContext(ChainGridGrouperContext)
  const { customFields } = props

  if (customFields?.type === 'with-subtitle') {
    return <div>With subtitle</div>
  }
  return <FeaturedStoryChildrenSimple customFields={customFields} />
}

CardsFeaturedStoryDefault.propTypes = {
  customFields: PropTypes.shape({
    type: PropTypes.oneOf([
      'with-image',
      'simple',
      'with-subtitle',
      'editorial',
      'columnist',
    ]).tag({
      name: 'Tipo:',
      labels: {
        'with-image': '1. Con imagen',
        simple: '2. Simple',
        'with-subtitle': '3. Con bajada',
        editorial: '4. Editorial',
        columnist: '5. Columnista',
      },
      defaultValue: 'with-image',
    }),
    storyConfig: PropTypes.contentConfig('story').tag({
      name: 'Fuente de contenido:',
    }),
    categoryField: PropTypes.string.tag({
      name: 'Sección',
      group: 'Editar campos',
      description: 'Dejar vacío para tomar el valor original de la historia.',
    }),
    titleField: PropTypes.string.tag({
      name: 'Título',
      group: 'Editar campos',
      description: 'Dejar vacío para tomar el valor original de la historia.',
    }),
    imgField: PropTypes.string.tag({
      name: 'Imagen',
      group: 'Editar campos',
      description: 'Dejar vacío para tomar el valor original de la historia.',
    }),
  }),
} as any

CardsFeaturedStoryDefault.static = true
CardsFeaturedStoryDefault.label = 'Destaque'

export default CardsFeaturedStoryDefault
