import Identity from '@arc-publishing/sdk-identity'
import { useFusionContext } from 'fusion:context'
import PropTypes from 'prop-types'
import * as React from 'react'

import { deleteQuery } from '../../../utilities/parse/queries'
import { AuthURL } from '../../signwall/_children/forms/control_social'
import { MsgRegister } from '../../signwall/_children/icons'
import {
  dataTreatment,
  PolicyPrivacy,
  TermsConditions,
} from '../../signwall/_dependencies/domains'
import { useAuthContext } from '../_context/auth'
import { useNavigateContext } from '../_context/navigate'
import getCodeError, {
  acceptCheckTerms,
  formatEmail,
  formatPass,
  formatPhone,
} from '../_dependencies/Errors'
import getDevice from '../_dependencies/GetDevice'
import { PropertiesCommon } from '../_dependencies/Properties'
import { sendNewsLettersUser } from '../_dependencies/Services'
import { Taggeo } from '../_dependencies/Taggeo'
import { isFbBrowser } from '../_dependencies/Utils'
import useForm from '../_hooks/useForm'
import AuthFacebookGoogle from './auth-facebook-google'
import ButtonSocial from './social'

const styles = {
  title: 'step__left-title',
  blockMiddle: 'step__left-block-middle',
  titleLine: 'step__left-title-line',
  block: 'step__left-block',
  blockFull: 'step__left-block-full',
  btnShow: 'step__left-btn-show',
  btn: 'step__left-btn-next',
  link: 'step__btn-link',
  backLogin: 'step__left-link-register',
  center: 'step__left-align-center',
  textNotice: 'step__left-text-notice',
  textBlock: 'step__left-textblock',
}

