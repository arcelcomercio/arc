/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import * as S from './styles'
import { InputForm } from './control_input'
import useForm from './useForm'

// eslint-disable-next-line import/prefer-default-export
export const FormStudentsCode = () => {
  const stateSchema = {
    ucode: { value: '', error: '' },
  }

  const stateValidSchema = {
    ucode: {
      required: true,
    },
  }

  const onSubmitForm = state => {
    window.console.log(state)
    window.console.log('redirigir landing')
  }

  const { values, errors, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    stateValidSchema,
    onSubmitForm
  )

  const { ucode } = values

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <S.Form onSubmit={handleOnSubmit}>
        <S.Title className="center mb-10" cp>
          PLAN UNIVERSITARIO
        </S.Title>

        <S.Text c="light" s="14" lh="28" className="mb-20 center">
          Ingresa aquí el código de validación que <br /> hemos enviado a tu
          bandeja de correo
        </S.Text>

        <InputForm
          t="text"
          n="ucode"
          ph="Código de validación"
          ac="off"
          c="mb-20"
          valid
          value={ucode}
          onChange={handleOnChange}
          onFocus={handleOnChange}
          error={errors.ucode}
        />

        <S.Button type="submit" disabled={disable}>
          CONFIRMAR
        </S.Button>

        <S.Text c="gray" s="12" className="mt-20 center">
          ¿No recibiste el correo?
          <S.Link href="#" c="blue" className="ml-10">
            Reenviar correo de validación
          </S.Link>
        </S.Text>
      </S.Form>
    </>
  )
}

export const FormStudents = () => {
  const [showReqCode, setShowReqCode] = useState(false)

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
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
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
    '2000',
    '2001',
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

  const onSubmitForm = state => {
    window.console.log(state)
    setShowReqCode(!showReqCode)
    // window.alert(JSON.stringify(state, null, 2))
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
      {!showReqCode && (
        <S.Form onSubmit={handleOnSubmit}>
          <S.Title s="16" className="center mb-10" cp>
            PLAN UNIVERSITARIO
          </S.Title>

          <S.Text c="light" s="14" lh="28" className="mb-10 center">
            Valida tu correo universitario y accede a la <br /> tarifa de
            estudiante
          </S.Text>

          <InputForm
            t="email"
            n="uemail"
            ph="Correo Universitario*"
            ac="on"
            // c="mb-20"
            valid
            value={uemail}
            onChange={handleOnChange}
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
            onChange={handleOnChange}
            onFocus={handleOnChange}
            error={errors.uday}
            nolabel>
            <option disabled value="">
              DÍA
            </option>

            {ListDays.map((value, index) => {
              return (
                <option key={value} value={index}>
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
            onChange={handleOnChange}
            onFocus={handleOnChange}
            error={errors.umonth}
            nolabel>
            <option disabled value="">
              MES
            </option>

            {ListMonth.map((value, index) => {
              return (
                <option key={value} value={index}>
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
            onChange={handleOnChange}
            onFocus={handleOnChange}
            valid
            error={errors.uyear}
            nolabel>
            <option disabled value="">
              AÑO
            </option>

            {ListYears.map((value, index) => {
              return (
                <option key={value} value={index}>
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
            onChange={handleOnChange}
            valid
            error={errors.ugrade}>
            <option disabled value="">
              -- Seleccione --
            </option>
            <option value="pregrado">Estudiante pregrado </option>
            <option value="postgrado">Estudiante postgrado </option>
          </InputForm>

          <S.Button type="submit" className="mt-20" disabled={disable}>
            VALIDAR
          </S.Button>
        </S.Form>
      )}
      {showReqCode && <FormStudentsCode />}
    </>
  )
}
