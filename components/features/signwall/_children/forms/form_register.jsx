/* eslint-disable jsx-a11y/anchor-is-valid */
import Identity from '@arc-publishing/sdk-identity'
import sha256 from 'crypto-js/sha256'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { getAssetsPath } from '../../../../utilities/assets'
import { setCookie } from '../../../../utilities/client/cookies'
import { isStorageAvailable } from '../../../../utilities/client/storage'
import {
  SITE_ELCOMERCIO,
  SITE_GESTION,
} from '../../../../utilities/constants/sitenames'
import { extendSession } from '../../../../utilities/subscriptions/identity'
import AuthFacebookGoogle from '../../../subscriptions/_children/auth-facebook-google'
import { useModalContext } from '../../../subscriptions/_context/modal'
import getCodeError, {
  acceptCheckTerms,
  formatEmail,
  formatPass,
  formatPhone,
} from '../../../subscriptions/_dependencies/Errors'
import getDevice from '../../../subscriptions/_dependencies/GetDevice'
import { Taggeo } from '../../../subscriptions/_dependencies/Taggeo'
import useForm from '../../../subscriptions/_hooks/useForm'
import {
  dataTreatment,
  getUrlPaywall,
  PolicyPrivacy,
  TermsConditions,
} from '../../_dependencies/domains'
import {
  getEntitlement,
  sendNewsLettersUser,
} from '../../_dependencies/services'
import { MsgRegister } from '../icons'
import Loading from '../loading'
import { CheckBox } from './control_checkbox'
import { Input } from './control_input_select'
import { AuthURL, ButtonSocial } from './control_social'
import { FormStudents } from './form_students'

