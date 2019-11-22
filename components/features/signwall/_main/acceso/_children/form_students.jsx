/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import * as S from './styles'
import { InputForm } from './control_input'
import useForm from './useForm'
import Services from '../../utils/new_services'
import Cookies from '../../utils/new_cookies'

const API_ORIGIN = 'https://api-sandbox.gestion.pe'

export const FormStudentsCode = () => {
  const [showError, setShowError] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [showLinkMail, setShowLinkMail] = useState(true)

  const stateSchema = {
    ucode: { value: '', error: '' },
  }

  const stateValidSchema = {
    ucode: {
      required: true,
    },
  }

  const sendRequestMail = () => {
    const REQUEST = JSON.parse(
      JSON.parse(Cookies.getCookie('Eco.REQUEST_STUDENTS'))
    )
    window.Identity.options({ apiOrigin: API_ORIGIN })
    window.Identity.extendSession()
      .then(resExtend => {
        Services.checkStudents(
          REQUEST.uemail,
          REQUEST.date,
          REQUEST.ugrade,
          'gestion',
          resExtend.accessToken
        )
          .then(resOk => {
            if (resOk.status) {
              setShowLinkMail(false)
              setTimeout(() => {
                setShowLinkMail(true)
              }, 10000)
            }
          })
          .catch(resErr => {
            setShowError(resErr.message)
          })
      })
      .catch(resErr => {
        setShowError(`Ocurrió un error inesperado. ${resErr.message}`)
      })
  }

  const onSubmitFormCode = state => {
    setShowLoading(true)
    const { ucode } = state
    window.Identity.options({ apiOrigin: API_ORIGIN })
    window.Identity.extendSession()
      .then(resExtend => {
        Services.checkCodeStudents(ucode, 'gestion', resExtend.accessToken)
          .then(resCode => {
            if (resCode.status) {
              Cookies.deleteCookie('Eco.REQUEST_STUDENTS')
              setTimeout(() => {
                window.location.href = `/suscripcionesdigitales/DNI/00000000/${resCode.token}/?outputType=paywall`
              }, 2000)
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
      .catch(resErr => {
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
    // eslint-disable-next-line react/jsx-filename-extension
    <S.Form onSubmit={handleOnSubmit}>
      <S.Title className="center mb-10" cp>
        PLAN UNIVERSITARIO
      </S.Title>

      <S.Text c="light" s="14" lh="28" className="mb-20 center">
        Ingresa aquí el código de validación que <br /> hemos enviado a tu
        bandeja de correo
      </S.Text>

      {showError && <S.Error>{showError}</S.Error>}

      <InputForm
        t="text"
        n="ucode"
        ph="Código de validación"
        ac="off"
        c="mb-20 center bold sz-20"
        valid
        value={ucode}
        onChange={e => {
          handleOnChange(e)
          setShowError(false)
        }}
        onFocus={handleOnChange}
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

export const FormStudents = () => {
  const [showReqCode, setShowReqCode] = useState(false)
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

  const ListDays = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
  ]

  const ListYears = [
    '1980',
    '1981',
    '1982',
    '1983',
    '1984',
    '1985',
    '1986',
    '1987',
    '1988',
    '1989',
    '1990',
    '1991',
    '1992',
    '1993',
    '1994',
    '1995',
    '1996',
    '1997',
    '1998',
    '1999',
    '2000',
    '2001',
    '2002',
    '2003',
    '2004',
    '2005',
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
  ]

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
        func: value =>
          /^[a-zA-Z0-9]{1}[a-zA-Z0-9._-]+@[a-zA-Z0-9-]{2,}(?:\.[a-zA-Z0-9-]{2,})+$/.test(
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

  const isRequestStudents = () => {
    return Cookies.getCookie('Eco.REQUEST_STUDENTS')
  }

  const onSubmitForm = state => {
    setShowLoading(true)
    const { uemail, ugrade, uday, umonth, uyear } = state
    const date = `${uyear}-${
      umonth < 10 ? `0${umonth.toString()}` : umonth.toString()
    }-${uday}`
    window.Identity.options({ apiOrigin: API_ORIGIN })
    window.Identity.extendSession()
      .then(resExtend => {
        Services.checkStudents(
          uemail,
          date,
          ugrade,
          'gestion',
          resExtend.accessToken
        )
          .then(res => {
            if (res.status) {
              Cookies.setCookieSession(
                'Eco.REQUEST_STUDENTS',
                JSON.stringify({ uemail, date, ugrade })
              )
              setShowReqCode(!showReqCode)
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
      .catch(resErr => {
        setShowLoading(false)
        setShowError(`Ocurrió un error inesperado. ${resErr.message}`)
      })
  }

  const { values, errors, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    stateValidSchema,
    onSubmitForm
  )

  const { uemail, ugrade, uday, umonth, uyear } = values

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      {!showReqCode && !isRequestStudents() && (
        <S.Form onSubmit={handleOnSubmit}>
          <S.Title s="16" className="center mb-10" cp>
            PLAN UNIVERSITARIO
          </S.Title>

          <S.Text c="light" s="14" lh="28" className="mb-10 center">
            Valida tu correo universitario y accede a la <br /> tarifa de
            estudiante
          </S.Text>

          {showError && <S.Error>{showError}</S.Error>}

          <InputForm
            t="email"
            n="uemail"
            ph="Correo Universitario*"
            ac="on"
            // c="mb-20"
            valid
            value={uemail}
            onChange={e => {
              handleOnChange(e)
              setShowError(false)
            }}
            onFocus={handleOnChange}
            error={errors.uemail}
          />
          <S.Text c="dark" s="11" lh="24" className="mb-10">
            *Válido de la Universidad de Lima
          </S.Text>

          <p className="label">Fecha de Nacimiento</p>

          <InputForm
            t="select"
            n="uday"
            w="23.3"
            c="mb-10"
            mr="10"
            valid
            value={uday}
            onChange={e => {
              handleOnChange(e)
              setShowError(false)
            }}
            onFocus={handleOnChange}
            error={errors.uday}
            nolabel>
            <option disabled value="">
              DÍA
            </option>

            {ListDays.map(value => {
              return (
                <option key={value} value={value}>
                  {value}
                </option>
              )
            })}
          </InputForm>

          <InputForm
            t="select"
            n="umonth"
            w="43.3"
            c="mb-10"
            ml="10"
            mr="10"
            valid
            value={umonth}
            onChange={e => {
              handleOnChange(e)
              setShowError(false)
            }}
            onFocus={handleOnChange}
            error={errors.umonth}
            nolabel>
            <option disabled value="">
              MES
            </option>

            {ListMonth.map((value, index) => {
              return (
                <option key={value} value={index + 1}>
                  {value}
                </option>
              )
            })}
          </InputForm>

          <InputForm
            t="select"
            n="uyear"
            w="33.3"
            c="mb-10"
            ml="10"
            value={uyear}
            onChange={e => {
              handleOnChange(e)
              setShowError(false)
            }}
            onFocus={handleOnChange}
            valid
            error={errors.uyear}
            nolabel>
            <option disabled value="">
              AÑO
            </option>

            {ListYears.map(value => {
              return (
                <option key={value} value={value}>
                  {value}
                </option>
              )
            })}
          </InputForm>

          {/* <InputForm
            t="date"
            n="udate"
            ph="Fecha de Nacimiento"
            ac="on"
            c="mb-10"
          /> */}

          <InputForm
            t="select"
            n="ugrade"
            ph="Grado de Estudios"
            value={ugrade}
            onFocus={handleOnChange}
            onChange={e => {
              handleOnChange(e)
              setShowError(false)
            }}
            valid
            error={errors.ugrade}>
            <option disabled value="">
              -- Seleccione --
            </option>
            <option value="pregrado">Estudiante pregrado</option>
            <option value="postgrado">Estudiante postgrado</option>
            <option value="docente">Docente</option>
            <option value="administrativo">Administrativo</option>
          </InputForm>

          <S.Button
            type="submit"
            className="mt-20"
            disabled={disable || showLoading}>
            {showLoading ? 'VALIDANDO...' : 'VALIDAR'}
          </S.Button>
        </S.Form>
      )}
      {(showReqCode || isRequestStudents()) && <FormStudentsCode />}
    </>
  )
}
