/* eslint-disable jsx-a11y/anchor-is-valid */
import sha256 from 'crypto-js/sha256'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { ModalConsumer } from '../../../subscriptions/_context/modal'
import {
  setCookie,
  setCookieDomain,
} from '../../../subscriptions/_dependencies/Cookies'
import getCodeError, {
  formatEmail,
  formatPass,
} from '../../../subscriptions/_dependencies/Errors'
import { Taggeo } from '../../../subscriptions/_dependencies/Taggeo'
import useForm from '../../../subscriptions/_hooks/useForm'
import {
  dataTreatment,
  getOriginAPI,
  getUrlPaywall,
  PolicyPrivacy,
} from '../../_dependencies/domains'
import { getEntitlement } from '../../_dependencies/services'
import { MsgRegister } from '../icons'
import Loading from '../loading'
import { CheckBox } from './control_checkbox'
import { Input } from './control_input_select'
import { AuthURL, ButtonEmail, ButtonSocial } from './control_social'

const FormLogin = ({ valTemplate, attributes }) => {
  const {
    arcSite,
    siteProperties: {
      signwall: {
        mainColorLink,
        mainColorBtn,
        primaryFont,
        mainColorBr,
        authProviders = [],
      },
      activeNewsletter = false,
      activeVerifyEmail = false,
      activePaywall,
    },
  } = useAppContext() || {}

  const {
    typeDialog,
    onClose,
    removeBefore = (i) => i,
    onLogged = (i) => i,
  } = attributes

  const { changeTemplate } = React.useContext(ModalConsumer)
  const [showLoginEmail, setShowLoginEmail] = React.useState(
    valTemplate || arcSite === 'trome'
  )
  const [showError, setShowError] = React.useState(false)
  const [showLoading, setShowLoading] = React.useState(false)
  const [showUserWithSubs, setShowUserWithSubs] = React.useState(false)
  const [showCheckPremium, setShowCheckPremium] = React.useState(false)
  const [showLoadingPremium, setShowLoadingPremium] = React.useState(true)
  const [showFormatInvalid, setShowFormatInvalid] = React.useState('')
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

  const taggeoSuccess = () => {
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_login_success_ingresar`
    )
  }

  const taggeoError = () => {
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_login_error_ingresar`
    )
  }

  const getListSubs = () =>
    window.Identity.extendSession().then((resExt) => {
      const checkEntitlement = getEntitlement(resExt.accessToken, arcSite)
        .then((res) => {
          if (res.skus) {
            const result = Object.keys(res.skus).map((key) => res.skus[key].sku)
            return result
          }
          return []
        })
        .catch((err) => window.console.error(err))

      return checkEntitlement
    })

  const handleSuscription = () => {
    if (typeDialog === 'premium') {
      window.sessionStorage.setItem(
        'paywall_last_url',
        window.location.pathname ? window.location.pathname : ''
      )
    } else {
      window.sessionStorage.setItem(
        'paywall_last_url',
        window.document.referrer
          ? window.document.referrer.split(window.location.origin)[1]
          : ''
      )
    }

    removeBefore() // dismount before
    window.location.href = getUrlPaywall(arcSite)
    window.sessionStorage.setItem('paywall_type_modal', typeDialog)
  }

  const checkUserSubs = () => {
    window.Identity.options({ apiOrigin: getOriginAPI(arcSite) })

    if (typeDialog === 'premium' || typeDialog === 'paywall') {
      setShowCheckPremium(true) // no tengo subs

      getListSubs().then((p) => {
        if (p && p.length === 0) {
          setShowUserWithSubs(false) // no tengo subs
          setShowLoadingPremium(false)
        } else {
          setShowUserWithSubs(true) // tengo subs
          setShowLoadingPremium(false)
          const divPremium = document.getElementById('container')
          if (divPremium) {
            divPremium.classList.remove('story-content__nota-premium')
            divPremium.removeAttribute('style')
          }
        }
      })
    }
  }

  const handleGetProfile = (profile) => {
    setShowLoading(true)
    setCookie('arc_e_id', sha256(profile.email).toString(), 365)
    const USER_IDENTITY = JSON.stringify(window.Identity.userIdentity || {})
    setCookieDomain('ArcId.USER_INFO', USER_IDENTITY, 1, arcSite)

    if (typeDialog === 'premium' || typeDialog === 'paywall') {
      setShowCheckPremium(true) // no tengo subs

      getListSubs().then((p) => {
        if (p && p.length === 0) {
          setShowUserWithSubs(false) // no tengo subs
          setShowLoadingPremium(false)
        } else {
          setShowUserWithSubs(true) // tengo subs
          setShowLoadingPremium(false)
          const divPremium = document.getElementById('container')
          if (divPremium) {
            divPremium.classList.remove('story-content__nota-premium')
            divPremium.removeAttribute('style')
          }
        }
      })
    } else {
      const btnSignwall = document.getElementById('signwall-nav-btn')
      if (typeDialog === 'newsletter' && btnSignwall) {
        btnSignwall.textContent = `${profile.firstName || 'Bienvenido'} ${
          profile.lastName || ''
        }`
      }
      onClose()
    }
    setShowLoading(false)
  }

  const onSubmitForm = ({ lemail, lpass }) => {
    setShowLoading(true)
    window.Identity.options({ apiOrigin: getOriginAPI(arcSite) })
    window.Identity.login(lemail, lpass, {
      rememberMe: true,
      cookie: true,
    })
      .then(() => {
        window.Identity.options({ apiOrigin: getOriginAPI(arcSite) })
        window.Identity.getUserProfile().then((resProfile) => {
          if (
            activeVerifyEmail &&
            !resProfile.emailVerified &&
            resProfile.displayName === resProfile.email
          ) {
            setShowLoading(false)
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
            handleGetProfile(resProfile)
            taggeoSuccess()
            onLogged()
          }
        })
      })
      .catch((errLogin) => {
        setShowLoading(false)
        setShowError(getCodeError(errLogin.code))
        setShowVerify(errLogin.code === '130051')
        if (errLogin.code === '130051') {
          Taggeo(
            `Web_Sign_Wall_${typeDialog}`,
            `web_sw${typeDialog[0]}_login_show_reenviar_correo`
          )
        } else {
          taggeoError()
        }
      })
  }

  const checkFormat = (e) => {
    if (e.target.value.indexOf(' ') >= 0) {
      setShowFormatInvalid('No se permite espacios')
    } else {
      setShowFormatInvalid('')
    }
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
    setShowLoginEmail(true)
    setShowError(getCodeError('verifySocial'))
    setShowVerify(false)
  }

  return (
    <>
      {!showCheckPremium ? (
        <>
          <form
            className={`signwall-inside_forms-form ${typeDialog}`}
            onSubmit={handleOnSubmit}>
            {activePaywall && typeDialog !== 'premium' && !showLoginEmail && (
              <h4
                style={{ fontSize: '22px', fontFamily: primaryFont }}
                className="signwall-inside_forms-title center mb-20 mt-20 only-mobile-tablet">
                Regístrate y mantente siempre informado con las noticias más
                relevantes del Perú y el mundo
              </h4>
            )}

            <p
              style={{
                fontSize: '18px',
              }}
              className="signwall-inside_forms-text mb-10 mt-10 center">
              Ingresa con
            </p>

            {authProviders.map((item) => (
              <ButtonSocial
                key={item}
                brand={item}
                size="middle"
                c="mb-10"
                onClose={onClose}
                typeDialog={typeDialog}
                arcSite={arcSite}
                typeForm="login"
                activeNewsletter={activeNewsletter}
                checkUserSubs={checkUserSubs}
                onLogged={onLogged}
                showMsgVerify={() => triggerShowVerify()}
                dataTreatment={checkedPolits ? '1' : '0'}
              />
            ))}

            <AuthURL
              arcSite={arcSite}
              onClose={onClose}
              typeDialog={typeDialog}
              activeNewsletter={activeNewsletter}
              typeForm="login"
              onLogged={onLogged}
              checkUserSubs={checkUserSubs}
            />

            {!showLoginEmail && (
              <ButtonEmail
                size="full"
                onClick={() => {
                  Taggeo(
                    `Web_Sign_Wall_${typeDialog}`,
                    `web_sw${typeDialog[0]}_open_login_boton_ingresar`
                  )
                  setShowLoginEmail(!showLoginEmail)
                }}
              />
            )}

            {showLoginEmail && (
              <>
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
                  required
                  value={lemail}
                  onChange={(e) => {
                    handleOnChange(e)
                    setShowError(false)
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
                    checkFormat(e)
                  }}
                  error={lpassError || showFormatInvalid}
                />

                <a
                  href="#"
                  style={{
                    color: 'gray',
                  }}
                  className="signwall-inside_forms-link mt-10 mb-20 inline f-right text-sm"
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
                  style={{ color: mainColorBtn, background: mainColorLink }}
                  disabled={disable || showLoading || showFormatInvalid}
                  onClick={() =>
                    Taggeo(
                      `Web_Sign_Wall_${typeDialog}`,
                      `web_sw${typeDialog[0]}_login_boton_ingresar`
                    )
                  }>
                  {showLoading ? 'CARGANDO...' : 'INICIA SESIÓN'}
                </button>
              </>
            )}

            <p
              style={{
                fontSize: '12px',
                color: '#000000',
              }}
              className="signwall-inside_forms-text mt-10 mb-20 center">
              ¿Aún no tienes una cuenta?
              <a
                href="#"
                style={{ color: mainColorLink, fontWeight: 'bold' }}
                className="signwall-inside_forms-link ml-10"
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

            {arcSite === 'elcomercio' ||
            arcSite === 'gestion' ||
            arcSite === 'trome' ? (
              <>
                <CheckBox
                  checked={checkedPolits}
                  value={checkedPolits ? '1' : '0'}
                  name="rpolit"
                  arcSite={arcSite}
                  onChange={() => {
                    setCheckedPolits(!checkedPolits)
                  }}>
                  <p
                    style={{
                      fontSize: '12px',
                      lineHeight: '18px',
                    }}
                    className="signwall-inside_forms-text mt-10">
                    Al ingresar por redes sociales autorizo el uso de mis datos
                    para
                    <a
                      href={dataTreatment}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: mainColorLink, fontWeight: 'bold' }}
                      className="signwall-inside_forms-link ml-5 inline">
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
                  deseas retirar dicho consentimiento, revisa el procedimiento
                  en nuestras
                  <a
                    href={PolicyPrivacy(arcSite)}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: mainColorLink, fontWeight: 'bold' }}
                    className="signwall-inside_forms-link ml-5 inline">
                    Políticas de Privacidad.
                  </a>
                </p>
              </>
            ) : (
              <p
                style={{
                  color: '#81818',
                  fontSize: '10px',
                }}
                className="signwall-inside_forms-text mt-10 mb-10 center">
                CON TUS DATOS, MEJORAREMOS TU EXPERIENCIA DE <br /> NAVEGACIÓN Y
                NUNCA PUBLICAREMOS SIN TU PERMISO
              </p>
            )}
          </form>
        </>
      ) : (
        <>
          {showLoadingPremium ? (
            <Loading typeBg="block" />
          ) : (
            <form className="signwall-inside_forms-form">
              <div className="center block mb-20 mt-20">
                <MsgRegister bgcolor={mainColorBr} />
              </div>

              <h4
                style={{ fontSize: '22px' }}
                className="signwall-inside_forms-title center mb-10">
                {`Bienvenido(a) ${
                  window.Identity.userProfile.firstName || 'Usuario'
                } `}
              </h4>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '28px',
                }}
                className="signwall-inside_forms-text mt-10 mb-20 center">
                {showUserWithSubs
                  ? 'Sigue disfrutando del contenido exclusivo que tenemos para ti'
                  : 'Ahora puedes continuar con tu compra'}
              </p>

              {showUserWithSubs ? (
                <button
                  id="btn-premium-continue"
                  className="signwall-inside_forms-btn"
                  type="button"
                  style={{ color: mainColorBtn, background: mainColorLink }}
                  onClick={() => {
                    Taggeo(
                      `Web_${typeDialog}_Hard`,
                      `web_${typeDialog}_boton_sigue_navegando`
                    )
                    if (
                      window.sessionStorage.getItem('paywall_last_url') &&
                      window.sessionStorage.getItem('paywall_last_url') !== ''
                    ) {
                      window.location.href = window.sessionStorage.getItem(
                        'paywall_last_url'
                      )
                    } else {
                      onClose()
                    }
                  }}>
                  SIGUE NAVEGANDO
                </button>
              ) : (
                <button
                  type="button"
                  className="signwall-inside_forms-btn"
                  style={{ color: mainColorBtn, background: mainColorLink }}
                  onClick={() => {
                    Taggeo(
                      `Web_${typeDialog}_Hard`,
                      `web_${typeDialog}_boton_ver_planes`
                    )
                    handleSuscription()
                  }}>
                  VER PLANES
                </button>
              )}
            </form>
          )}
        </>
      )}
    </>
  )
}

export default FormLogin
