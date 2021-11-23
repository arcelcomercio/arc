import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

interface Props {
  customFields?: {
    bottomTitle?: string
    bottomText?: string
    transBack?: boolean
  }
}

const PollaBanner: FC<Props> = (props) => {
  const { customFields } = props

  return (
    <>
      {customFields?.transBack ? (
        <div className="polla-banner__logo-trans">
          <img
            className="polla-banner__logo-img"
            src="https://d1ts5g4ys243sh.cloudfront.net/proyectos_especiales_general/depor/prod/polla-peru-vs-argentina-nndd-xvisual/img/polla-depor.png"
            alt="Logo La Polla"
          />
          {customFields?.bottomTitle && (
            <h1 className="polla-banner__logo-title">
              {customFields?.bottomTitle}
            </h1>
          )}
        </div>
      ) : (
        <div className="polla-banner__logo-container">
          <img
            className="polla-banner__logo-img"
            src="https://d1ts5g4ys243sh.cloudfront.net/proyectos_especiales_general/depor/prod/polla-peru-vs-argentina-nndd-xvisual/img/polla-depor.png"
            alt="Logo La Polla"
          />
          {customFields?.bottomTitle && (
            <h1 className="polla-banner__logo-title">
              {customFields?.bottomTitle}
            </h1>
          )}
        </div>
      )}
      {customFields?.bottomText && (
        <h3 className="polla-banner__text">{customFields?.bottomText}</h3>
      )}
    </>
  )
}

PollaBanner.label = 'La Polla - Banner'

PollaBanner.propTypes = {
  customFields: PropTypes.shape({
    bottomTitle: PropTypes.string.tag({
      name: 'Titulo del banner',
    }),
    bottomText: PropTypes.string.tag({
      name: 'Texto inferior',
    }),
    transBack: PropTypes.bool.tag({
      name: '¿Mostrar fondo transparente?',
    }),
  }),
}

export default PollaBanner
