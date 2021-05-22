import PropTypes from 'prop-types'
import * as React from 'react'

import { NavigateConsumer } from '../_context/navigate'
import getCodeError, {
  acceptCheckTerms,
  formatEmail,
  formatPhone,
} from '../_dependencies/Errors'
import getDevice from '../_dependencies/GetDevice'
import { MsgRegister } from '../_dependencies/Icons'
import { PropertiesCommon } from '../_dependencies/Properties'
import { sendNewsLettersUser } from '../_dependencies/Services'
import { Taggeo } from '../_dependencies/Taggeo'
import { isFbBrowser } from '../_dependencies/Utils'
import useForm from '../_hooks/useForm'
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

const nameTagCategory = 'Web_Sign_Wall_Landing'

const Register = ({ arcSite }) => {
  const { changeTemplate } = React.useContext(NavigateConsumer)
  const [loading, setLoading] = React.useState()
  const [loadText, setLoadText] = React.useState('Cargando...')
  const [msgError, setMsgError] = React.useState()
  const [checkedTerms, setCheckedTerms] = React.useState(false)
  const [checkedPolits, setCheckedPolits] = React.useState(true)
  const [forgotLink, setForgotLink] = React.useState()
  const [showHidePass, setShowHidePass] = React.useState('password')
  const [showConfirm, setShowConfirm] = React.useState(false)
  const [showSendEmail, setShowSendEmail] = React.useState(false)
  const { texts, urls } = PropertiesCommon

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
      validator: {
        func: (value) => value.length >= 8,
        error: 'Mínimo 8 caracteres',
      },
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

  const openTerminos = () => {
    if (typeof window !== 'undefined') {
      window.open(
        `${
          arcSite === 'depor'
            ? '/terminos-servicio/'
            : '/terminos-y-condiciones/'
        }`,
        '_blank'
      )
    }
  }

  const openPoliticas = () => {
    if (typeof window !== 'undefined') {
      window.open(
        (() => {
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
        })(),
        '_blank'
      )
    }
  }

  const dataTreatment = () => {
    if (typeof window !== 'undefined') {
      window.open('/tratamiento-de-datos/', '_blank')
    }
  }

  const onFormRegister = ({ remail, rpass, rphone }) => {
    if (typeof window !== 'undefined') {
      Taggeo(nameTagCategory, 'web_swl_registro_boton_registrarme')
      setLoading(true)
      setLoadText('Registrando...')

      const contacts =
        rphone.length >= 6 ? [{ phone: rphone.trim(), type: 'PRIMARY' }] : []

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
              value: 'landing',
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
        },
        { doLogin: true },
        { rememberMe: true }
      )
        .then((resSignUp) => {
          setShowConfirm(true)

          setLoadText('Cargando Perfil...')
          window.Identity.getUserProfile().then((resProfile) => {
            setLoadText('Cargando Servicios...')
            sendNewsLettersUser(
              urls.newsLetters,
              resProfile.uuid,
              resProfile.email,
              arcSite,
              resSignUp.accessToken || window.Identity.userIdentity.accessToken,
              ['general']
            )
              .then(() => {
                window.localStorage.removeItem('ArcId.USER_INFO')
                window.localStorage.removeItem('ArcId.USER_PROFILE')
                window.Identity.userProfile = null
                window.Identity.userIdentity = {}
              })
              .finally(() => {
                Taggeo(nameTagCategory, 'web_swl_registro_success_registrarme')
              })
          })
        })
        .catch((err) => {
          setMsgError(getCodeError(err.code))
          setForgotLink(err.code === '300039')
          setLoading(false)
          Taggeo(nameTagCategory, 'web_swl_registro_error_registrarme')
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
    window.Identity.requestVerifyEmail(remail)
    Taggeo(nameTagCategory, 'web_swl_registro_reenviar_correo')
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

  return (
    <>
      {!showConfirm ? (
        <>
          <h2 className={styles.title}>{texts.register}</h2>
          <div
            className={`${styles.blockMiddle} ${
              isFbBrowser() && styles.blockFull
            }`}>
            <ButtonSocial
              arcSocial="facebook"
              arcSite={arcSite}
              arcType="registro"
              dataTreatment={checkedPolits ? '1' : '0'}
            />
            {!isFbBrowser() && (
              <ButtonSocial
                arcSocial="google"
                arcSite={arcSite}
                arcType="registro"
                dataTreatment={checkedPolits ? '1' : '0'}
              />
            )}
          </div>

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
                {rpassError && <span className="msn-error">{rpassError}</span>}
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
                Al registrarme por redes sociales o por este formulario autorizo
                el uso de mis datos para{' '}
                <button
                  className={styles.link}
                  type="button"
                  onClick={dataTreatment}>
                  fines adicionales
                </button>
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
                <button
                  className={styles.link}
                  type="button"
                  onClick={() => openTerminos()}>
                  {texts.terms}
                </button>
                {texts.and}
                <button
                  className={styles.link}
                  type="button"
                  onClick={() => openPoliticas()}>
                  {texts.policies}
                </button>
                <span className={`checkmark ${rtermsError && 'input-error'}`} />
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
                Taggeo(nameTagCategory, 'web_swl_registro_link_volver')
              }}>
              Iniciar Sesión
            </button>
          </p>
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
