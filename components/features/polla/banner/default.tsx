import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

interface Props {
  customFields?: {
    bottomText?: string
  }
}

const PollaBanner: FC<unknown> = (props) => {
  const { customFields } = props as Props

  return (
    <>
      <div className="polla-banner__logo-container">
        <img
          className="polla-banner__logo-img"
          src="https://d1ts5g4ys243sh.cloudfront.net/proyectos_especiales_general/depor/prod/polla-peru-vs-argentina-nndd-xvisual/img/polla-depor.png"
          alt="Logo La Polla"
        />
        <h1 className="polla-banner__logo-title">Copa América 2021</h1>
      </div>
      {customFields?.bottomText && (
        <h3 className="polla-banner__text">{customFields?.bottomText}</h3>
      )}
    </>
  )
}

PollaBanner.label = 'La Polla - Banner'

PollaBanner.propTypes = {
  customFields: PropTypes.shape({
    bottomText: PropTypes.string.tag({
      name: 'Texto inferior',
    }),
  }),
}

export default PollaBanner
