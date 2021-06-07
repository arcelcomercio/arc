import * as React from 'react'
import { FC } from 'types/features'

const PollaGuide: FC = () => (
  <div className="polla-guide">
    <div className="polla-guide__title-cont">
      <h2>Copa América</h2>
      <span> - Fase de grupos</span>
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

PollaGuide.label = 'La Polla - Guía'
PollaGuide.static = true

export default PollaGuide
