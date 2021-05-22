import { ENVIRONMENT } from 'fusion:environment'
import React, { useEffect, useState } from 'react'

import {
  deleteCookie,
  getCookie,
  setCookieSession,
} from '../../../subscriptions/_dependencies/Cookies'
import useForm from '../../../subscriptions/_hooks/useForm'
import Domains from '../../_dependencies/domains'
import Services from '../../_dependencies/services'
import { Back } from '../iconos'
import { Input, Select } from './control_input_select'
import * as S from './styles'

const cookieStudents = 'EcoId.REQUEST_STUDENTS'

const FormCode = ({ arcSite, showRequest }) => {
  const [showError, setShowError] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [showLinkMail, setShowLinkMail] = useState(true)
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
    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
    window.Identity.extendSession()
      .then((resExtend) => {
        Services.checkStudents(
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
    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
    window.Identity.extendSession()
      .then((resExtend) => {
        Services.checkCodeStudents(
          ucode.trim(),
          EMAIL_USER,
          arcSite,
          resExtend.accessToken
        )
          .then((resCode) => {
            if (resCode.status) {
              deleteCookie(cookieStudents)
              setTimeout(() => {
                window.location.href =
                  ENVIRONMENT === 'elcomercio'
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
    <S.Form onSubmit={handleOnSubmit}>
      <S.ButtonBase
        type="button"
        className="mb-10"
        onClick={() => {
          deleteCookie(cookieStudents)
          showRequest()
        }}>
        <Back /> Volver
      </S.ButtonBase>

      <S.Title className="center mb-10 mt-20" cp>
        PLAN UNIVERSITARIO
      </S.Title>

      <S.Text c="light" s="14" lh="28" className="mb-20 center">
        Ingresa aquí el código de validación que <br /> hemos enviado a tu
        bandeja de correo:
        <br />
        <strong>{EMAIL_USER}</strong>
      </S.Text>

      {showError && <S.Error>{showError}</S.Error>}

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

      <S.Button type="submit" disabled={disable || showLoading}>
        {showLoading ? 'VALIDANDO...' : 'VALIDAR'}
      </S.Button>

      {showLinkMail ? (
        <S.Text c="gray" s="12" className="mt-20 center">
          ¿No recibiste el correo?
          <S.Link c="blue" onClick={() => sendRequestMail()} className="ml-10">
            Reenviar correo de validación
          </S.Link>
        </S.Text>
      ) : (
        <S.Text c="gray" s="12" className="mt-20 center">
          Podrás reenviar nuevamente dentro de 10 segundos.
        </S.Text>
      )}
    </S.Form>
  )
}

const FormRequest = ({ arcSite, showCode }) => {
  const [showError, setShowError] = useState(false)
  const [showLoading, setShowLoading] = useState(false)

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
        window.Identity.userIdentity = userCredentials
        window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
        window.Identity.extendSession()
          .then((resExtend) => {
            Services.checkStudents(
              uemail,
              udate,
              ugrade,
              arcSite,
              resExtend.accessToken
            )
              .then((res) => {
                if (res.status) {
                  setCookieSession(cookieStudents, {
                    uemail,
                    udate,
                    ugrade,
                  })
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
    <S.Form onSubmit={handleOnSubmit}>
      <S.Title s="16" className="center mb-10 mt-20" cp>
        PLAN UNIVERSITARIO
      </S.Title>

      <S.Text c="light" s="14" lh="28" className="mb-10 center">
        Valida tu correo universitario y accede a la <br /> tarifa de estudiante
      </S.Text>

      {showError && <S.Error>{showError}</S.Error>}

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
          nolabel>
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
          nolabel>
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
          nolabel>
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

      <S.Button
        type="submit"
        className="mt-20"
        disabled={disable || showLoading}>
        {showLoading ? 'VALIDANDO...' : 'VALIDAR'}
      </S.Button>
    </S.Form>
  )
}

export const FormStudents = ({ arcSite }) => {
  const [showReqCode, setShowReqCode] = useState(false)

  useEffect(() => {
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
