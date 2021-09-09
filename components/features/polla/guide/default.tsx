import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

import { socialMediaUrlShareList } from '../../../utilities/social-media'

interface Props {
  customFields?: {
    type?: 'with_score' | 'with_social'
    title?: string
    subtitle?: string
  }
}

const PollaGuide: FC<Props> = (props) => {
  const { customFields } = props

  const { arcSite, requestUri } = useFusionContext() || {}

  const { siteUrl } = getProperties(arcSite)

  const urlsShareList = socialMediaUrlShareList(siteUrl, requestUri)

  const popUpWindow = (url: string, title: string, w: number, h: number) => {
    const left = window.screen.width / 2 - w / 2
    const top = window.screen.height / 2 - h / 2
    window.open(
      url,
      title,
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`
    )
  }

  return (
    <div className={`polla-guide ${customFields?.type || ''}`}>
      <div className="polla-guide__title-cont">
        <h2>{customFields?.title || 'Copa América'}</h2>
        <span>{customFields?.subtitle || ' - Fase de grupos'}</span>
      </div>
      {customFields?.type === 'with_social' ? (
        <div className="polla-guide__results with_social">
          <button
            type="button"
            className="polla-guide__share-btn"
            onClick={() => {
              console.log('asdasdasd')
              popUpWindow(urlsShareList.facebook, '', 600, 400)
            }}>
            <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
              <path
                d="M2.04221 15V7.96156H0V5.42739H2.04221V3.26287C2.04221 1.56198 3.24856 0 6.02823 0C7.15368 0 7.98589 0.098325 7.98589 0.098325L7.92032 2.46481C7.92032 2.46481 7.07159 2.45728 6.14543 2.45728C5.14303 2.45728 4.98244 2.87826 4.98244 3.57697V5.42739H8L7.8687 7.96156H4.98244V15H2.04221Z"
                fill="white"
              />
            </svg>

            <span>Compartir</span>
          </button>
        </div>
      ) : (
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
      )}
    </div>
  )
}

PollaGuide.label = 'La Polla - Guía'

PollaGuide.propTypes = {
  customFields: PropTypes.shape({
    type: PropTypes.oneOf(['with_score', 'with_social']).tag({
      name: 'Tipo',
      labels: {
        with_score: 'Con guía sobre el puntaje',
        with_social: 'Con redes sociales',
      },
      defaultValue: 'with_score',
    }),
    title: PropTypes.string.tag({
      name: 'Título',
    }),
    subtitle: PropTypes.string.tag({
      name: 'Subtítulo',
    }),
  }),
}

export default PollaGuide
