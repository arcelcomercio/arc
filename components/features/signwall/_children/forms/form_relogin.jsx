/* eslint-disable import/prefer-default-export */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { sha256 } from 'js-sha256'
import * as S from './styles'
import { ButtonSocial } from './control_social'
import { ModalConsumer } from '../context'
import { Input } from './control_input_select'
import useForm from '../../_dependencies/useForm'
import getCodeError from '../../_dependencies/codes_error'
import Domains from '../../_dependencies/domains'
import Cookies from '../../_dependencies/cookies'
import Services from '../../_dependencies/services'
import Taggeo from '../../_dependencies/taggeo'

export const FormRelogin = ({
  arcSite,
  siteProperties: {
    signwall: { mainColorLink, mainColorBtn, authProviders = [] },
    activeNewsletter = false,
  },
  onClose,
  typeDialog,
}) => {
  const [showError, setShowError] = useState(false)
  const [showLoading, setShowLoading] = useState(false)

  const stateSchema = {
    remail: { value: '', error: '' },
    rpass: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    remail: {
      required: true,
      validator: {
        func: value =>
          /^[a-zA-Z0-9]{1}[a-zA-Z0-9._-]+@[a-zA-Z0-9-]{2,}(?:\.[a-zA-Z0-9-]{2,})+$/.test(
            value
          ),
        error: 'Correo Electrónico Inválido',
      },
    },
    rpass: {
      required: true,
      validator: {
        func: value => value.length >= 8,
        error: 'Mínimo 8 caracteres',
      },
    },
  }

  const taggeoSuccess = () => {
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_email_login_success`
    )
  }

  const taggeoError = () => {
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_email_login_error`
    )
  }

  const handleGetProfile = () => {
    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
    window.Identity.getUserProfile().then(profile => {
      Cookies.setCookie('arc_e_id', sha256(profile.email), 365)
      onClose()
    })
  }

  const pushStateRelogin = (email, password) => {
    setShowLoading(true)
    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
    window.Identity.login(email, password, {
      rememberMe: true,
      cookie: true,
    })
      .then(() => {
        handleGetProfile()
        taggeoSuccess()
      })
      .catch(errReLogin => {
        setShowError(getCodeError(errReLogin.code))
        taggeoError()
      })
      .finally(() => {
        setShowLoading(false)
      })
  }

  const sendEmailPass = (email, password) => {
    setShowLoading(true)
    Services.reloginEcoID(
      email,
      password,
      typeDialog === 'relogin' ? 'relogin' : 'reloginemail',
      arcSite,
      window
    )
      .then(resEco => {
        if (resEco.retry) {
          setTimeout(() => {
            pushStateRelogin(email, password)
          }, 1000)
        } else {
          setShowError(getCodeError('300040'))
          taggeoError()
        }
      })
      .catch(() => {
        setShowError(getCodeError('000000'))
        taggeoError()
      })
      .finally(() => {
        setShowLoading(false)
      })
  }

  const onSubmitForm = state => {
    const { remail, rpass } = state
    setShowLoading(true)
    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
    window.Identity.login(remail, rpass, {
      rememberMe: true,
      cookie: true,
    })
      .then(() => {
        handleGetProfile()
        Taggeo(
          `Web_Sign_Wall_${typeDialog}`,
          `web_sw${typeDialog[0]}_email_login_success_ingresar`
        )
      })
      .catch(errLogin => {
        if (errLogin.code === '300040' || errLogin.code === '300037') {
          sendEmailPass(remail, rpass)
        } else {
          setShowError(getCodeError(errLogin.code))
          taggeoError()
        }
      })
      .finally(() => {
        setShowLoading(false)
      })
  }

  const { values, errors, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    stateValidatorSchema,
    onSubmitForm
  )

  const { remail, rpass } = values

  return (
    <ModalConsumer>
      {value => (
        <S.Form onSubmit={handleOnSubmit}>
          <S.Text c="black" s="18" className="center">
            Ingresa con
          </S.Text>

          {showError && <S.Error>{showError}</S.Error>}

          <Input
            type="email"
            name="remail"
            placeholder="Correo electrónico"
            autoComplete="on"
            required
            value={remail}
            onChange={e => {
              handleOnChange(e)
              setShowError(false)
            }}
            error={errors.remail}
          />

          <Input
            type="password"
            name="rpass"
            placeholder="Contraseña"
            autoComplete="off"
            required
            value={rpass}
            onChange={e => {
              handleOnChange(e)
              setShowError(false)
            }}
            error={errors.rpass}
          />

          <S.Link
            href="#"
            c="light"
            className="mt-10 mb-20 inline f-right text-sm"
            onClick={e => {
              e.preventDefault()
              Taggeo(
                `Web_Sign_Wall_${typeDialog}`,
                `web_sw${typeDialog[0]}_contrasena_link_olvide`
              )
              value.changeTemplate('forgot')
            }}>
            Olvidé mi contraseña
          </S.Link>

          <S.Button
            type="submit"
            color={mainColorBtn}
            disabled={disable || showLoading}
            onClick={() =>
              Taggeo(
                `Web_Sign_Wall_${typeDialog}`,
                `web_sw${typeDialog[0]}_email_login_boton`
              )
            }>
            {showLoading ? 'CARGANDO...' : 'INICIA SESIÓN'}
          </S.Button>

          <S.Text c="gray" s="14" className="mt-20 mb-10 center">
            ó ingresa con tu cuenta de:
          </S.Text>

          {authProviders.map(item => (
            <ButtonSocial
              brand={item}
              size={item === 'google' ? 'middle' : 'full'}
              onClose={onClose}
              typeDialog={typeDialog}
              arcSite={arcSite}
              typeForm="relogin"
              activeNewsletter={activeNewsletter}
            />
          ))}

          <S.Text c="black" s="12" className="mt-20 mb-10 center">
            ¿Aún no tienes una cuenta?
            <S.Link
              href="#"
              c={mainColorLink}
              fw="bold"
              className="ml-10"
              onClick={e => {
                e.preventDefault()
                Taggeo(
                  `Web_Sign_Wall_${typeDialog}`,
                  `web_sw${typeDialog[0]}_login_boton_registrate`
                )
                value.changeTemplate('register')
              }}>
              Regístrate
            </S.Link>
          </S.Text>

          <S.Text c="light" s="10" className="mt-10 center">
            CON TUS DATOS, MEJORAREMOS TU EXPERIENCIA DE <br /> NAVEGACIÓN Y
            NUNCA PUBLICAREMOS SIN TU PERMISO
          </S.Text>
        </S.Form>
      )}
    </ModalConsumer>
  )
}