const FormRegister = ({
  typeDialog,
  onClose,
  onLogged = (i) => i,
  onLoggedFail = (i) => i,
  removeBefore = (i) => i,
}) => {
  const {
    arcSite,
    deployment,
    contextPath,
    siteProperties: {
      signwall: { mainColorLink, mainColorBtn, mainColorBr, authProviders },
      activeMagicLink,
      activeRegisterwall,
      activeNewsletter,
      activeVerifyEmail,
      activeDataTreatment,
      activePhoneRegister,
      activeAuthSocialNative,
      siteDomain,
    },
  } = useAppContext() || {}

  const isTromeOrganic =
    arcSite === 'trome' &&
    (typeDialog === 'organico' || typeDialog === 'verify' || typeDialog === 'banner' || typeDialog === 'promoMetro')

  const { changeTemplate } = useModalContext()
  const [showError, setShowError] = React.useState(false)
  const [showLoading, setShowLoading] = React.useState(false)
  const [showConfirm, setShowConfirm] = React.useState(false)
  const [showStudents, setShowStudents] = React.useState(false)
  const [checkedPolits, setCheckedPolits] = React.useState(true)
  const [checkedTerms, setCheckedTerms] = React.useState(false)
  const [showFormatInvalid, setShowFormatInvalid] = React.useState('')
  const [showCheckPremium, setShowCheckPremium] = React.useState(false)
  const [showUserWithSubs, setShowUserWithSubs] = React.useState(false)
  const [showSendEmail, setShowSendEmail] = React.useState(false)
  const [showContinueVerify, setShowContinueVerify] = React.useState(false)
  const [hideFormRegister, setHideFormRegister] = React.useState(false)

  const stateSchema = {
    remail: { value: '', error: '' },
    rpass: { value: '', error: '' },
    rphone: { value: '', error: '' },
    rpolit: { value: '1', error: '' },
    rterms: { value: '0', error: '' },
  }

  const stateValidatorSchema = {
    remail: {
      required: true,
      validator: formatEmail(),
    },
    rpass: {
      required: true,
      validator: formatPass(),
      nospaces: true,
    },
    rphone: {
      required: false,
      validator: formatPhone(),
      min6caracts: true,
    },
    rpolit: {
      required: false,
    },
    rterms: {
      required: true,
      validator: acceptCheckTerms(),
    },
  }

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

  const handleNewsleters = (profile) => {
    sendNewsLettersUser(
      profile.uuid,
      profile.email,
      arcSite,
      profile.accessToken || Identity.userIdentity.accessToken,
      ['general']
    )
  }

  const handleStopProfile = (profile) => {
    if (activeNewsletter && profile.accessToken) {
      handleNewsleters(profile)
    }
    if (activeMagicLink) {
      // requestVerifyEmail se ejecuta automáticamente con el SignUp
      Identity.requestOTALink(profile.profile.email)
    }
    setShowConfirm(true)
    setShowContinueVerify(true)
    window.localStorage.removeItem('ArcId.USER_INFO')
    window.localStorage.removeItem('ArcId.USER_PROFILE')
    Identity.userProfile = null
    Identity.userIdentity = {}
  }

  const handleGetProfile = () => {
    Identity.getUserProfile()
      .then((profile) => {
        setCookie('arc_e_id', sha256(profile.email).toString(), 365)
        const USER_IDENTITY = JSON.stringify(Identity.userIdentity || {})
        setCookie('ArcId.USER_INFO', USER_IDENTITY, 1, siteDomain)

        if (activeNewsletter) {
          handleNewsleters(profile)
        }
        setShowConfirm(true)
        onLogged(profile)
      })
      .catch(() => {
        Taggeo(
          `Web_Sign_Wall_${typeDialog}`,
          `web_sw${typeDialog[0]}_registro_error_registrarme`,
          arcSite
        )
      })
  }

  const originAction = () => {
    switch (typeDialog) {
      case 'organico' || 'banner' || 'promoMetro':
        return '0'
      case 'hard':
        return '1'
      case 'relogemail':
        return 'reloginemail'
      case 'reloghash':
        return 'reloginhash'
      default:
        return typeDialog
    }
  }

  const onSubmitForm = ({ remail, rpass, rphone }) => {
    setShowLoading(true)

    const contacts =
      rphone.length >= 6 ? [{ phone: rphone.trim(), type: 'PRIMARY' }] : []

    Identity.signUp(
      {
        userName: remail,
        credentials: rpass,
        grantType: 'password',
      },
      {
        displayName: remail,
        email: remail,
        contacts,
        attributes: [
          {
            name: 'originDomain',
            value: window.location.hostname || 'none',
            type: 'String',
          },
          {
            name: 'originReferer',
            value: window.location.href || 'none',
            type: 'String',
          },
          {
            name: 'originMethod',
            value: '1',
            type: 'String',
          },
          {
            name: 'originDevice',
            value: getDevice(window) || 'none',
            type: 'String',
          },
          {
            name: 'originAction',
            value: originAction() || 'none',
            type: 'String',
          },
          {
            name: 'termsCondPrivaPoli',
            value: checkedTerms ? '1' : '0',
            type: 'String',
          },
          {
            name: 'dataTreatment',
            value:
              // eslint-disable-next-line no-nested-ternary
              activeDataTreatment ? (checkedPolits ? '1' : '0') : 'NULL',
            type: 'String',
          },
        ],
      }
    )
      .then((resSignUp) => {
        if (activeVerifyEmail) {
          handleStopProfile(resSignUp)
        } else {
          handleGetProfile()
        }
        Taggeo(
          `Web_Sign_Wall_${typeDialog}`,
          `web_sw${typeDialog[0]}_registro_success_registrarme`,
          arcSite
        )
      })
      .catch((errLogin) => {
        setShowError(getCodeError(errLogin.code))
        onLoggedFail(errLogin)
        setShowLoading(false)
        Taggeo(
          `Web_Sign_Wall_${typeDialog}`,
          `web_sw${typeDialog[0]}_registro_error_registrarme`,
          arcSite
        )
        setCookie('lostEmail', remail, 1)
      })
      .finally(() => {
        // eliminamos la noticia premium del storage en caso
        // el typedialog no sea premium
        if (typeDialog !== 'premium') {
          if (isStorageAvailable('localStorage')) {
            window.localStorage.removeItem('premium_last_url')
          }
        }
      })
  }

  const getListSubs = () =>
    extendSession().then((resExt) => {
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

  const unblockContent = () => {
    setShowUserWithSubs(true) // tengo subs
    const divPremium = document.getElementById('contenedor')
    if (divPremium) {
      divPremium.classList.remove('story-content__nota-premium')
      divPremium.removeAttribute('style')
    }
  }

  const checkUserSubs = () => {
    if (typeDialog === 'premium' || typeDialog === 'paywall') {
      setShowCheckPremium(true)

      getListSubs()
        .then((p) => {
          if (activeRegisterwall) {
            unblockContent()
          } else if (p && p.length === 0) {
            setShowUserWithSubs(false) // no tengo subs
          } else {
            unblockContent()
          }
        })
        .finally(() => {
          setShowCheckPremium(false)
          setShowConfirm(true)
        })
    }
  }

  const checkFormat = (e) => {
    if (e.target.value.indexOf(' ') >= 0) {
      setShowFormatInvalid('No se permite espacios')
    } else {
      setShowFormatInvalid('')
    }
  }

  const {
    values: { remail, rpass, rphone },
    errors: {
      remail: remailError,
      rpass: rpassError,
      rphone: rphoneError,
      rterms: rtermsError,
    },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm)

  const sendVerifyEmail = (e) => {
    e.preventDefault()
    setShowSendEmail(true)
    if (activeMagicLink) {
      Identity.requestOTALink(remail)
    } else {
      Identity.requestVerifyEmail(remail)
    }
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_registro_reenviar_correo`,
      arcSite
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

  const sizeBtnSocial = authProviders.length === 1 ? 'full' : 'middle'

  const registerSuccessFabebook = () => {
    Identity.getUserProfile().then((resProfile) => {
      handleGetProfile(resProfile)
      // checkar taggeo
      Taggeo(
        `Web_Sign_Wall_${typeDialog}`,
        `web_sw${typeDialog[0]}_registro_success_registrarme`,
        arcSite
      )
      onLogged()
    })
  }

  const registerFailedFacebook = () => setShowError(getCodeError())

  return (
    <>
      {!showStudents && (
        <>
          {showCheckPremium ? (
            <Loading typeBg="block" />
          ) : (
            <form
              className={`signwall-inside_forms-form ${arcSite === 'trome' ? 'form-trome' : ''
                } ${typeDialog}`}
              onSubmit={handleOnSubmit}>
              {!showConfirm && (
                <>
                  <div className={isTromeOrganic ? 'group-float-trome' : ''}>
                    {isTromeOrganic && (
                      <>
                        <div className="group-float-trome__head">
                          <h1 className="group-float-trome__title">
                            ¡Regístrate gratis!
                          </h1>
                          <img
                            src={deployment(
                              `${getAssetsPath(
                                arcSite,
                                contextPath
                              )}/resources/dist/${arcSite}/images/logo-club-trome.png?d=1`
                            )}
                            style={{ width: '86px', height: '33px' }}
                            alt="Logo de Club Trome"
                          />
                        </div>
                        <h2 style={{ marginBottom: '20px' }}>
                          Y disfruta de beneficios exclusivos
                        </h2>
                      </>
                    )}

                    <p className="signwall-inside_forms-text mt-10 mb-10 center">
                      Accede fácilmente con:
                    </p>

                    {activeAuthSocialNative ? (
                      <AuthFacebookGoogle
                        hideFormParent={() =>
                          setHideFormRegister(!hideFormRegister)
                        }
                        onAuthSuccess={registerSuccessFabebook}
                        onAuthFailed={registerFailedFacebook}
                        typeDialog={typeDialog}
                        dataTreatment={checkedPolits ? '1' : '0'}
                        arcSite={arcSite}
                        arcType="login"
                        activeNewsletter={activeNewsletter}
                        showMsgVerify={() => { }}
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
                            typeForm="registro"
                            activeNewsletter={activeNewsletter}
                            checkUserSubs={checkUserSubs}
                            dataTreatment={checkedPolits ? '1' : '0'}
                          />
                        ))}

                        <AuthURL
                          arcSite={arcSite}
                          onClose={onClose}
                          typeDialog={typeDialog}
                          activeNewsletter={activeNewsletter}
                          typeForm="registro"
                          onLogged={onLogged}
                          checkUserSubs={checkUserSubs}
                          onStudents={() => setShowStudents(!showStudents)}
                        />
                      </>
                    )}

                    <p className="signwall-inside_forms-text mt-15 center">
                      o completa tus datos para registrarte
                    </p>
                  </div>

                  {isTromeOrganic && <div className="spacing-trome" />}

                  {!hideFormRegister && (
                    <>
                      {showError && (
                        <div className="signwall-inside_forms-error">
                          {showError.indexOf('ya existe') ? (
                            <>
                              {showError}
                              <a
                                href="#"
                                style={{ color: 'white', fontWeight: 'bold' }}
                                className="signwall-inside_forms-link"
                                onClick={(e) => {
                                  e.preventDefault()
                                  changeTemplate('forgot')
                                }}>
                                Recuperar contraseña
                              </a>
                            </>
                          ) : (
                            showError
                          )}
                        </div>
                      )}

                      <Input
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        name="remail"
                        placeholder="Correo electrónico*"
                        required
                        value={remail}
                        onChange={(e) => {
                          handleOnChange(e)
                          setShowError(false)
                        }}
                        error={remailError}
                      />

                      <Input
                        type="password"
                        autoComplete="new-password"
                        name="rpass"
                        placeholder="Contraseña*"
                        required
                        value={rpass}
                        onChange={(e) => {
                          handleOnChange(e)
                          setShowError(false)
                          checkFormat(e)
                        }}
                        error={rpassError || showFormatInvalid}
                      />

                      {activePhoneRegister && (
                        <Input
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          name="rphone"
                          placeholder="Teléfono"
                          maxLength="12"
                          value={rphone}
                          onChange={(e) => {
                            handleOnChange(e)
                          }}
                          error={rphoneError}
                        />
                      )}

                      {activeDataTreatment && (
                        <CheckBox
                          checked={checkedPolits}
                          value={checkedPolits ? '1' : '0'}
                          name="rpolit"
                          arcSite={arcSite}
                          onChange={(e) => {
                            handleOnChange(e)
                            setCheckedPolits(!checkedPolits)
                          }}>
                          <p
                            style={{
                              fontSize: '12px',
                            }}
                            className="signwall-inside_forms-text mt-10">
                            Al registrarme por redes sociales o por este
                            formulario autorizo el uso de mis datos para
                            <a
                              href={dataTreatment}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                color: mainColorLink,
                                fontWeight: 'bold',
                              }}
                              className="signwall-inside_forms-link ml-5 inline">
                              fines adicionales
                            </a>
                          </p>
                        </CheckBox>
                      )}

                      <CheckBox
                        checked={checkedTerms}
                        value={checkedTerms ? '1' : '0'}
                        name="rterms"
                        arcSite={arcSite}
                        onChange={(e) => {
                          handleOnChange(e)
                          setCheckedTerms(!checkedTerms)
                          setShowError(false)
                        }}
                        valid
                        error={rtermsError}>
                        <p
                          style={{
                            fontSize: '12px',
                          }}
                          className="signwall-inside_forms-text mt-10">
                          Al crear la cuenta acepto los
                          <a
                            href={TermsConditions(arcSite)}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: mainColorLink, fontWeight: 'bold' }}
                            className="signwall-inside_forms-link ml-5 mr-5 inline">
                            Términos y Condiciones
                          </a>
                          y
                          <a
                            href={PolicyPrivacy(arcSite)}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: mainColorLink, fontWeight: 'bold' }}
                            className="signwall-inside_forms-link ml-5 inline">
                            Políticas de Privacidad
                          </a>
                        </p>
                      </CheckBox>

                      <button
                        style={{
                          color: mainColorBtn,
                          background: mainColorLink,
                        }}
                        type="submit"
                        className="signwall-inside_forms-btn mt-15 mb-5"
                        disabled={disable || showLoading || showFormatInvalid}
                        onClick={() => {
                          Taggeo(
                            `Web_Sign_Wall_${typeDialog}`,
                            `web_sw${typeDialog[0]}_registro_boton_registrarme`,
                            arcSite
                          )
                        }}>
                        {showLoading ? 'REGISTRANDO...' : 'Registrarme'}
                      </button>

                      <p
                        style={{
                          fontSize: '12px',
                          color: '#000000',
                          textAlign: 'center',
                        }}
                        className="signwall-inside_forms-text mt-20 mb-10">
                        Ya tengo una cuenta
                        <a
                          href="#"
                          style={{ color: mainColorLink, fontWeight: 'bold' }}
                          className="signwall-inside_forms-link ml-5"
                          onClick={(e) => {
                            e.preventDefault()
                            Taggeo(
                              `Web_Sign_Wall_${typeDialog}`,
                              `web_sw${typeDialog[0]}_registro_link_volver`,
                              arcSite
                            )
                            switch (typeDialog) {
                              case 'relogemail':
                              case 'reloghash':
                                changeTemplate('relogin')
                                break
                              default:
                                changeTemplate('login')
                            }
                          }}>
                          Iniciar Sesión
                        </a>
                      </p>
                    </>
                  )}
                </>
              )}

              {showConfirm && (
                <>
                  {isTromeOrganic ? (
                    <>
                      <div
                        className={isTromeOrganic ? 'group-float-trome' : ''}>
                        <br />
                        <h1 className="group-float-trome__title">
                          ¡Gracias por ser un Trome!
                        </h1>
                        <p className="group-float-trome__subtitle mb-20">
                          Para confirmar tu registro te solicitamos confirmar tu
                          <br /> cuenta de correo electrónico.
                        </p>
                      </div>
                      <div className="spacing-trome" />
                      <div className="spacing-trome" />
                    </>
                  ) : (
                    <>
                      <div className="center block mb-20 mt-20">
                        <MsgRegister bgcolor={mainColorBr} />
                      </div>

                      <h4
                        style={{ fontSize: '22px' }}
                        className="signwall-inside_forms-title center mb-10">
                        {showUserWithSubs
                          ? `Bienvenido(a) ${Identity.userProfile.firstName || 'Usuario'
                          }`
                          : 'Tu cuenta ha sido creada correctamente'}
                      </h4>
                    </>
                  )}

                  {showContinueVerify && (
                    <h4
                      style={{ fontSize: '14px', color: '#6a6a6a' }}
                      className="signwall-inside_forms-title mb-10 center">
                      {remail}
                    </h4>
                  )}

                  {(typeDialog === 'premium' || typeDialog === 'paywall') &&
                    !showContinueVerify && (
                      <>
                        {showUserWithSubs ? (
                          <>
                            <p
                              style={{
                                lineHeight: '28px',
                              }}
                              className="signwall-inside_forms-text mb-20 center">
                              Sigue disfrutando del contenido exclusivo que
                              tenemos para ti
                            </p>

                            <button
                              id="btn-premium-continue"
                              className="signwall-inside_forms-btn"
                              type="button"
                              style={{
                                color: mainColorBtn,
                                background: mainColorLink,
                              }}
                              onClick={() => {
                                // modificado para el taggeo de diario correo por valla
                                Taggeo(
                                  `Web_${typeDialog}_${activeRegisterwall &&
                                    typeDialog === 'premium'
                                    ? 'Registro'
                                    : 'Hard'
                                  }`,
                                  `web_${typeDialog}_boton_sigue_navegando`
                                )
                                // validamos para cuando sea una nota premium
                                if (
                                  isStorageAvailable('localStorage') &&
                                  isStorageAvailable('sessionStorage')
                                ) {
                                  const premiumLastUrl = window.localStorage.getItem(
                                    'premium_last_url'
                                  )
                                  const paywallLastUrl = window.sessionStorage.getItem(
                                    'paywall_last_url'
                                  )
                                  if (
                                    premiumLastUrl &&
                                    premiumLastUrl !== '' &&
                                    activeRegisterwall
                                  ) {
                                    window.location.href = premiumLastUrl
                                    // removiendo del local la nota premium
                                    window.localStorage.removeItem(
                                      'premium_last_url'
                                    )
                                  } else if (
                                    paywallLastUrl &&
                                    paywallLastUrl !== ''
                                  ) {
                                    window.location.href = paywallLastUrl
                                  } else {
                                    onClose()
                                  }
                                } else {
                                  onClose()
                                }
                              }}>
                              SIGUE NAVEGANDO
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            className="signwall-inside_forms-btn"
                            style={{
                              color: mainColorBtn,
                              background: mainColorLink,
                            }}
                            onClick={() => {
                              Taggeo(
                                `Web_Sign_Wall_${typeDialog}`,
                                `web_sw${typeDialog[0]}_boton_ver_planes`,
                                arcSite
                              )

                              handleSuscription()
                            }}>
                            VER PLANES
                          </button>
                        )}
                      </>
                    )}

                  {(showContinueVerify || !activeVerifyEmail) && (
                    <>
                      {!isTromeOrganic && (
                        <p
                          style={{
                            lineHeight: '22px',
                          }}
                          className="signwall-inside_forms-text mb-20 center">
                          Revisa tu bandeja de correo para confirmar tu
                          {showContinueVerify
                            ? ` registro y sigue navegando`
                            : ` solicitud de registro`}
                        </p>
                      )}

                      <button
                        type="button"
                        className="signwall-inside_forms-btn"
                        style={{
                          color: mainColorBtn,
                          background: mainColorLink,
                        }}
                        onClick={() => {
                          Taggeo(
                            `Web_Sign_Wall_${typeDialog}`,
                            `web_sw${typeDialog[0]}_registro_continuar_navegando`,
                            arcSite
                          )
                          if (typeDialog === 'students') {
                            if (showContinueVerify) {
                              changeTemplate('login', '', remail)
                            } else {
                              setShowStudents(!showStudents)
                            }
                          } else {
                            const btnSignwall = document.getElementById(
                              'signwall-nav-btn'
                            )
                            if (typeDialog === 'newsletter' && btnSignwall) {
                              btnSignwall.textContent =
                                arcSite === SITE_ELCOMERCIO ||
                                  arcSite === SITE_GESTION
                                  ? 'Bienvenido'
                                  : 'Mi Perfil'
                            }
                            if (showContinueVerify) {
                              changeTemplate('login', '', remail)
                            } else {
                              onClose()
                            }
                          }
                        }}>
                        {arcSite === 'trome' ? 'CONFIRMAR CORREO' : 'CONTINUAR'}
                      </button>
                    </>
                  )}

                  {showContinueVerify && (
                    <p
                      style={{
                        color: '#000000',
                        fontSize: '12px',
                        textAlign: 'center',
                      }}
                      className="signwall-inside_forms-text mt-20 mb-10 center">
                      ¿No recibiste el correo?
                      <br />
                      {!showSendEmail ? (
                        <a
                          href="#"
                          style={{ color: mainColorLink, fontWeight: 'bold' }}
                          className="signwall-inside_forms-link ml-10"
                          onClick={sendVerifyEmail}>
                          Reenviar correo de activación
                        </a>
                      ) : (
                        <span>
                          Podrás reenviar nuevamente dentro de
                          <strong id="countdown"> 10 </strong> segundos
                        </span>
                      )}
                    </p>
                  )}
                </>
              )}
              {showConfirm && isTromeOrganic && (
                <p className="signwall-inside_forms-text-note">
                  Al hacer click estarás aceptando los Términos y <br />{' '}
                  condiciones y la Política de privacidad.
                </p>
              )}
            </form>
          )}
        </>
      )}

      {showStudents && typeDialog === 'students' && (
        <FormStudents arcSite={arcSite} />
      )}
    </>
  )
}

export default FormRegister
