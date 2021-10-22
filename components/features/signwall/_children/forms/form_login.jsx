/* eslint-disable jsx-a11y/anchor-is-valid */
import Identity from '@arc-publishing/sdk-identity'
import sha256 from 'crypto-js/sha256'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { setCookie } from '../../../../utilities/client/cookies'
import { SITE_TROME } from '../../../../utilities/constants/sitenames'
import AuthFacebookGoogle from '../../../subscriptions/_children/auth-facebook-google'
import { useModalContext } from '../../../subscriptions/_context/modal'
import getCodeError, {
  formatEmail,
  formatPass,
} from '../../../subscriptions/_dependencies/Errors'
import { Taggeo } from '../../../subscriptions/_dependencies/Taggeo'
import useForm from '../../../subscriptions/_hooks/useForm'
import {
  dataTreatment,
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
        authProviders,
      },
      activeRegisterwall,
      activeNewsletter,
      activeVerifyEmail,
      activeDataTreatment,
      activeAuthSocialNative,
      siteDomain,
    },
  } = useAppContext() || {}

  const {
    typeDialog,
    onClose,
    removeBefore = (i) => i,
    onLogged = (i) => i,
  } = attributes

  const isTromeOrganic =
    arcSite === SITE_TROME &&
    (typeDialog === 'organico' || typeDialog === 'verify')

  const { changeTemplate } = useModalContext()
  const [showLoginEmail, setShowLoginEmail] = React.useState(
    valTemplate || arcSite === SITE_TROME
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
  const [hideFormLogin, setHideFormLogin] = React.useState(false)

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
      `web_sw${typeDialog[0]}_login_success_ingresar`, arcSite
    )
  }

  const taggeoError = () => {
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_login_error_ingresar`, arcSite
    )
  }

  const getListSubs = () =>
    Identity.extendSession().then((resExt) => {
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

  // agregado despues de pasar test por default/form_login
  const unblockContent = () => {
    setShowUserWithSubs(true) // tengo subs
    setShowLoadingPremium(false)
    const divPremium = document.getElementById('contenedor')
    if (divPremium) {
      divPremium.classList.remove('story-content__nota-premium')
      divPremium.removeAttribute('style')
    }
  }

  const checkUserSubs = () => {
    if (typeDialog === 'premium' || typeDialog === 'paywall') {
      setShowCheckPremium(true) // no tengo subs
      getListSubs().then((p) => {
        if (activeRegisterwall) {
          unblockContent()
        } else if (p && p.length === 0) {
          setShowUserWithSubs(false) // no tengo subs
          setShowLoadingPremium(false)
        } else {
          unblockContent()
        }
      })
    }
  }

  const handleGetProfile = (profile) => {
    setShowLoading(true)
    setCookie('arc_e_id', sha256(profile.email).toString(), 365)
    const USER_IDENTITY = JSON.stringify(Identity.userIdentity || {})
    setCookie('ArcId.USER_INFO', USER_IDENTITY, 1, siteDomain)

    if (typeDialog === 'premium' || typeDialog === 'paywall') {
      setShowCheckPremium(true) // no tengo subs
      getListSubs().then((p) => {
        if (activeRegisterwall) {
          unblockContent()
        } else if (p && p.length === 0) {
          setShowUserWithSubs(false) // no tengo subs
          setShowLoadingPremium(false)
        } else {
          unblockContent()
        }
      })
    } else {
      const btnSignwall = document.getElementById('signwall-nav-btn')
      if (typeDialog === 'newsletter' && btnSignwall) {
        btnSignwall.textContent = `${profile.firstName || 'Bienvenido'} ${profile.lastName || ''
          }`
      }
      onClose()
    }
    setShowLoading(false)
  }

  const onSubmitForm = ({ lemail, lpass }) => {
    setShowLoading(true)
    Identity.login(lemail, lpass, {
      rememberMe: true,
      cookie: true,
    })
      .then(() => {
        Identity.getUserProfile().then((resProfile) => {
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
              `web_sw${typeDialog[0]}_login_show_reenviar_correo`, arcSite
            )
            window.localStorage.removeItem('ArcId.USER_INFO')
            window.localStorage.removeItem('ArcId.USER_PROFILE')
            Identity.userProfile = null
            Identity.userIdentity = {}
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
            `web_sw${typeDialog[0]}_login_show_reenviar_correo`, arcSite
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
    Identity.requestVerifyEmail(lemail)
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_login_reenviar_correo`, arcSite
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

  const loginSuccessFabebook = () => {
    Identity.getUserProfile().then((resProfile) => {
      handleGetProfile(resProfile)
      taggeoSuccess()
      onLogged()
    })
  }

  const loginFailedFacebook = () => setShowError(getCodeError())

  return (
    <>
      {!showCheckPremium ? (
        <>
          <form
            className={`signwall-inside_forms-form ${arcSite === SITE_TROME ? 'form-trome' : ''
              } ${typeDialog}`}
            onSubmit={handleOnSubmit}>
            <div className={isTromeOrganic ? 'group-float-trome' : ''}>
              {isTromeOrganic && (
                <h1 className="group-float-trome__title">Ingresa</h1>
              )}

              {typeDialog === 'paywall' && !showLoginEmail && (
                <h4
                  style={{ fontSize: '22px', fontFamily: primaryFont }}
                  className="signwall-inside_forms-title center mb-20 mt-20 only-mobile-tablet">
                  Regístrate y mantente siempre informado con las noticias más
                  relevantes del Perú y el mundo
                </h4>
              )}

              <p className="signwall-inside_forms-text mb-10 mt-10 center">
                {arcSite === SITE_TROME
                  ? 'Accede fácilmente con:'
                  : ' Ingresa con'}
              </p>

              {activeAuthSocialNative ? (
                <AuthFacebookGoogle
                  hideFormParent={() => setHideFormLogin(!hideFormLogin)}
                  onAuthSuccess={loginSuccessFabebook}
                  onAuthFailed={loginFailedFacebook}
                  typeDialog={typeDialog}
                  dataTreatment={checkedPolits ? '1' : '0'}
                  arcSite={arcSite}
                  arcType="login"
                  activeNewsletter={activeNewsletter}
                  showMsgVerify={() => triggerShowVerify()}
                />
              ) : (
                <>
                  {authProviders.map((item) => (
                    <ButtonSocial
                      key={item}
                      brand={item}
                      size="middle"
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
                </>
              )}

              {arcSite === SITE_TROME && (
                <p className="signwall-inside_forms-text mt-15 center">
                  o completa tus datos para acceder
                </p>
              )}
            </div>

            {isTromeOrganic && <div className="spacing-trome" />}

            {!hideFormLogin && (
              <>
                {!showLoginEmail && (
                  <ButtonEmail
                    size="full"
                    onClick={() => {
                      Taggeo(
                        `Web_Sign_Wall_${typeDialog}`,
                        `web_sw${typeDialog[0]}_open_login_boton_ingresar`, arcSite
                      )
                      setShowLoginEmail(!showLoginEmail)
                    }}
                  />
                )}

                {showLoginEmail && (
                  <>
                    {showError && (
                      <div
                        className={`signwall-inside_forms-error ${showVerify ? 'warning' : ''
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
                          `web_sw${typeDialog[0]}_contrasena_link_olvide`, arcSite
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
                      onClick={() => {
                        Taggeo(
                          `Web_Sign_Wall_${typeDialog}`,
                          `web_sw${typeDialog[0]}_login_boton_ingresar`, arcSite
                        )
                        // agregado para el taggeo de diario correo por valla
                        if (typeDialog === 'premium' && activeRegisterwall) {
                          Taggeo(
                            `Web_${typeDialog}_Registro`,
                            `web_${typeDialog}_boton_iniciar_sesion`
                          )
                        }
                      }}>
                      {showLoading ? 'CARGANDO...' : 'INICIA SESIÓN'}
                    </button>
                  </>
                )}

                <p
                  style={{
                    fontSize: '12px',
                    color: '#000000',
                    textAlign: 'center',
                  }}
                  className="signwall-inside_forms-text mt-10 mb-20">
                  ¿Aún no tienes una cuenta?
                  <a
                    href="#"
                    style={{ color: mainColorLink, fontWeight: 'bold' }}
                    className="signwall-inside_forms-link ml-5"
                    onClick={(e) => {
                      e.preventDefault()
                      Taggeo(
                        `Web_Sign_Wall_${typeDialog}`,
                        `web_sw${typeDialog[0]}_login_boton_registrate`, arcSite
                      )
                      changeTemplate('register')
                    }}>
                    Regístrate
                  </a>
                </p>

                {activeDataTreatment ? (
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
                        }}
                        className="signwall-inside_forms-text mt-10">
                        Al ingresar por redes sociales autorizo el uso de mis
                        datos para
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
                      style={{
                        textAlign: 'justify',
                        color: '#818181',
                        fontSize: '11px',
                      }}
                      className="signwall-inside_forms-text mt-10 mb-10">
                      En caso hayas autorizado los fines de uso adicionales
                      anteriormente, no es necesario que lo vuelvas a marcar. Si
                      deseas retirar dicho consentimiento, revisa el
                      procedimiento en nuestras
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
                    CON TUS DATOS, MEJORAREMOS TU EXPERIENCIA DE <br />{' '}
                    NAVEGACIÓN Y NUNCA PUBLICAREMOS SIN TU PERMISO
                  </p>
                )}
              </>
            )}
          </form>
        </>
      ) : (
        <>
          {showLoadingPremium ? (
            <Loading typeBg="block" />
          ) : (
            <form className={`signwall-inside_forms-form ${typeDialog}`}>
              <div className="center block mb-20 mt-20">
                <MsgRegister bgcolor={mainColorBr} />
              </div>

              <h4
                style={{ fontSize: '22px' }}
                className="signwall-inside_forms-title center mb-10">
                {`Bienvenido(a) ${
                  Identity.userProfile.firstName || 'Usuario'
                } `}
              </h4>
              <p
                style={{
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
                      `Web_${typeDialog}_${activeRegisterwall && typeDialog === 'premium'
                        ? 'Registro'
                        : 'Hard'
                      }`,
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
