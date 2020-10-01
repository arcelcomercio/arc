/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
// import { sha256 } from 'js-sha256'
import * as S from './styles'
import { ButtonSocial, AuthURL } from './control_social'
import { ModalConsumer } from '../context'
import { MsgRegister, Back } from '../iconos'
import { CheckBox } from './control_checkbox'
import { Input } from './control_input_select'
import getCodeError from '../../_dependencies/codes_error'
import useForm from '../../_dependencies/useForm'
import getDevice from '../../_dependencies/get-device'
import { FormStudents } from './form_students'
import Domains from '../../_dependencies/domains'
// import Cookies from '../../_dependencies/cookies'
import Services from '../../_dependencies/services'
import Taggeo from '../../_dependencies/taggeo'
import Loading from '../loading'

const FormRegister = props => {
  const {
    typeDialog,
    onClose,
    onLogged = i => i,
    onLoggedFail = i => i,
    arcSite,
    isFia,
    handleCallToAction,
    siteProperties: {
      signwall: {
        mainColorLink,
        mainColorBtn,
        mainColorBr,
        authProviders = [],
      },
      activeNewsletter = false,
    },
    // removeBefore = i => i,
  } = props

  const [showError, setShowError] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showStudents, setShowStudents] = useState(false)
  const [showChecked, setShowChecked] = useState(false)
  const [showFormatInvalid, setShowFormatInvalid] = useState('')
  const [showCheckPremium, setShowCheckPremium] = useState(false)
  const [showUserWithSubs, setShowUserWithSubs] = useState(false)
  const [showSendEmail, setShowSendEmail] = useState(false)

  const stateSchema = {
    remail: { value: '', error: '' },
    rpass: { value: '', error: '' },
    rterms: { value: '', error: '' },
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
        func: value => {
          if (value.length >= 8) {
            return true
          }
          return false
        },
        error: 'Mínimo 8 caracteres',
      },
    },
    rterms: {
      required: true,
      validator: {
        func: value => value !== '1',
        error:
          'Para ser parte de nuestra comunidad es necesario aceptar los términos y condiciones',
      },
    },
  }

  // const handleSuscription = () => {
  //   if (typeDialog === 'premium') {
  //     window.sessionStorage.setItem(
  //       'paywall_last_url',
  //       window.location.pathname ? window.location.pathname : ''
  //     )
  //   } else {
  //     window.sessionStorage.setItem(
  //       'paywall_last_url',
  //       window.document.referrer
  //         ? window.document.referrer.split(window.location.origin)[1]
  //         : ''
  //     )
  //   }
  //   removeBefore() // dismount before
  //   window.location.href = Domains.getUrlPaywall(arcSite)
  //   window.sessionStorage.setItem('paywall_type_modal', typeDialog)
  // }

  const handleGetProfile = () => {
    setShowConfirm(true)
    window.localStorage.removeItem('ArcId.USER_INFO')
    window.localStorage.removeItem('ArcId.USER_PROFILE')
    window.Identity.userProfile = null
    window.Identity.userIdentity = {}
    // window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
    // window.Identity.getUserProfile()
    //   .then(profile => {
    //     Cookies.setCookie('arc_e_id', sha256(profile.email), 365)

    //     const USER_IDENTITY = JSON.stringify(window.Identity.userIdentity || {})
    //     Cookies.setCookieDomain('ArcId.USER_INFO', USER_IDENTITY, 1, arcSite)

    //     if (activeNewsletter) {
    //       Services.sendNewsLettersUser(
    //         window.Identity.userIdentity.uuid,
    //         profile.email,
    //         arcSite,
    //         window.Identity.userIdentity.accessToken,
    //         ['general']
    //       ).then(() => {
    //         setShowConfirm(true)
    //         onLogged(profile)
    //       })
    //     } else {
    //       setShowConfirm(true)
    //       onLogged(profile)
    //     }
    //   })
    //   .catch(() => {
    //     Taggeo(
    //       `Web_Sign_Wall_${typeDialog}`,
    //       `web_sw${typeDialog[0]}_registro_error_registrarme`
    //     )
    //   })
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

  const handleFia = () => {
    if (typeof window !== 'undefined' && isFia) {
      handleCallToAction(true)
    }
    return null
  }

  const onSubmitForm = state => {
    const { remail, rpass } = state
    setShowLoading(true)
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
            value: '1',
            type: 'String',
          },
        ],
      },
      { doLogin: false },
      { rememberMe: false }
    )
      .then(() => {
        handleGetProfile()
        Taggeo(
          `Web_Sign_Wall_${typeDialog}`,
          `web_sw${typeDialog[0]}_registro_success_registrarme`
        )
        handleFia()
      })
      .catch(errLogin => {
        setShowError(getCodeError(errLogin.code))
        onLoggedFail(errLogin)
        setShowLoading(false)
        Taggeo(
          `Web_Sign_Wall_${typeDialog}`,
          `web_sw${typeDialog[0]}_registro_error_registrarme`
        )
      })
  }

  const getListSubs = () => {
    return window.Identity.extendSession().then(resExt => {
      const checkEntitlement = Services.getEntitlement(
        resExt.accessToken,
        arcSite
      )
        .then(res => {
          if (res.skus) {
            const result = Object.keys(res.skus).map(key => {
              return res.skus[key].sku
            })
            return result
          }
          return []
        })
        .catch(err => window.console.error(err))

      return checkEntitlement
    })
  }

  const checkUserSubs = () => {
    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })

    if (typeDialog === 'premium' || typeDialog === 'paywall') {
      setShowCheckPremium(true)

      getListSubs()
        .then(p => {
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

  const checkFormat = e => {
    if (e.target.value.indexOf(' ') >= 0) {
      setShowFormatInvalid('No se permite espacios')
    } else {
      setShowFormatInvalid('')
    }
  }

  const {
    values: { remail, rpass },
    errors: { remail: remailError, rpass: rpassError, rterms: rtermsError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm)

  const sendVerifyEmail = e => {
    e.preventDefault()
    setShowSendEmail(true)
    window.Identity.requestVerifyEmail(remail)
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
      {value => (
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

                      {authProviders.map(item => (
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

                      <S.Text c="gray" s="14" className="mt-20 center">
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
                                onClick={e => {
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
                        name="remail"
                        placeholder="Correo electrónico*"
                        autoComplete="on"
                        required
                        value={remail}
                        onChange={e => {
                          handleOnChange(e)
                          setShowError(false)
                        }}
                        error={remailError}
                      />

                      <Input
                        type="password"
                        name="rpass"
                        placeholder="Contraseña*"
                        autoComplete="off"
                        required
                        value={rpass}
                        onChange={e => {
                          handleOnChange(e)
                          setShowError(false)
                          checkFormat(e)
                        }}
                        error={rpassError || showFormatInvalid}
                      />

                      <CheckBox
                        checked={showChecked}
                        value={showChecked ? '1' : '0'}
                        name="rterms"
                        onChange={e => {
                          handleOnChange(e)
                          setShowChecked(!showChecked)
                          setShowError(false)
                        }}
                        valid
                        error={rtermsError}>
                        <S.Text c="gray" lh="18" s="12" className="mt-10">
                          Al crear la cuenta acepto los
                          <S.Link
                            href={Domains.getPoliticsTerms('terms', arcSite)}
                            target="_blank"
                            c={mainColorLink}
                            fw="bold"
                            className="ml-10 mr-10 inline">
                            Términos y Condiciones
                          </S.Link>
                          y
                          <S.Link
                            href={Domains.getPoliticsTerms('politics', arcSite)}
                            target="_blank"
                            c={mainColorLink}
                            fw="bold"
                            className="ml-10 inline">
                            Políticas de Privacidad
                          </S.Link>
                        </S.Text>
                      </CheckBox>

                      <S.Button
                        color={mainColorBtn}
                        type="submit"
                        className="mt-20 mb-10"
                        disabled={disable || showLoading || showFormatInvalid}
                        onClick={() =>
                          Taggeo(
                            `Web_Sign_Wall_${typeDialog}`,
                            `web_sw${typeDialog[0]}_registro_boton_registrarme`
                          )
                        }>
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
                          ? `Bienvenido(a) ${window.Identity.userProfile
                              .firstName || 'Usuario'}`
                          : 'Tu cuenta ha sido creada correctamente'}
                      </S.Title>

                      <S.Title s="14" c="#6a6a6a" className="center">
                        {remail}
                      </S.Title>

                      {(typeDialog === 'premium' || typeDialog === 'paywall') &&
                        showUserWithSubs && (
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
                        )}

                      <S.Text
                        c="gray"
                        s="14"
                        lh="22"
                        className="mt-10 mb-20 center">
                        Revisa tu bandeja de correo para confirmar tu registro y
                        sigue navegando
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
                            // setShowStudents(!showStudents)
                            value.changeTemplate('login', '', remail)
                          } else {
                            const btnSignwall = document.getElementById(
                              'signwall-nav-btn'
                            )
                            if (typeDialog === 'newsletter' && btnSignwall) {
                              btnSignwall.textContent = 'Bienvenido'
                            }
                            // onClose()
                            value.changeTemplate('login', '', remail)
                          }
                        }}>
                        CONTINUAR
                      </S.Button>

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
                    </>
                  )}
                </S.Form>
              )}
            </>
          )}

          {showStudents && typeDialog === 'students' && (
            <FormStudents {...props} />
          )}
        </>
      )}
    </ModalConsumer>
  )
}

export default FormRegister
