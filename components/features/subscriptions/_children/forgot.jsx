import Identity from '@arc-publishing/sdk-identity'
import { getProperties } from 'fusion:properties'
import * as React from 'react'

import { MsgForgotPass } from '../../signwall/_children/icons'
import { useNavigateContext } from '../_context/navigate'
import getCodeError, { formatEmail } from '../_dependencies/Errors'
import { PropertiesCommon } from '../_dependencies/Properties'
import { Taggeo } from '../_dependencies/Taggeo'
import useForm from '../_hooks/useForm'

const styles = {
  title: 'step__left-title',
  block: 'step__left-block',
  btn: 'step__left-btn-next',
  link: 'step__btn-link',
  center: 'step__left-align-center',
  backLogin: 'step__left-link-register',
  textNotice: 'step__left-text-notice',
}

const Forgot = ({ typeDialog, arcSite }) => {
  const { changeTemplate } = useNavigateContext()
  const [loading, setLoading] = React.useState(false)
  const [msgError, setMsgError] = React.useState(false)
  const [showConfirm, setShowConfirm] = React.useState(false)
  const [registerLink, setRegisterLink] = React.useState()
  const [showVerify, setShowVerify] = React.useState()
  const [showSendEmail, setShowSendEmail] = React.useState(false)
  const { texts } = PropertiesCommon
  const { activeMagicLink } = getProperties(arcSite)

  const stateSchema = {
    femail: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    femail: {
      required: true,
      validator: formatEmail(),
    },
  }

  const nameTagCategory = `Web_Sign_Wall_${typeDialog}`

  const onFomrForgot = ({ femail }) => {
    if (typeof window !== 'undefined') {
      Taggeo(
        nameTagCategory,
        `web_sw${typeDialog[0]}_contrasena_boton_recuperar`
      )
      setLoading(true)
      Identity.requestResetPassword(femail)
        .then(() => {
          setShowConfirm(true)
          Taggeo(
            nameTagCategory,
            `web_sw${typeDialog[0]}_contrasena_success_boton`
          )
        })
        .catch((err) => {
          setRegisterLink(err.code === '300030')
          setShowVerify(err.code === '130051')
          setLoading(false)
          if (err.code === '130051') {
            setMsgError(getCodeError('verifyReset'))
            Taggeo(
              nameTagCategory,
              `web_sw${typeDialog[0]}_contrasena_show_reenviar_correo`
            )
          } else {
            setMsgError(getCodeError(err.code))
            Taggeo(
              nameTagCategory,
              `web_sw${typeDialog[0]}_contrasena_error_boton`
            )
          }
        })
    }
  }

  const {
    values: { femail },
    errors: { femail: femailError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onFomrForgot)

  const handleChangeInput = (e) => {
    handleOnChange(e)
    setMsgError(false)
  }

  const sendVerifyEmail = () => {
    setShowSendEmail(true)
    if (activeMagicLink) {
      Identity.requestOTALink(femail)
    } else {
      Identity.requestVerifyEmail(femail)
    }
    Taggeo(nameTagCategory, `web_sw${typeDialog[0]}_contrasena_reenviar_correo`)
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
          <h2 className={styles.title}> {texts.forgot}</h2>
          <h3 className={styles.textNotice}>{texts.subtitleForgot}</h3>
          {msgError && (
            <div className={styles.block}>
              <div className={showVerify ? ' msg-warning' : 'msg-alert'}>
                {` ${msgError} `}

                {registerLink && (
                  <button
                    className={styles.link}
                    type="button"
                    onClick={() => changeTemplate('register')}>
                    Registrar
                  </button>
                )}

                {showVerify && (
                  <>
                    <br />
                    {!showSendEmail ? (
                      <button
                        className="step__btn-link"
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
                  </>
                )}
              </div>
            </div>
          )}
          <form onSubmit={handleOnSubmit}>
            <div className={styles.block}>
              <label htmlFor="femail">
                Correo electrónico
                <input
                  className={femailError && 'input-error'}
                  type="text"
                  inputMode="email"
                  autoComplete="email"
                  name="femail"
                  required
                  value={femail}
                  onChange={handleChangeInput}
                  onBlur={handleOnChange}
                  disabled={loading}
                />
                {femailError && (
                  <span className="msn-error">{femailError}</span>
                )}
              </label>
            </div>
            <div className={styles.block}>
              <button
                className={`${styles.btn} ${loading && 'btn-loading'}`}
                type="submit"
                disabled={disable || loading}>
                {loading ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
            <p className={styles.backLogin}>
              {texts.backLogin}
              <button
                className={styles.link}
                type="button"
                onClick={() => {
                  changeTemplate('login')
                  Taggeo(
                    nameTagCategory,
                    `web_sw${typeDialog[0]}_contrasena_link_volver`
                  )
                }}>
                Inciar Sesión
              </button>
            </p>
          </form>
        </>
      ) : (
        <div className={styles.center}>
          <MsgForgotPass bgcolor="#fff" style={{ marginBottom: '20px' }} />
          <h2 className={styles.title}>Correo enviado</h2>
          <h3 className={styles.textNotice}>{texts.msgForgotOk}</h3>
          <div className={styles.block}>
            <button
              className={styles.btn}
              type="button"
              onClick={() => {
                changeTemplate('login', femail)
                Taggeo(
                  nameTagCategory,
                  `web_sw${typeDialog[0]}_contrasena_boton_aceptar`
                )
              }}>
              Aceptar
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Forgot
