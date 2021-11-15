/* eslint-disable jsx-a11y/anchor-is-valid */
import Identity from '@arc-publishing/sdk-identity'
import * as React from 'react'

import { isProd } from '../../../../utilities/arc/env'
import {
  deleteCookie,
  getCookie,
  setCookie,
} from '../../../../utilities/client/cookies'
import { extendSession } from '../../../../utilities/subscriptions/identity'
import useForm from '../../../subscriptions/_hooks/useForm'
import { checkCodeStudents, checkStudents } from '../../_dependencies/services'
import { Back } from '../icons'
import { Input, Select } from './control_input_select'

const cookieStudents = 'EcoId.REQUEST_STUDENTS'

const FormCode = ({ arcSite, showRequest }) => {
  const [showError, setShowError] = React.useState(false)
  const [showLoading, setShowLoading] = React.useState(false)
  const [showLinkMail, setShowLinkMail] = React.useState(true)
  const EMAIL_USER = JSON.parse(getCookie(cookieStudents)).uemail || ''

  const stateSchema = {
    ucode: { value: '', error: '' },
  }

  const stateValidSchema = {
    ucode: {
      required: true,
      validator: {
        func: (value) => /^[a-zA-Z0-9]{8,10}$/.test(value),
        error: 'Formato inválido',
      },
    },
  }

  const sendRequestMail = () => {
    const REQUEST = JSON.parse(getCookie(cookieStudents))
    extendSession()
      .then((resExtend) => {
        checkStudents(
          REQUEST.uemail,
          REQUEST.udate,
          REQUEST.ugrade,
          arcSite,
          resExtend.accessToken
        )
          .then((resOk) => {
            if (resOk.status) {
              setShowLinkMail(false)
              setTimeout(() => {
                setShowLinkMail(true)
              }, 10000)
            }
          })
          .catch((resErr) => {
            setShowError(resErr.message)
          })
      })
      .catch((resErr) => {
        setShowError(`Ocurrió un error inesperado. ${resErr.message}`)
      })
  }

  const onSubmitFormCode = ({ ucode }) => {
    setShowLoading(true)
    extendSession()
      .then((resExtend) => {
        checkCodeStudents(
          ucode.trim(),
          EMAIL_USER,
          arcSite,
          resExtend.accessToken
        )
          .then((resCode) => {
            if (resCode.status) {
              deleteCookie(cookieStudents)
              setTimeout(() => {
                window.location.href = isProd
                  ? `/suscripcionesdigitales/DNI/00000000/${resCode.token}/`
                  : `/suscripcionesdigitales/DNI/00000000/${resCode.token}/?outputType=subscriptions`
              }, 1000)
            } else {
              setShowLoading(false)
              setShowError(resCode.message)
            }
          })
          .catch(() => {
            setShowLoading(false)
            setShowError('Oops. Ocurrió un error inesperado.')
          })
      })
      .catch((resErr) => {
        setShowLoading(false)
        setShowError(`Ocurrió un error inesperado. ${resErr.message}`)
      })
  }

  const { values, errors, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    stateValidSchema,
    onSubmitFormCode
  )

  const { ucode } = values

  return (
    <form className="signwall-inside_forms-form" onSubmit={handleOnSubmit}>
      <button
        className="signwall-inside_forms-btn-base mb-10"
        type="button"
        onClick={() => {
          deleteCookie(cookieStudents)
          showRequest()
        }}>
        <Back /> Volver
      </button>

      <h4 className="signwall-inside_forms-title center mb-10 mt-20" cp>
        PLAN UNIVERSITARIO
      </h4>

      <p
        style={{
          lineHeight: '28px',
          color: '#818181',
        }}
        className="signwall-inside_forms-text mb-20 center">
        Ingresa aquí el código de validación que <br /> hemos enviado a tu
        bandeja de correo:
        <br />
        <strong>{EMAIL_USER}</strong>
      </p>

      {showError && (
        <div className="signwall-inside_forms-error">{showError}</div>
      )}

      <Input
        type="text"
        name="ucode"
        placeholder="Código de validación"
        autoComplete="off"
        clase="mb-20 center bold sz-20"
        autoCapitalize="off"
        autoCorrect="off"
        required
        value={ucode}
        onChange={(e) => {
          handleOnChange(e)
          setShowError(false)
        }}
        error={errors.ucode}
      />

      <button
        className="signwall-inside_forms-btn"
        type="submit"
        disabled={disable || showLoading}>
        {showLoading ? 'VALIDANDO...' : 'VALIDAR'}
      </button>

      {showLinkMail ? (
        <p
          style={{
            fontSize: '12px',
          }}
          className="signwall-inside_forms-text mt-20 center">
          ¿No recibiste el correo?
          <a
            href="#"
            onClick={() => sendRequestMail()}
            className="signwall-inside_forms-link ml-10"
            style={{ color: '#4267b2' }}>
            Reenviar correo de validación
          </a>
        </p>
      ) : (
        <p
          style={{
            fontSize: '12px',
          }}
          className="signwall-inside_forms-text mt-20 center">
          Podrás reenviar nuevamente dentro de 10 segundos.
        </p>
      )}
    </form>
  )
}

