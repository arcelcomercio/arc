/* eslint-disable import/prefer-default-export */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { sha256 } from 'js-sha256'
import * as S from './styles'
import { ButtonSocial, ButtonEmail } from './control_social'
import { MsgRegister } from '../iconos'
import { ModalConsumer } from '../context'
import { Input } from './control_input_select'
import useForm from '../../_dependencies/useForm'
import getCodeError from '../../_dependencies/codes_error'
import Domains from '../../_dependencies/domains'
import Cookies from '../../_dependencies/cookies'
import Taggeo from '../../_dependencies/taggeo'
import Services from '../../_dependencies/services'
import Loading from '../loading'

export const FormLogin = ({
  typeDialog,
  onClose,
  arcSite,
  isFia,
  handleCallToAction,
  siteProperties: {
    signwall: {
      mainColorLink,
      mainColorBtn,
      primaryFont,
      mainColorBr,
      authProviders = [],
    },
    activeNewsletter = false,
    activePaywall,
  },
  removeBefore = i => i,
  onLogged = i => i,
}) => {
  const [showLoginEmail, setShowLoginEmail] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [showUserWithSubs, setShowUserWithSubs] = useState(false)
  const [showCheckPremium, setShowCheckPremium] = useState(false)
  const [showLoadingPremium, setShowLoadingPremium] = useState(true)
  const [showFormatInvalid, setShowFormatInvalid] = useState('')

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

  const checkUserSubs = () => {
    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })

    if (typeDialog === 'premium' || typeDialog === 'paywall') {
      setShowCheckPremium(true) // no tengo subs

      getListSubs().then(p => {
        if (p && p.length === 0) {
          setShowUserWithSubs(false) // no tengo subs
          setShowLoadingPremium(false)
        } else {
          setShowUserWithSubs(true) // tengo subs
          setShowLoadingPremium(false)
          const divPremium = document.getElementById('contenedor')
          if (divPremium) {
            divPremium.classList.remove('story-content__nota-premium')
          }
        }
      })
    }
  }

  const handleGetProfile = () => {
    setShowLoading(true)
    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
    window.Identity.getUserProfile().then(profile => {
      Cookies.setCookie('arc_e_id', sha256(profile.email), 365)

      const USER_IDENTITY = JSON.stringify(window.Identity.userIdentity || {})
      Cookies.setCookieDomain('ArcId.USER_INFO', USER_IDENTITY, 1, arcSite)

      if (typeDialog === 'premium' || typeDialog === 'paywall') {
        setShowCheckPremium(true) // no tengo subs

        getListSubs().then(p => {
          if (p && p.length === 0) {
            setShowUserWithSubs(false) // no tengo subs
            setShowLoadingPremium(false)
          } else {
            setShowUserWithSubs(true) // tengo subs
            setShowLoadingPremium(false)
            const divPremium = document.getElementById('contenedor')
            if (divPremium) {
              divPremium.classList.remove('story-content__nota-premium')
            }
          }
        })
      } else {
        onClose()
        if (
          typeDialog === 'organico' &&
          window.location.pathname.match(/newsletters/)
        ) {
          window.location.reload()
        }
      }
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
      typeDialog === 'organico' ? 'organico' : '1',
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

  const handleFia = () => {
    if (typeof window !== 'undefined' && isFia) {
      handleCallToAction(true)
    }
    return null
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
        taggeoSuccess()
        onLogged()
        handleFia()
      })
      .catch(errLogin => {
        if (errLogin.code === '300040' || errLogin.code === '300037') {
          sendEmailPass(lemail, lpass)
        } else {
          setShowError(getCodeError(errLogin.code))
          taggeoError()
        }
      })
      .finally(() => {
        setShowLoading(false)
      })
  }

  const checkFormat = e => {
    if (e.target.value.indexOf(' ') >= 0) {
      setShowFormatInvalid('No se permite espacios')
    } else {
      setShowFormatInvalid('')
    }
  }

  const { values, errors, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    stateValidatorSchema,
    onSubmitForm
  )

  const { lemail, lpass } = values

  return (
    <ModalConsumer>
      {value => (
        <>
          {!showCheckPremium ? (
            <S.Form onSubmit={handleOnSubmit} typeDialog={typeDialog}>
              {activePaywall && typeDialog !== 'premium' && (
                <S.Title
                  s="22"
                  primaryFont={primaryFont}
                  className="center mb-20 mt-20 only-mobile-tablet">
                  Regístrate y mantente siempre informado con las noticias más
                  relevantes del Perú y el mundo
                </S.Title>
              )}

              <S.Text c="gray" s="20" className="mb-20 mt-10 center">
                Ingresa con
              </S.Text>

              {authProviders.map(item => (
                <ButtonSocial
                  brand={item}
                  size={item === 'google' ? 'middle' : 'full'}
                  c="mb-10"
                  onClose={onClose}
                  typeDialog={typeDialog}
                  arcSite={arcSite}
                  typeForm="login"
                  activeNewsletter={activeNewsletter}
                  checkUserSubs={checkUserSubs}
                  onLogged={onLogged}
                />
              ))}

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
                  {showError && <S.Error>{showError}</S.Error>}

                  <Input
                    type="email"
                    name="lemail"
                    placeholder="Correo electrónico"
                    autoComplete="on"
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
                      checkFormat(e)
                    }}
                    error={errors.lpass || showFormatInvalid}
                  />

                  <S.Link
                    href="#"
                    c="gray"
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
                    disabled={disable || showLoading || showFormatInvalid}
                    onClick={() =>
                      Taggeo(
                        `Web_Sign_Wall_${typeDialog}`,
                        `web_sw${typeDialog[0]}_login_boton_ingresar`
                      )
                    }>
                    {showLoading ? 'CARGANDO...' : 'INICIA SESIÓN'}
                  </S.Button>
                </>
              )}

              <S.Text c="black" s="12" className="mt-10 mb-10 center">
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

              <S.Text c="light" s="10" className="mt-10 mb-10 center">
                CON TUS DATOS, MEJORAREMOS TU EXPERIENCIA DE <br /> NAVEGACIÓN Y
                NUNCA PUBLICAREMOS SIN TU PERMISO
              </S.Text>
            </S.Form>
          ) : (
            <>
              {showLoadingPremium ? (
                <Loading arcSite={arcSite} typeBg="wait" />
              ) : (
                <S.Form>
                  <div className="center block mb-20 mt-20">
                    <MsgRegister bgcolor={mainColorBr} />
                  </div>

                  <S.Title s="22" className="center mb-10">
                    {`Bienvenido(a) ${window.Identity.userProfile.firstName ||
                      'Usuario'} `}
                  </S.Title>
                  <S.Text
                    c="gray"
                    s="14"
                    lh="28"
                    className="mt-10 mb-20 center">
                    {showUserWithSubs
                      ? 'Sigue disfrutando del contenido exclusivo que tenemos para ti'
                      : 'Ahora puedes continuar con tu compra'}
                  </S.Text>

                  {showUserWithSubs ? (
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
                          window.sessionStorage.hasOwnProperty(
                            'paywall_last_url'
                          ) &&
                          window.sessionStorage.getItem('paywall_last_url') !==
                            ''
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
                  ) : (
                    <S.Button
                      type="button"
                      color={mainColorBtn}
                      onClick={() => {
                        Taggeo(
                          `Web_${typeDialog}_Hard`,
                          `web_${typeDialog}_boton_ver_planes`
                        )
                        handleSuscription()
                      }}>
                      VER PLANES
                    </S.Button>
                  )}
                </S.Form>
              )}
            </>
          )}
        </>
      )}
    </ModalConsumer>
  )
}
