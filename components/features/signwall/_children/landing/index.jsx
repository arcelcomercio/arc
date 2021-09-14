import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { getAssetsPath } from '../../../../utilities/assets'
import { deleteQuery, getQuery } from '../../../../utilities/parse/queries'
import {
  ModalProvider,
  useModalContext,
} from '../../../subscriptions/_context/modal'
import { Taggeo } from '../../../subscriptions/_dependencies/Taggeo'
import FormForgot from '../forms/form_forgot'
import { FormLoginPaywall } from '../forms/form_login_landing_aux'
import FormRegisterAux from '../forms/form_register_aux'
import { Close } from '../icons'
import { Modal } from '../modal/index'

const renderTemplate = (template, valTemplate, attributes) => {
  const templates = {
    login: <FormLoginPaywall {...{ valTemplate, attributes }} />,
    forgot: <FormForgot {...attributes} />,
    register: <FormRegisterAux {...attributes} />,
  }

  if (getQuery('signLanding') || getQuery('signStudents')) {
    setTimeout(() => {
      deleteQuery('signLanding')
      deleteQuery('signStudents')
      deleteQuery('dataTreatment')
    }, 1000)
    return templates.login
  }

  return templates[template] || templates.login
}

export const LandingInt = ({ properties }) => {
  const { onClose, noBtnClose, typeDialog } = properties
  const { arcSite, contextPath } = useAppContext() || {}
  const { selectedTemplate, valTemplate } = useModalContext()
  const IMG = typeDialog === 'landing' ? 'bg_login' : 'bg_students'

  return (
    <Modal size="medium-large" position="middle">
      <div className="signwall-inside_body-container landing">
        {!noBtnClose && (
          <button
            type="button"
            className="signwall-inside_body-close"
            onClick={() => {
              Taggeo(
                `Web_Sign_Wall_${typeDialog}`,
                `web_sw${typeDialog[0]}_boton_cerrar`
              )
              onClose()
            }}>
            <Close />
          </button>
        )}
        <div
          className="signwall-inside_body-left landing"
          style={{
            background: `${arcSite === 'gestion' ? '#8f071f' : '#232323'}`,
          }}>
          <img
            src={`${getAssetsPath(
              arcSite,
              contextPath
            )}/resources/dist/${arcSite}/images/${IMG}.jpg?d=1`}
            alt={`Ejemplo de usuario suscriptor de ${arcSite}`}
            className="signwall-inside_body-left__bg"
          />
        </div>
        <div className="signwall-inside_body-right landing">
          {renderTemplate(selectedTemplate, valTemplate, {
            ...properties,
          })}
        </div>
      </div>
    </Modal>
  )
}

const Landing = (props) => (
  <ModalProvider>
    <LandingInt properties={props} />
  </ModalProvider>
)

export default Landing
