/* eslint-disable jsx-a11y/anchor-is-valid */
import { sha256 } from 'js-sha256'
import React, { useState } from 'react'

import {
  setCookie,
  setCookieDomain,
} from '../../../subscriptions/_dependencies/Cookies'
import getCodeError, {
  formatPhone,
} from '../../../subscriptions/_dependencies/Errors'
import getDevice from '../../../subscriptions/_dependencies/GetDevice'
import { Taggeo } from '../../../subscriptions/_dependencies/Taggeo'
import useForm from '../../../subscriptions/_hooks/useForm'
import Domains from '../../_dependencies/domains'
import Services from '../../_dependencies/services'
import { ModalConsumer } from '../context'
import { Back, MsgRegister } from '../iconos'
import Loading from '../loading'
import { CheckBox } from './control_checkbox'
import { Input } from './control_input_select'
import { AuthURL, ButtonSocial } from './control_social'
import { FormStudents } from './form_students'
import * as S from './styles'

const FormRegister = (props) => {
  const {
    typeDialog,
    onClose,
    onLogged = (i) => i,
    onLoggedFail = (i) => i,
    arcSite,
    siteProperties: {
      signwall: {
        mainColorLink,
        mainColorBtn,
        mainColorBr,
        authProviders = [],
      },
      activeNewsletter = false,
      activeVerifyEmail = false,
    },
    removeBefore = (i) => i,
  } = props

  const [showError, setShowError] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showStudents, setShowStudents] = useState(false)
  const [checkedPolits, setCheckedPolits] = useState(true)
  const [checkedTerms, setCheckedTerms] = useState(false)
  const [showFormatInvalid, setShowFormatInvalid] = useState('')

  const [showCheckPremium, setShowCheckPremium] = useState(false)
  const [showUserWithSubs, setShowUserWithSubs] = useState(false)
  const [showSendEmail, setShowSendEmail] = useState(false)
  const [showContinueVerify, setShowContinueVerify] = useState(false)

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
      validator: {
        func: (value) =>
          /^[a-zA-Z0-9]{1}[a-zA-Z0-9._-]+@[a-zA-Z0-9-]{2,}(?:\.[a-zA-Z0-9-]{2,})+$/.test(
            value
          ),
        error: 'Correo Electrónico Inválido',
      },
    },
    rpass: {
      required: true,
      validator: {
        func: (value) => {
          if (value.length >= 8) {
            return true
          }
          return false
        },
        error: 'Mínimo 8 caracteres',
      },
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
      validator: {
        func: (value) => value !== '1',
        error:
          'Para ser parte de nuestra comunidad es necesario aceptar los términos y condiciones',
      },
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
    window.location.href = Domains.getUrlPaywall(arcSite)
    window.sessionStorage.setItem('paywall_type_modal', typeDialog)
  }

  const handleNewsleters = (profile) => {
    Services.sendNewsLettersUser(
      profile.uuid,
      profile.email,
      arcSite,
      profile.accessToken || window.Identity.userIdentity.accessToken,
      ['general']
    )
  }

  const handleStopProfile = (profile) => {
    if (activeNewsletter && profile.accessToken) {
      handleNewsleters(profile)
    }
    setShowConfirm(true)
    setShowContinueVerify(true)
    window.localStorage.removeItem('ArcId.USER_INFO')
    window.localStorage.removeItem('ArcId.USER_PROFILE')
    window.Identity.userProfile = null
    window.Identity.userIdentity = {}
  }

  const handleGetProfile = () => {
    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
    window.Identity.getUserProfile()
      .then((profile) => {
        setCookie('arc_e_id', sha256(profile.email), 365)

        const USER_IDENTITY = JSON.stringify(window.Identity.userIdentity || {})
        setCookieDomain('ArcId.USER_INFO', USER_IDENTITY, 1, arcSite)

        if (activeNewsletter) {
          handleNewsleters(profile)
        }
        setShowConfirm(true)
        onLogged(profile)
      })
      .catch(() => {
        Taggeo(
          `Web_Sign_Wall_${typeDialog}`,
          `web_sw${typeDialog[0]}_registro_error_registrarme`
        )
      })
  }

  const originAction = () => {
    switch (typeDialog) {
      case 'organico':
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

  const onSubmitForm = (state) => {
    const { remail, rpass, rphone } = state
    setShowLoading(true)

    const contacts =
      rphone.length >= 6 ? [{ phone: rphone.trim(), type: 'PRIMARY' }] : []

    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
    window.Identity.signUp(
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
              arcSite === 'elcomercio' || arcSite === 'gestion'
                ? checkedPolits
                  ? '1'
                  : '0'
                : 'NULL',
            type: 'String',
          },
        ],
      },
      { doLogin: true },
      { rememberMe: true }
    )
      .then((resSignUp) => {
        if (activeVerifyEmail) {
          handleStopProfile(resSignUp)
        } else {
          handleGetProfile()
        }
        Taggeo(
          `Web_Sign_Wall_${typeDialog}`,
          `web_sw${typeDialog[0]}_registro_success_registrarme`
        )
      })
      .catch((errLogin) => {
        setShowError(getCodeError(errLogin.code))
        onLoggedFail(errLogin)
        setShowLoading(false)
        Taggeo(
          `Web_Sign_Wall_${typeDialog}`,
          `web_sw${typeDialog[0]}_registro_error_registrarme`
        )
        setCookie('lostEmail', remail, 1)
      })
  }

  const getListSubs = () =>
    window.Identity.extendSession().then((resExt) => {
      const checkEntitlement = Services.getEntitlement(
        resExt.accessToken,
        arcSite
      )
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

  const checkUserSubs = () => {
    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })

    if (typeDialog === 'premium' || typeDialog === 'paywall') {
      setShowCheckPremium(true)

      getListSubs()
        .then((p) => {
          if (p && p.length === 0) {
            setShowUserWithSubs(false) // no tengo subs
          } else {
            setShowUserWithSubs(true) // tengo subs
            const divPremium = document.getElementById('contenedor')
            if (divPremium) {
              divPremium.classList.remove('story-content__nota-premium')
              divPremium.removeAttribute('style')
            }
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
    window.Identity.requestVerifyEmail(remail)
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_registro_reenviar_correo`
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

  return (
    <ModalConsumer>
      {(value) => (
        <>
          {!showStudents && (
            <>
              {showCheckPremium ? (
                <Loading arcSite={arcSite} typeBg="wait" />
              ) : (
                <S.Form onSubmit={handleOnSubmit} typeDialog={typeDialog}>
                  {!showConfirm && (
                    <>
                      <S.ButtonBase
                        type="button"
                        onClick={() => {
                          Taggeo(
                            `Web_Sign_Wall_${typeDialog}`,
                            `web_sw${typeDialog[0]}_registro_link_volver`
                          )
                          switch (typeDialog) {
                            case 'relogemail':
                            case 'reloghash':
                              value.changeTemplate('relogin')
                              break
                            default:
                              value.changeTemplate('login')
                          }
                        }}>
                        <Back /> Volver
                      </S.ButtonBase>

                      <S.Text c="gray" s="16" className="mb-10 center">
                        Accede fácilmente con:
                      </S.Text>

                      {authProviders.map((item) => (
                        <ButtonSocial
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

                      <S.Text c="gray" s="14" className="mt-15 center">
                        o completa tus datos para registrarte
                      </S.Text>

                      {showError && (
                        <S.Error>
                          {showError.indexOf('ya existe') ? (
                            <>
                              {showError}
                              <S.Link
                                href="#"
                                c="white"
                                fw="bold"
                                onClick={(e) => {
                                  e.preventDefault()
                                  value.changeTemplate('forgot')
                                }}>
                                Recuperar contraseña
                              </S.Link>
                            </>
                          ) : (
                            showError
                          )}
                        </S.Error>
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

                      {(arcSite === 'elcomercio' || arcSite === 'gestion') && (
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

                      {(arcSite === 'elcomercio' || arcSite === 'gestion') && (
                        <CheckBox
                          checked={checkedPolits}
                          value={checkedPolits ? '1' : '0'}
                          name="rpolit"
                          onChange={(e) => {
                            handleOnChange(e)
                            setCheckedPolits(!checkedPolits)
                          }}>
                          <S.Text c="gray" lh="18" s="12" className="mt-10">
                            Al registrarme por redes sociales o por este
                            formulario autorizo el uso de mis datos para
                            <S.Link
                              href="/tratamiento-de-datos/"
                              target="_blank"
                              c={mainColorLink}
                              fw="bold"
                              className="ml-5 inline">
                              fines adicionales
                            </S.Link>
                          </S.Text>
                        </CheckBox>
                      )}

                      <CheckBox
                        checked={checkedTerms}
                        value={checkedTerms ? '1' : '0'}
                        name="rterms"
                        onChange={(e) => {
                          handleOnChange(e)
                          setCheckedTerms(!checkedTerms)
                          setShowError(false)
                        }}
                        valid
                        error={rtermsError}>
                        <S.Text c="gray" lh="18" s="12" className="mt-10">
                          Al crear la cuenta acepto los
                          <S.Link
                            href={`${
                              arcSite === 'depor'
                                ? '/terminos-servicio/'
                                : '/terminos-y-condiciones/'
                            }`}
                            target="_blank"
                            c={mainColorLink}
                            fw="bold"
                            className="ml-5 mr-5 inline">
                            Términos y Condiciones
                          </S.Link>
                          y
                          <S.Link
                            href={(() => {
                              switch (arcSite) {
                                case 'elcomercio':
                                case 'depor':
                                  return '/politicas-privacidad/'
                                case 'gestion':
                                case 'trome':
                                  return '/politica-de-privacidad/'
                                default:
                                  return '/politicas-de-privacidad/'
                              }
                            })()}
                            target="_blank"
                            c={mainColorLink}
                            fw="bold"
                            className="ml-5 inline">
                            Políticas de Privacidad
                          </S.Link>
                        </S.Text>
                      </CheckBox>

                      <S.Button
                        color={mainColorBtn}
                        type="submit"
                        className="mt-15 mb-5"
                        disabled={disable || showLoading || showFormatInvalid}
                        onClick={() => {
                          Taggeo(
                            `Web_Sign_Wall_${typeDialog}`,
                            `web_sw${typeDialog[0]}_registro_boton_registrarme`
                          )
                        }}>
                        {showLoading ? 'REGISTRANDO...' : 'REGISTRARME'}
                      </S.Button>
                    </>
                  )}

                  {showConfirm && (
                    <>
                      <div className="center block mb-20 mt-20">
                        <MsgRegister bgcolor={mainColorBr} />
                      </div>

                      <S.Title s="22" className="center mb-10">
                        {showUserWithSubs
                          ? `Bienvenido(a) ${
                              window.Identity.userProfile.firstName || 'Usuario'
                            }`
                          : 'Tu cuenta ha sido creada correctamente'}
                      </S.Title>

                      {showContinueVerify && (
                        <S.Title s="14" c="#6a6a6a" className="center">
                          {remail}
                        </S.Title>
                      )}

                      {(typeDialog === 'premium' || typeDialog === 'paywall') &&
                        !showContinueVerify && (
                          <>
                            {showUserWithSubs ? (
                              <>
                                <S.Text
                                  c="gray"
                                  s="14"
                                  lh="28"
                                  className="mt-10 mb-20 center">
                                  Sigue disfrutando del contenido exclusivo que
                                  tenemos para ti
                                </S.Text>

                                <S.Button
                                  id="btn-premium-continue"
                                  type="button"
                                  color={mainColorBtn}
                                  onClick={() => {
                                    Taggeo(
                                      `Web_${typeDialog}_Hard`,
                                      `web_${typeDialog}_boton_sigue_navegando`
                                    )
                                    if (
                                      window.sessionStorage.getItem(
                                        'paywall_last_url'
                                      ) &&
                                      window.sessionStorage.getItem(
                                        'paywall_last_url'
                                      ) !== ''
                                    ) {
                                      window.location.href = window.sessionStorage.getItem(
                                        'paywall_last_url'
                                      )
                                    } else {
                                      onClose()
                                    }
                                  }}>
                                  SIGUE NAVEGANDO
                                </S.Button>
                              </>
                            ) : (
                              <S.Button
                                type="button"
                                color={mainColorBtn}
                                onClick={() => {
                                  Taggeo(
                                    `Web_Sign_Wall_${typeDialog}`,
                                    `web_sw${typeDialog[0]}_boton_ver_planes`
                                  )
                                  handleSuscription()
                                }}>
                                VER PLANES
                              </S.Button>
                            )}
                          </>
                        )}

                      {(showContinueVerify || !activeVerifyEmail) && (
                        <>
                          <S.Text
                            c="gray"
                            s="14"
                            lh="22"
                            className="mt-10 mb-20 center">
                            Revisa tu bandeja de correo para confirmar tu
                            {showContinueVerify
                              ? ` registro y sigue navegando`
                              : ` solicitud de registro`}
                          </S.Text>
                          <S.Button
                            type="button"
                            color={mainColorBtn}
                            onClick={() => {
                              Taggeo(
                                `Web_Sign_Wall_${typeDialog}`,
                                `web_sw${typeDialog[0]}_registro_continuar_navegando`
                              )
                              if (typeDialog === 'students') {
                                if (showContinueVerify) {
                                  value.changeTemplate('login', '', remail)
                                } else {
                                  setShowStudents(!showStudents)
                                }
                              } else {
                                const btnSignwall = document.getElementById(
                                  'signwall-nav-btn'
                                )
                                if (
                                  typeDialog === 'newsletter' &&
                                  btnSignwall
                                ) {
                                  btnSignwall.textContent = 'Bienvenido'
                                }
                                if (showContinueVerify) {
                                  value.changeTemplate('login', '', remail)
                                } else {
                                  onClose()
                                }
                              }
                            }}>
                            CONTINUAR
                          </S.Button>
                        </>
                      )}

                      {showContinueVerify && (
                        <S.Text c="black" s="12" className="mt-20 mb-10 center">
                          ¿No recibiste el correo?
                          <br />
                          {!showSendEmail ? (
                            <S.Link
                              href="#"
                              c={mainColorLink}
                              fw="bold"
                              className="ml-10"
                              onClick={sendVerifyEmail}>
                              Reenviar correo de activación
                            </S.Link>
                          ) : (
                            <span>
                              Podrás reenviar nuevamente dentro de
                              <strong id="countdown"> 10 </strong> segundos
                            </span>
                          )}
                        </S.Text>
                      )}
                    </>
                  )}
                </S.Form>
              )}
            </>
          )}

          {showStudents && typeDialog === 'students' && (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <FormStudents {...props} />
          )}
        </>
      )}
    </ModalConsumer>
  )
}

export default FormRegister
