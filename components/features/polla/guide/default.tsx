import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

interface Props {
  customFields?: {
    title?: string
    subtitle?: string
  }
}

const PollaGuide: FC<Props> = (props) => {
  const { customFields } = props

  return (
    <div className="polla-guide">
      <div className="polla-guide__title-cont">
        <h2>{customFields?.title || 'Copa América'}</h2>
        <span>{customFields?.subtitle || ' - Fase de grupos'}</span>
      </div>
      <div className="polla-guide__results">
        <span>Marcador:</span>
        <span className="polla-guide__results-b">5pts</span>
        <span className="polla-guide__results-s">|</span>
        <span>Partido (gana - pierde) :</span>
        <span className="polla-guide__results-b">3pts</span>
        <span className="polla-guide__results-s">|</span>
        <span>Ninguno :</span>
        <span className="polla-guide__results-b">0pts</span>
      </div>
    </div>
  )
}

PollaGuide.label = 'La Polla - Guía'
PollaGuide.static = true

PollaGuide.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({
      name: 'Título',
    }),
    subtitle: PropTypes.string.tag({
      name: 'Subtítulo',
    }),
  }),
}

export default PollaGuide