const FormRequest = ({ arcSite, showCode }) => {
  const [showError, setShowError] = React.useState(false)
  const [showLoading, setShowLoading] = React.useState(false)

  const ListMonth = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ]

  const ListNumRange = (start, end, order) => {
    const list = []
    let startRange = start
    for (let i = startRange; i < end; i++) {
      list.push((startRange += 1))
    }
    return order ? list.reverse() : list
  }

  const stateSchema = {
    uemail: { value: '', error: '' },
    ugrade: { value: '', error: '' },
    uday: { value: '', error: '' },
    umonth: { value: '', error: '' },
    uyear: { value: '', error: '' },
  }

  const stateValidSchema = {
    uemail: {
      required: true,
      validator: {
        func: (value) =>
          /^[a-zA-Z0-9]{1}[a-zA-Z0-9._-]+@(?!gmail\.com)(?!yahoo\.com)(?!hotmail\.com)[a-zA-Z0-9-]{2,}(?:\.[a-zA-Z0-9-]{2,})+$/.test(
            value
          ),
        error: 'Correo Electrónico Inválido',
      },
    },
    ugrade: {
      required: true,
    },
    uday: {
      required: true,
    },
    umonth: {
      required: true,
    },
    uyear: {
      required: true,
    },
  }

  const daysInMonth = (m, y) => {
    switch (m) {
      case 1:
        return (y % 4 === 0 && y % 100) || y % 400 === 0 ? 29 : 28
      case 8:
      case 3:
      case 5:
      case 10:
        return 30
      default:
        return 31
    }
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

  const onSubmitForm = ({ uemail, ugrade, uday, umonth, uyear }) => {
    setShowLoading(true)
    const Fmonth = parseInt(umonth, 10) - 1
    if (
      Fmonth >= 0 &&
      Fmonth < 12 &&
      uday > 0 &&
      uday <= daysInMonth(Fmonth, uyear)
    ) {
      const udate = `${uyear}-${
        umonth < 10 ? `0${umonth.toString()}` : umonth.toString()
      }-${uday < 10 ? `0${uday.toString()}` : uday.toString()}`

      if (isLogged()) {
        const userCredentials = JSON.parse(
          window.localStorage.getItem('ArcId.USER_INFO') || '{}'
        )
        Identity.userIdentity = userCredentials
        extendSession()
          .then((resExtend) => {
            checkStudents(uemail, udate, ugrade, arcSite, resExtend.accessToken)
              .then((res) => {
                if (res.status) {
                  setCookie(
                    cookieStudents,
                    JSON.stringify({
                      uemail,
                      udate,
                      ugrade,
                    })
                  )
                  showCode()
                }
                setShowError(res.message)
              })
              .catch(() => {
                setShowError('Oops. Ocurrió un error inesperado.')
              })
              .finally(() => {
                setShowLoading(false)
              })
          })
          .catch((resErr) => {
            setShowLoading(false)
            setShowError(`Ocurrió un error inesperado. ${resErr.message}`)
          })
      } else {
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
    } else {
      setShowLoading(false)
      setShowError('La Fecha de Nacimiento no es válida')
    }
  }

  const { values, errors, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    stateValidSchema,
    onSubmitForm
  )

  const { uemail, ugrade, uday, umonth, uyear } = values

  return (
    <form className="signwall-inside_forms-form" onSubmit={handleOnSubmit}>
      <h4
        style={{ fontSize: '16px' }}
        className="signwall-inside_forms-title center mb-10 mt-20">
        PLAN UNIVERSITARIO
      </h4>

      <p
        style={{
          color: '#818181',
          lineHeight: '28px',
        }}
        className="signwall-inside_forms-text mb-10 center">
        Valida tu correo universitario y accede a la <br /> tarifa de estudiante
      </p>

      {showError && (
        <div className="signwall-inside_forms-error">{showError}</div>
      )}

      <Input
        type="email"
        inputMode="email"
        autoComplete="email"
        name="uemail"
        required
        placeholder="Correo Universitario*"
        value={uemail}
        clase="mb-10"
        onChange={(e) => {
          handleOnChange(e)
          setShowError(false)
        }}
        error={errors.uemail}
      />

      <p className="label">Fecha de Nacimiento</p>

      <div className="group-inline">
        <Select
          type="select"
          name="uday"
          width="20"
          clase="mb-10"
          required
          value={uday}
          onChange={(e) => {
            handleOnChange(e)
            setShowError(false)
          }}
          error={errors.uday}
          nolabel="true">
          <option disabled value="">
            DÍA
          </option>
          {ListNumRange(0, 31).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>

        <Select
          type="select"
          name="umonth"
          width="40"
          clase="mb-10"
          required
          value={umonth}
          onChange={(e) => {
            handleOnChange(e)
            setShowError(false)
          }}
          error={errors.umonth}
          nolabel="true">
          <option disabled value="">
            MES
          </option>
          {ListMonth.map((value, index) => (
            <option key={value} value={index + 1}>
              {value}
            </option>
          ))}
        </Select>

        <Select
          type="select"
          name="uyear"
          width="30"
          clase="mb-10"
          value={uyear}
          onChange={(e) => {
            handleOnChange(e)
            setShowError(false)
          }}
          required
          error={errors.uyear}
          nolabel="true">
          <option disabled value="">
            AÑO
          </option>
          {ListNumRange(1904, new Date().getFullYear() - 16, 'desc').map(
            (value) => (
              <option key={value} value={value}>
                {value}
              </option>
            )
          )}
        </Select>
      </div>
      <Select
        type="select"
        name="ugrade"
        placeholder="Grado de Estudios"
        value={ugrade}
        onChange={(e) => {
          handleOnChange(e)
          setShowError(false)
        }}
        required
        error={errors.ugrade}>
        <option disabled value="">
          -- Seleccione --
        </option>
        <option value="pregrado">Estudiante pregrado</option>
        <option value="postgrado">Estudiante postgrado</option>
        <option value="docente">Docente</option>
        <option value="administrativo">Administrativo</option>
      </Select>

      <button
        type="submit"
        className="signwall-inside_forms-btn mt-20"
        disabled={disable || showLoading}>
        {showLoading ? 'VALIDANDO...' : 'VALIDAR'}
      </button>
    </form>
  )
}

export const FormStudents = ({ arcSite }) => {
  const [showReqCode, setShowReqCode] = React.useState(false)

  React.useEffect(() => {
    if (getCookie(cookieStudents)) {
      setShowReqCode(true)
    }
  }, [])

  return (
    <>
      {showReqCode ? (
        <FormCode arcSite={arcSite} showRequest={() => setShowReqCode(false)} />
      ) : (
        <FormRequest arcSite={arcSite} showCode={() => setShowReqCode(true)} />
      )}
    </>
  )
}
