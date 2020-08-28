/* eslint-disable import/prefer-default-export */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { sha256 } from 'js-sha256'
import * as S from './styles'
import { ButtonSocial, AuthURL } from './control_social'
import { ModalConsumer } from '../context'
import { FormStudents } from './form_students'
import { Input } from './control_input_select'
import useForm from '../../_dependencies/useForm'
import getCodeError from '../../_dependencies/codes_error'
import Domains from '../../_dependencies/domains'
import Cookies from '../../_dependencies/cookies'
import Taggeo from '../../_dependencies/taggeo'

export const FormLoginPaywall = props => {
  const {
    typeDialog,
    onClose,
    onLogged,
    onLoggedFail,
    arcSite,
    siteProperties: {
      signwall: { mainColorLink, authProviders = [] },
      activeNewsletter = false,
    },
  } = props

  const [showError, setShowError] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [showStudents, setShowStudents] = useState(false)

  const isFbBrowser =
    typeof window !== 'undefined' &&
    (window.navigator.userAgent.indexOf('FBAN') > -1 ||
      window.navigator.userAgent.indexOf('FBAV') > -1)

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
    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
    window.Identity.getUserProfile().then(profile => {
      Cookies.setCookie('arc_e_id', sha256(profile.email), 365)
      onLogged(profile) // para hendrul
      Taggeo(
        `Web_Sign_Wall_${typeDialog}`,
        `web_sw${typeDialog[0]}_login_success_ingresar`
      )
      if (typeDialog === 'students') {
        setShowStudents(!showStudents)
      } else {
        onClose()
      }
    })
  }

  const onSubmitForm = state => {
    const { lemail, lpass } = state
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_login_boton_ingresar`
    )
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
        Cookies.setCookie('lostEmail', lemail, 1)
        Taggeo(
          `Web_Sign_Wall_${typeDialog}`,
          `web_sw${typeDialog[0]}_login_error_ingresar`
        )
      })
      .finally(() => {
        setShowLoading(false)
      })
  }

  const isLogged = () => {
    if (typeof window !== 'undefined') {
      return (
        // eslint-disable-next-line no-prototype-builtins
        window.localStorage.hasOwnProperty('ArcId.USER_INFO') &&
        window.localStorage.getItem('ArcId.USER_INFO') !== '{}'
      )
    }
    return false
  }

  const { values, errors, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    stateValidatorSchema,
    onSubmitForm
  )

  const { lemail, lpass } = values

  const sizeBtnSocial = authProviders.length === 1 ? 'full' : 'middle'

  return (
    <ModalConsumer>
      {value => (
        <>
          {!isLogged() && (
            <S.Form onSubmit={handleOnSubmit}>
              <S.Text c="gray" s="14" className="mb-10 mt-20 center">
                Ingresa con tus redes sociales
              </S.Text>

              {isFbBrowser ? (
                <ButtonSocial
                  brand="facebook"
                  size="full"
                  onLogged={onLogged}
                  onClose={onClose}
                  typeDialog={typeDialog}
                  onStudents={() => setShowStudents(!showStudents)}
                  arcSite={arcSite}
                  typeForm="login"
                  activeNewsletter={activeNewsletter}
                />
              ) : (
                <>
                  {authProviders.map(item => (
                    <ButtonSocial
                      brand={item}
                      size={sizeBtnSocial}
                      onLogged={onLogged}
                      onClose={onClose}
                      typeDialog={typeDialog}
                      onStudents={() => setShowStudents(!showStudents)}
                      arcSite={arcSite}
                      typeForm="login"
                      activeNewsletter={activeNewsletter}
                    />
                  ))}
                </>
              )}

              <AuthURL
                arcSite={arcSite}
                onClose={onClose}
                typeDialog={typeDialog}
                activeNewsletter={activeNewsletter}
                typeForm="login"
                onLogged={onLogged}
              />

              <S.Text c="gray" s="14" className="mt-20 center">
                Ingresa con tu usuario
              </S.Text>

              {showError && <S.Error>{showError}</S.Error>}

              <Input
                type="email"
                name="lemail"
                placeholder="Correo electrónico"
                autoComplete="on"
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
                autoComplete="off"
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

              <S.Button type="submit" disabled={disable || showLoading}>
                {showLoading ? 'CARGANDO...' : 'INICIA SESIÓN'}
              </S.Button>

              <S.Text c="black" s="12" className="mt-20 mb-10 center">
                ¿Aún no tienes una cuenta?
                <S.Link
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

          {(showStudents || isLogged()) && typeDialog === 'students' && (
            <FormStudents {...props} />
          )}
        </>
      )}
    </ModalConsumer>
  )
}
