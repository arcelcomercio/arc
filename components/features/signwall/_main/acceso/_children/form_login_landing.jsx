/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import * as S from './styles'
import { ButtonSocial } from './control_social'
import { ModalConsumer } from '../../signwall/context'
import { Input } from './control_input'
import useForm from './useForm'
import getCodeError from './codes_error'
import { FormStudents } from './form_students'
import Domains from '../../utils/domains'

const API_ORIGIN = 'https://api-sandbox.gestion.pe'

// eslint-disable-next-line import/prefer-default-export
export const FormLoginPaywall = props => {
  
  const { typeDialog, onClose, onLogged, onLoggedFail, arcSite } = props
  const [showError, setShowError] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [showStudents, setShowStudents] = useState(false)

  const stateSchema = {
    lemail: { value: '', error: '' },
    lpass: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    lemail: {
      required: true,
      validator: {
        func: value =>
          /^[a-zA-Z0-9]{1}[a-zA-Z0-9._-]+@[a-zA-Z0-9-]{2,}(?:\.[a-zA-Z0-9-]{2,})+$/.test(
            value
          ),
        error: 'Correo Electrónico Inválido',
      },
    },
    lpass: {
      required: true,
      validator: {
        func: value => value.length >= 8,
        error: 'Mínimo 8 caracteres',
      },
    },
  }

  const handleGetProfile = () => {
    // const { closePopup, reloadLogin } = this.props
    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
    window.Identity.getUserProfile().then(resProfile => {
      if (typeDialog === 'students') {
        setShowStudents(!showStudents)
      } else {
        onLogged(resProfile) // para hendrul
        onClose()
      }

      // Cookies.setCookie('arc_e_id', sha256(resProfile.email), 365)

      // if (reloadLogin) {
      //   window.location.reload()
      // } else {
      //   closePopup()
      // }
    })
  }

  const onSubmitForm = state => {
    const { lemail, lpass } = state
    setShowLoading(true)
    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
    window.Identity.login(lemail, lpass, {
      rememberMe: true,
      cookie: true,
    })
      .then(() => {
        handleGetProfile()
      })
      .catch(errLogin => {
        setShowError(getCodeError(errLogin.code))
        onLoggedFail(errLogin) // para hendrul
      })
      .finally(() => {
        setShowLoading(false)
      })
  }

  const isLogged = () => {
    return (
      window.localStorage.hasOwnProperty('ArcId.USER_INFO') &&
      window.localStorage.getItem('ArcId.USER_INFO') !== '{}'
    )
  }

  const { values, errors, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    stateValidatorSchema,
    onSubmitForm
  )

  const { lemail, lpass } = values

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <ModalConsumer>
      {value => (
        <>
          {!isLogged() && (
            <S.Form onSubmit={handleOnSubmit}>
              <S.Text c="gray" s="14" className="mb-10 center">
                Ingresa con tus redes sociales
              </S.Text>

              <ButtonSocial
                brand="facebook"
                size="middle"
                onLogged={onLogged}
                onClose={onClose}
                typeDialog={typeDialog}
                onStudents={() => setShowStudents(!showStudents)}
                // onCloseLogged={
                //   typeDialog === 'students'
                //     ? setShowStudents(!showStudents)
                //     : onClose
                // }
              />
              <ButtonSocial brand="google" size="middle" />

              <S.Text c="gray" s="14" className="mt-20 center">
                Ingresa con tu usuario
              </S.Text>

              {showError && <S.Error>{showError}</S.Error>}

              <Input
                type="email"
                name="lemail"
                placeholder="Correo electrónico"
                autocomplete="on"
                clase="mb-10"
                required
                value={lemail}
                onChange={e => {
                  handleOnChange(e)
                  setShowError(false)
                }}
                error={errors.lemail}
              />

              <Input
                type="password"
                name="lpass"
                placeholder="Contraseña"
                autocomplete="off"
                required
                value={lpass}
                onChange={e => {
                  handleOnChange(e)
                  setShowError(false)
                }}
                error={errors.lpass}
              />

              <S.Link
                c="light"
                className="mt-10 mb-20 inline f-right text-sm"
                onClick={() => value.changeTemplate('forgot')}>
                Olvidé mi contraseña
              </S.Link>

              <S.Button type="submit" disabled={disable || showLoading}>
                {showLoading ? 'CARGANDO...' : 'INICIA SESIÓN'}
              </S.Button>

              <S.Text c="black" s="12" className="mt-20 mb-10 center">
                ¿Aún no tienes una cuenta?
                <S.Link
                  c="blue"
                  fw="bold"
                  className="ml-10"
                  onClick={() => value.changeTemplate('register')}>
                  Regístrate
                </S.Link>
              </S.Text>

              <S.Text c="light" s="10" className="mt-10 center">
                CON TUS DATOS, MEJORAREMOS TU EXPERIENCIA DE <br /> NAVEGACIÓN Y
                NUNCA PUBLICAREMOS SIN TU PERMISO
              </S.Text>
            </S.Form>
          )}

          {(showStudents || isLogged()) && typeDialog === 'students' && (
            <FormStudents />
          )}
        </>
      )}
    </ModalConsumer>
  )
}
