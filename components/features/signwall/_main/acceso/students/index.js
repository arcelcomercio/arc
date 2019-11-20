import React from 'react'

import { ModalProvider, ModalConsumer } from '../../signwall/context'
import { Modal } from '../../common/modal'
import { FormStudents } from '../_children/form_students'
import { FormLoginPaywall } from '../_children/form_login_landing'
import { FormForgot } from '../_children/form_forgot'
import { FormRegister } from '../_children/form_register'
import { ContMiddle, FirstMiddle, SecondMiddle, Close } from './styles'

const renderTemplate = template => {
  const templates = {
    // eslint-disable-next-line react/jsx-filename-extension
    login: <FormLoginPaywall />,
    students: <FormStudents />,
    forgot: <FormForgot />,
    register: <FormRegister />,
  }
  return templates[template] || templates.login
}

// eslint-disable-next-line import/prefer-default-export
export const Students = props => {
  const { close } = props
  return (
    <ModalProvider>
      <ModalConsumer>
        {value => (
          <Modal size="medium" position="middle">
            <ContMiddle>
              <FirstMiddle />
              <SecondMiddle>
                <Close type="button" onClick={() => close()}>
                  x
                </Close>
                {renderTemplate(value.selectedTemplate)}
              </SecondMiddle>
            </ContMiddle>
          </Modal>
        )}
      </ModalConsumer>
    </ModalProvider>
  )
}
