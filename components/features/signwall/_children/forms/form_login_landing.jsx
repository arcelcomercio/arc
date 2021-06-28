/* eslint-disable jsx-a11y/anchor-is-valid */
import sha256 from 'crypto-js/sha256'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { ModalConsumer } from '../../../subscriptions/_context/modal'
import { setCookie } from '../../../subscriptions/_dependencies/Cookies'
import getCodeError, {
  formatEmail,
  formatPass,
} from '../../../subscriptions/_dependencies/Errors'
import { Taggeo } from '../../../subscriptions/_dependencies/Taggeo'
import { isFbBrowser } from '../../../subscriptions/_dependencies/Utils'
import useForm from '../../../subscriptions/_hooks/useForm'
import {
  dataTreatment,
  getOriginAPI,
  PolicyPrivacy,
} from '../../_dependencies/domains'
import { CheckBox } from './control_checkbox'
import { Input } from './control_input_select'
import { AuthURL, ButtonSocial } from './control_social'
import { FormStudents } from './form_students'

export const FormLoginPaywall = ({ valTemplate, attributes }) => {
  const {
    arcSite,
    siteProperties: {
      signwall: { mainColorLink, authProviders = [] },
      activeNewsletter = false,
    },
  } = useAppContext() || {}

  const { typeDialog, onClose, onLogged, onLoggedFail } = attributes
  const { changeTemplate } = React.useContext(ModalConsumer)
  const [showError, setShowError] = React.useState(false)
  const [showLoading, setShowLoading] = React.useState(false)
  const [showStudents, setShowStudents] = React.useState(false)
  const [showVerify, setShowVerify] = React.useState()
  const [showSendEmail, setShowSendEmail] = React.useState(false)
  const [checkedPolits, setCheckedPolits] = React.useState(true)

  const stateSchema = {
    lemail: { value: valTemplate || '', error: '' },
    lpass: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    lemail: {
      required: true,
      validator: formatEmail(),
    },
    lpass: {
      required: true,
      validator: formatPass(),
      nospaces: true,
    },
  }

  const onSubmitForm = ({ lemail, lpass }) => {
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_login_boton_ingresar`
    )
    setShowLoading(true)
    window.Identity.options({ apiOrigin: getOriginAPI(arcSite) })
    window.Identity.login(lemail, lpass, {
      rememberMe: true,
      cookie: true,
    })
      .then(() => {
        window.Identity.options({ apiOrigin: getOriginAPI(arcSite) })
        window.Identity.getUserProfile().then((profile) => {
          if (!profile.emailVerified && profile.displayName === profile.email) {
            setShowError(getCodeError('130051'))
            setShowVerify(true)
            Taggeo(
              `Web_Sign_Wall_${typeDialog}`,
              `web_sw${typeDialog[0]}_login_show_reenviar_correo`
            )
            window.localStorage.removeItem('ArcId.USER_INFO')
            window.localStorage.removeItem('ArcId.USER_PROFILE')
            window.Identity.userProfile = null
            window.Identity.userIdentity = {}
          } else {
            setCookie('arc_e_id', sha256(profile.email).toString(), 365)
            onLogged(profile) // para hendrul
            setShowVerify(false)
            Taggeo(
              `Web_Sign_Wall_${typeDialog}`,
              `web_sw${typeDialog[0]}_login_success_ingresar`
            )
            if (typeDialog === 'students') {
              setShowStudents(!showStudents)
            } else {
              onClose()
            }
          }
        })
      })
      .catch((errLogin) => {
        setShowError(getCodeError(errLogin.code))
        setShowVerify(errLogin.code === '130051')
        onLoggedFail(errLogin) // para hendrul
        if (errLogin.code === '130051') {
          Taggeo(
            `Web_Sign_Wall_${typeDialog}`,
            `web_sw${typeDialog[0]}_login_show_reenviar_correo`
          )
        } else {
          Taggeo(
            `Web_Sign_Wall_${typeDialog}`,
            `web_sw${typeDialog[0]}_login_error_ingresar`
          )
        }
      })
      .finally(() => {
        setShowLoading(false)
      })
  }

  const isLogged = () => {
    if (typeof window !== 'undefined') {
      return (
        window.localStorage.getItem('ArcId.USER_INFO') &&
        window.localStorage.getItem('ArcId.USER_INFO') !== '{}'
      )
    }
    return false
  }

  const {
    values: { lemail, lpass },
    errors: { lemail: lemailError, lpass: lpassError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm)

  const sendVerifyEmail = () => {
    setShowSendEmail(true)
    window.Identity.requestVerifyEmail(lemail)
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_login_reenviar_correo`
    )
    let timeleft = 9
    const downloadTimer = setInterval(() => {
      if (timeleft <= 0) {
        clearInterval(downloadTimer)
        setShowSendEmail(false)
      } else {
        const divCount = document.getElementById('countdown')
        if (divCount) divCount.innerHTML = ` ${timeleft} `
      }
      timeleft -= 1
    }, 1000)
  }

  const triggerShowVerify = () => {
    setShowError(getCodeError('verifySocial'))
    setShowVerify(false)
  }

  const sizeBtnSocial = authProviders.length === 1 ? 'full' : 'middle'

  return (
    <>
      {(!isLogged() || showVerify) && (
        <>
          <form
            className="signwall-inside_forms-form"
            onSubmit={handleOnSubmit}>
            <p
              style={{
                fontSize: '14px',
              }}
              className="signwall-inside_forms-text mb-10 mt-20 center">
              Ingresa con tus redes sociales
            </p>

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
                showMsgVerify={() => triggerShowVerify()}
                dataTreatment={checkedPolits ? '1' : '0'}
              />
            ) : (
              <>
                {authProviders.map((item) => (
                  <ButtonSocial
                    key={item}
                    brand={item}
                    size={sizeBtnSocial}
                    onLogged={onLogged}
                    onClose={onClose}
                    typeDialog={typeDialog}
                    onStudents={() => setShowStudents(!showStudents)}
                    arcSite={arcSite}
                    typeForm="login"
                    activeNewsletter={activeNewsletter}
                    showMsgVerify={() => triggerShowVerify()}
                    dataTreatment={checkedPolits ? '1' : '0'}
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

            <p
              style={{
                fontSize: '14px',
              }}
              className="signwall-inside_forms-text mt-20 center">
              Ingresa con tu usuario
            </p>

            {showError && (
              <div
                className={`signwall-inside_forms-error ${
                  showVerify ? 'warning' : ''
                }`}>
                {` ${showError} `}
                {showVerify && (
                  <>
                    {!showSendEmail ? (
                      <button
                        type="button"
                        className="link"
                        onClick={sendVerifyEmail}>
                        Reenviar correo de activación
                      </button>
                    ) : (
                      <span>
                        Podrás reenviar nuevamente dentro de
                        <strong id="countdown"> 10 </strong> segundos
                      </span>
                    )}
                  </>
                )}
              </div>
            )}

            <Input
              type="email"
              inputMode="email"
              autoComplete="email"
              name="lemail"
              placeholder="Correo electrónico"
              clase="mb-10"
              required
              value={lemail}
              onChange={(e) => {
                handleOnChange(e)
                setShowError(false)
                setShowVerify(false)
              }}
              error={lemailError}
            />

            <Input
              type="password"
              autoComplete="current-password"
              name="lpass"
              placeholder="Contraseña"
              required
              value={lpass}
              onChange={(e) => {
                handleOnChange(e)
                setShowError(false)
                setShowVerify(false)
              }}
              error={lpassError}
            />

            <a
              href="#"
              className="signwall-inside_forms-link mt-10 mb-20 inline f-right text-sm"
              style={{ color: 'gray' }}
              onClick={(e) => {
                e.preventDefault()
                Taggeo(
                  `Web_Sign_Wall_${typeDialog}`,
                  `web_sw${typeDialog[0]}_contrasena_link_olvide`
                )
                changeTemplate('forgot')
              }}>
              Olvidé mi contraseña
            </a>

            <button
              type="submit"
              className="signwall-inside_forms-btn"
              disabled={disable || showLoading}>
              {showLoading ? 'CARGANDO...' : 'INICIA SESIÓN'}
            </button>

            <p
              style={{
                color: '#000000',
                fontSize: '12px',
              }}
              className="signwall-inside_forms-text mt-20 mb-10 center">
              ¿Aún no tienes una cuenta?
              <a
                href="#"
                className="signwall-inside_forms-link ml-10"
                style={{ color: mainColorLink, fontWeight: 'bold' }}
                onClick={(e) => {
                  e.preventDefault()
                  Taggeo(
                    `Web_Sign_Wall_${typeDialog}`,
                    `web_sw${typeDialog[0]}_login_boton_registrate`
                  )
                  changeTemplate('register')
                }}>
                Regístrate
              </a>
            </p>
          </form>

          {arcSite === 'elcomercio' || arcSite === 'gestion' ? (
            <form className="signwall-inside_forms-form">
              <CheckBox
                checked={checkedPolits}
                value={checkedPolits ? '1' : '0'}
                name="rpolit"
                onChange={() => {
                  setCheckedPolits(!checkedPolits)
                }}>
                <p
                  style={{
                    lineHieght: '18px',
                    fontSize: '12px',
                  }}
                  className="signwall-inside_forms-text mt-10">
                  Al ingresar por redes sociales autorizo el uso de mis datos
                  para
                  <a
                    href={dataTreatment}
                    target="_blank"
                    rel="noreferrer"
                    className="signwall-inside_forms-link ml-5 inline"
                    style={{ fontWeight: 'bold', color: mainColorLink }}>
                    fines adicionales
                  </a>
                </p>
              </CheckBox>

              <p
                className="signwall-inside_forms-text mt-10 mb-10"
                style={{
                  textAlign: 'justify',
                  color: '#818181',
                  fontSize: '11px',
                }}>
                En caso hayas autorizado los fines de uso adicionales
                anteriormente, no es necesario que lo vuelvas a marcar. Si
                deseas retirar dicho consentimiento, revisa el procedimiento en
                nuestras
                <a
                  href={PolicyPrivacy(arcSite)}
                  rel="noreferrer"
                  target="_blank"
                  className="signwall-inside_forms-link ml-5 inline"
                  style={{ color: mainColorLink, fontWeight: 'bold' }}>
                  Políticas de Privacidad.
                </a>
              </p>
            </form>
          ) : (
            <p
              style={{
                color: '#818181',
                fontSize: '10px',
              }}
              className="signwall-inside_forms-text mt-10 center">
              CON TUS DATOS, MEJORAREMOS TU EXPERIENCIA DE <br /> NAVEGACIÓN Y
              NUNCA PUBLICAREMOS SIN TU PERMISO
            </p>
          )}
        </>
      )}

      {(showStudents || isLogged()) &&
        typeDialog === 'students' &&
        !showVerify && <FormStudents arcSite={arcSite} />}
    </>
  )
}
