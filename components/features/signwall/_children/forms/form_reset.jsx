import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { ModalConsumer } from '../../../subscriptions/_context/modal'
import getCodeError from '../../../subscriptions/_dependencies/Errors'
import { Taggeo } from '../../../subscriptions/_dependencies/Taggeo'
import useForm from '../../../subscriptions/_hooks/useForm'
import { getOriginAPI } from '../../_dependencies/domains'
import { MsgResetPass, ResetPass } from '../iconos'
import { Input } from './control_input_select'
import * as S from './styles'

const FormReset = ({ onClose, tokenReset, typeDialog }) => {
  const {
    arcSite,
    siteProperties: {
      signwall: { mainColorBr, mainColorBtn, primaryFont },
    },
  } = useAppContext() || {}

  const { changeTemplate } = React.useContext(ModalConsumer)
  const [showConfirm, setShowConfirm] = React.useState(false)
  const [showError, setShowError] = React.useState(false)
  const [showLoading, setShowLoading] = React.useState(false)
  const [showBtnContinue, setShowBtnContinue] = React.useState(false)
  const [showFormatInvalidOne, setShowFormatInvalidOne] = React.useState('')
  const [showFormatInvalidTwo, setShowFormatInvalidTwo] = React.useState('')

  React.useEffect(() => {
    if (window.Identity.userProfile || window.Identity.userIdentity.uuid) {
      setShowBtnContinue(true)
    }
  }, [])

  const stateSchema = {
    rpass: { value: '', error: '' },
    rconfirmpass: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    rpass: {
      required: true,
      validator: {
        func: (value) => value.length >= 8,
        error: 'Mínimo 8 caracteres',
      },
      nospaces: true,
    },
    rconfirmpass: {
      required: true,
      validator: {
        func: (value) => value.length >= 8,
        error: 'Mínimo 8 caracteres',
      },
      nospaces: true,
    },
  }

  const onSubmitForm = ({ rpass }) => {
    setShowLoading(true)
    window.Identity.options({ apiOrigin: getOriginAPI(arcSite) })
    window.Identity.resetPassword(tokenReset, rpass)
      .then(() => {
        setShowConfirm(true)
        Taggeo(
          `Web_Sign_Wall_${typeDialog}`,
          `web_sw${typeDialog[0]}_aceptar_success`
        )
      })
      .catch((errLogin) => {
        setShowError(getCodeError(errLogin.code))
        Taggeo(
          `Web_Sign_Wall_${typeDialog}`,
          `web_sw${typeDialog[0]}_aceptar_error`
        )
      })
      .finally(() => {
        setShowLoading(false)
      })
  }

  const {
    values: { rpass, rconfirmpass },
    errors: { rpass: rpassError, rconfirmpass: rconfirmpassError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm)

  const checkFormatOne = (e) => {
    if (e.target.value.indexOf(' ') >= 0) {
      setShowFormatInvalidOne('No se permite espacios')
    } else if (rconfirmpass.length > 1 && rconfirmpass !== e.target.value) {
      setShowFormatInvalidOne('Las contraseñas no coinciden.')
    } else {
      setShowFormatInvalidOne('')
    }
  }

  const checkFormatTwo = (e) => {
    if (e.target.value.indexOf(' ') >= 0) {
      setShowFormatInvalidTwo('No se permite espacios.')
    } else if (rpass.length > 1 && rpass !== e.target.value) {
      setShowFormatInvalidTwo('Las contraseñas no coinciden.')
    } else {
      setShowFormatInvalidTwo('')
    }
  }

  return (
    <S.Form onSubmit={handleOnSubmit}>
      {!showConfirm ? (
        <>
          <div className="center block mb-20">
            <ResetPass bgcolor={mainColorBr} />
          </div>
          <S.Title s="20" primaryFont={primaryFont} className="center mb-10">
            Cambiar contraseña
          </S.Title>
          <S.Text c="gray" s="14" lh="28" className="mt-10 mb-10 center">
            Ingresa una nueva contraseña para tu cuenta
          </S.Text>

          {showError && <S.Error>{showError}</S.Error>}

          <Input
            type="password"
            autoComplete="new-password"
            name="rpass"
            placeholder="Nueva contraseña"
            required
            value={rpass}
            onChange={(e) => {
              handleOnChange(e)
              setShowError(false)
              checkFormatOne(e)
            }}
            error={rpassError || showFormatInvalidOne}
          />

          <Input
            type="password"
            autoComplete="off"
            name="rconfirmpass"
            placeholder="Confirmar contraseña"
            required
            value={rconfirmpass}
            onChange={(e) => {
              handleOnChange(e)
              setShowError(false)
              checkFormatTwo(e)
            }}
            error={rconfirmpassError || showFormatInvalidTwo}
          />

          <S.Button
            color={mainColorBtn}
            type="submit"
            className="mt-20"
            disabled={
              disable ||
              showLoading ||
              showFormatInvalidOne ||
              showFormatInvalidTwo
            }>
            {showLoading ? 'CAMBIANDO...' : 'ACEPTAR'}
          </S.Button>
        </>
      ) : (
        <>
          <div className="center block mb-20">
            <MsgResetPass bgcolor={mainColorBr} />
          </div>

          <S.Title s="20" className="center mb-20 ">
            Tu contraseña ha sido actualizada
          </S.Title>

          {showBtnContinue ? (
            <S.Button
              type="button"
              color={mainColorBtn}
              onClick={() => {
                Taggeo(
                  `Web_Sign_Wall_${typeDialog}`,
                  `web_sw${typeDialog[0]}_continuar_boton`
                )
                onClose()
              }}>
              CONTINUAR NAVEGANDO
            </S.Button>
          ) : (
            <S.Button
              type="button"
              color={mainColorBtn}
              onClick={() => {
                Taggeo(
                  `Web_Sign_Wall_${typeDialog}`,
                  `web_sw${typeDialog[0]}_continuar_boton`
                )
                changeTemplate('login')
              }}>
              CONTINUAR
            </S.Button>
          )}
        </>
      )}
    </S.Form>
  )
}

export default FormReset