const Register = ({ arcSite, handleCallToAction, isFia, typeDialog }) => {
  const { activateAuth, updateStep } = useAuthContext()
  const { changeTemplate } = useNavigateContext()
  const [loading, setLoading] = React.useState()
  const [loadText, setLoadText] = React.useState('Cargando...')
  const [msgError, setMsgError] = React.useState()
  const [checkedTerms, setCheckedTerms] = React.useState(false)
  const [checkedPolits, setCheckedPolits] = React.useState(true)
  const [forgotLink, setForgotLink] = React.useState()
  const [showHidePass, setShowHidePass] = React.useState('password')
  const [showConfirm, setShowConfirm] = React.useState(false)
  const [showSendEmail, setShowSendEmail] = React.useState(false)
  const [hideFormRegister, setHideFormRegister] = React.useState(false)
  const { texts, urls } = PropertiesCommon

  const {
    customFields: { disableAuthSocialArc = false } = {},
    siteProperties: { activeNewsletter, activeMagicLink },
  } = useFusionContext() || {}

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

  const nameTagCategory = `Web_Sign_Wall_${typeDialog}`

  const onFormRegister = ({ remail, rpass, rphone }) => {
    if (typeof window !== 'undefined') {
      Taggeo(
        nameTagCategory,
        `web_sw${typeDialog[0]}_registro_boton_registrarme`,
        arcSite
      )
      setLoading(true)
      setLoadText('Registrando...')

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
              value: typeDialog || 'landing',
              type: 'String',
            },
            {
              name: 'termsCondPrivaPoli',
              value: checkedTerms ? '1' : '0',
              type: 'String',
            },
            {
              name: 'dataTreatment',
              value: checkedPolits ? '1' : '0',
              type: 'String',
            },
          ],
        }
      )
        .then((resSignUp) => {
          setShowConfirm(true)
          setLoadText('Cargando Perfil...')
          if (activeMagicLink) {
            // requestVerifyEmail se ejecuta automáticamente con el SignUp
            Identity.requestOTALink(resSignUp.profile.email)
          }
          Identity.getUserProfile().then((resProfile) => {
            setLoadText('Cargando Servicios...')
            sendNewsLettersUser(
              urls.newsLetters,
              resProfile.uuid,
              resProfile.email,
              arcSite,
              resSignUp.accessToken || Identity.userIdentity.accessToken,
              ['general']
            )
              .then(() => {
                window.localStorage.removeItem('ArcId.USER_INFO')
                window.localStorage.removeItem('ArcId.USER_PROFILE')
                Identity.userProfile = null
                Identity.userIdentity = {}
              })
              .finally(() => {
                Taggeo(
                  nameTagCategory,
                  `web_sw${typeDialog[0]}_registro_success_registrarme`,
                  arcSite
                )
              })
          })
        })
        .catch((err) => {
          setMsgError(getCodeError(err.code))
          setForgotLink(err.code === '300039')
          setLoading(false)
          Taggeo(
            nameTagCategory,
            `web_sw${typeDialog[0]}_registro_error_registrarme`,
            arcSite
          )
        })
    }
  }

  const {
    values: { remail, rphone, rpass },
    errors: {
      remail: remailError,
      rphone: rphoneError,
      rpass: rpassError,
      rterms: rtermsError,
    },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onFormRegister)

  const handleChangeInput = (e) => {
    handleOnChange(e)
    setMsgError(false)
  }

  const toogleHidePass = () => {
    if (showHidePass === 'password') setShowHidePass('text')
    else setShowHidePass('password')
  }

  const sendVerifyEmail = () => {
    setShowSendEmail(true)
    if (activeMagicLink) {
      Identity.requestOTALink(remail)
    } else {
      Identity.requestVerifyEmail(remail)
    }
    Taggeo(
      nameTagCategory,
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

  const onLoggedFia = (profile) => {
    activateAuth(profile)
    if (isFbBrowser) {
      deleteQuery('signFia')
      deleteQuery('signLanding')
      deleteQuery('dataTreatment')
      setTimeout(() => {
        updateStep(2)
        window.location.reload()
      }, 1000)
    }
    if (isFia) {
      handleCallToAction(true)
    }
  }

  const loginSuccessFabebook = () => {
    Identity.getUserProfile().then((resProfile) => {
      activateAuth(resProfile)
      updateStep(2)
    })
  }

  const loginFailedFacebook = () => setMsgError(getCodeError())

  return (
    <>
      {!showConfirm ? (
        <>
          <h2 className={styles.title}>{texts.register}</h2>

          {disableAuthSocialArc ? (
            <AuthFacebookGoogle
              hideFormParent={() => setHideFormRegister(!hideFormRegister)}
              onAuthSuccess={loginSuccessFabebook}
              onAuthFailed={loginFailedFacebook}
              typeDialog={typeDialog}
              dataTreatment={checkedPolits ? '1' : '0'}
              arcSite={arcSite}
              arcType="registro"
              activeNewsletter={activeNewsletter}
            />
          ) : (
            <div
              className={`${styles.blockMiddle} ${isFbBrowser ? styles.blockFull : ''
                }`}>
              <ButtonSocial
                arcSocial="facebook"
                arcSite={arcSite}
                arcType="registro"
                dataTreatment={checkedPolits ? '1' : '0'}
                typeDialog={typeDialog}
              />
              {!isFbBrowser && (
                <ButtonSocial
                  arcSocial="google"
                  arcSite={arcSite}
                  arcType="registro"
                  dataTreatment={checkedPolits ? '1' : '0'}
                  typeDialog={typeDialog}
                />
              )}
              {isFbBrowser && (
                <AuthURL
                  arcSite={arcSite}
                  onClose={() => { }}
                  typeDialog={typeDialog}
                  activeNewsletter
                  typeForm="registro"
                  onLogged={onLoggedFia}
                  checkUserSubs={() => { }}
                />
              )}
            </div>
          )}

          {!hideFormRegister && (
            <>
              <div className={styles.titleLine}>
                <p className="large">{texts.orEnterDates}</p>
              </div>

              {msgError && (
                <div className={styles.block}>
                  <div className="msg-alert">
                    {` ${msgError} `}
                    {forgotLink && (
                      <>
                        <button
                          className={styles.link}
                          type="button"
                          onClick={() => changeTemplate('forgot')}>
                          Recuperar contraseña
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleOnSubmit} className="form-register">
                <div className={styles.block}>
                  <label htmlFor="remail">
                    Correo electrónico*
                    <input
                      className={remailError && 'input-error'}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      name="remail"
                      value={remail}
                      required
                      onChange={handleChangeInput}
                      onBlur={handleOnChange}
                      disabled={loading}
                    />
                    {remailError && (
                      <span className="msn-error">{remailError}</span>
                    )}
                  </label>
                </div>

                <div className={styles.block}>
                  <label htmlFor="rpass">
                    Contraseña*
                    <input
                      className={rpassError && 'input-error'}
                      type={showHidePass}
                      autoComplete="new-password"
                      name="rpass"
                      value={rpass}
                      required
                      onChange={handleChangeInput}
                      onBlur={handleOnChange}
                      disabled={loading}
                    />
                    <button
                      name="lshowpass"
                      aria-label="lshowpass"
                      className={`${styles.btnShow}-${showHidePass}`}
                      type="button"
                      tabIndex={-1}
                      onClick={toogleHidePass}
                    />
                    {rpassError && (
                      <span className="msn-error">{rpassError}</span>
                    )}
                  </label>
                </div>

                <div className={styles.block}>
                  <label htmlFor="rphone">
                    Teléfono
                    <input
                      className={rphoneError && 'input-error'}
                      type="text"
                      inputMode="tel"
                      autoComplete="tel"
                      name="rphone"
                      value={rphone}
                      maxLength="12"
                      onChange={handleChangeInput}
                      onBlur={handleOnChange}
                      disabled={loading}
                    />
                    {rphoneError && (
                      <span className="msn-error">{rphoneError}</span>
                    )}
                  </label>
                </div>

                <div className={styles.block}>
                  <label htmlFor="rpolit" className="terms">
                    <input
                      id="rpolit"
                      type="checkbox"
                      name="rpolit"
                      value={checkedPolits ? '1' : '0'}
                      checked={checkedPolits}
                      disabled={loading}
                      onChange={(e) => {
                        handleOnChange(e)
                        setCheckedPolits(!checkedPolits)
                      }}
                    />
                    Al registrarme por redes sociales o por este formulario
                    autorizo el uso de mis datos para{' '}
                    <a
                      href={dataTreatment}
                      className={`${styles.link} link-color`}
                      target="_blank"
                      rel="noreferrer">
                      fines adicionales
                    </a>
                    <span className="checkmark" />
                  </label>
                </div>

                <div className={styles.block}>
                  <label htmlFor="rterms" className="terms">
                    <input
                      id="rterms"
                      type="checkbox"
                      name="rterms"
                      value={checkedTerms ? '1' : '0'}
                      checked={checkedTerms}
                      disabled={loading}
                      required
                      onChange={(e) => {
                        handleOnChange(e)
                        setCheckedTerms(!checkedTerms)
                      }}
                    />
                    {texts.accept}
                    <a
                      href={TermsConditions(arcSite)}
                      className={`${styles.link} link-color`}
                      target="_blank"
                      rel="noreferrer">
                      {texts.terms}
                    </a>
                    {texts.and}
                    <a
                      href={PolicyPrivacy(arcSite)}
                      className={`${styles.link} link-color`}
                      target="_blank"
                      rel="noreferrer">
                      {texts.policies}
                    </a>
                    <span
                      className={`checkmark ${rtermsError && 'input-error'}`}
                    />
                  </label>
                </div>

                {rtermsError && (
                  <div className={styles.block}>
                    <div className="msg-alert">{rtermsError}</div>
                  </div>
                )}

                <div className={styles.block}>
                  <button
                    className={`${styles.btn} ${loading && 'btn-loading'}`}
                    type="submit"
                    disabled={disable || loading}>
                    {loading ? loadText : 'Registrarme'}
                  </button>
                </div>
              </form>

              <p className={styles.backLogin}>
                {texts.hasAccount}
                <button
                  className={styles.link}
                  type="button"
                  onClick={() => {
                    changeTemplate('login')
                    Taggeo(
                      nameTagCategory,
                      `web_swl_registro_link_volver`,
                      arcSite
                    )
                  }}>
                  Iniciar Sesión
                </button>
              </p>
            </>
          )}
        </>
      ) : (
        <div className={styles.center}>
          <MsgRegister bgcolor="#fff" style={{ marginBottom: '20px' }} />
          <h2 className={styles.title}>{texts.registerSuccess}</h2>

          <span className={styles.textBlock}>{remail}</span>

          <h3 className={styles.textNotice}>{texts.checkInbox}</h3>

          <div className={styles.block}>
            <button
              className={styles.btn}
              type="button"
              onClick={() => {
                changeTemplate('login', remail)
              }}>
              Continuar
            </button>
          </div>

          <p className={styles.backLogin}>
            {texts.notReceiptEmail}
            <br />
            {!showSendEmail ? (
              <button
                className={styles.link}
                type="button"
                onClick={sendVerifyEmail}>
                {texts.reSendEmail}
              </button>
            ) : (
              <span>
                {texts.youCanSendEmail}
                <strong id="countdown"> 10 </strong> segundos
              </span>
            )}
          </p>
        </div>
      )}
    </>
  )
}

Register.propTypes = {
  arcSite: PropTypes.string.isRequired,
}

export default Register
