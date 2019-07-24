import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import InputFormik from '../../../../../_children/input'
import * as S from './styled'
import Button from '../../../../../_children/button'
import schema from '../../../../../_dependencies/schema'
import Select from '../select-formik'

const MESSAGE = {
  // eslint-disable-next-line no-template-curly-in-string
  MIN: 'Longitud inválida, mínimo ${min} caracteres.',
  // eslint-disable-next-line no-template-curly-in-string
  MAX: 'Longitud inválida, Máximo ${max} caracteres.',
  REQUIRED: 'Este campo es requerido',
  CELULAR: 'Longitud inválida, entre 9 y 12 caracteres',
  DNI: 'Longitud inválida, requiere 8 dígitos',
  EMAIL: 'Correo inválido',
  CUSTOM: 'Formato inválido',
}

// TODO: Falta obtener esta info que es obligatoria para crear una orden
const FAKE_BILLING_ADDRESS = {
  line1: 'Jr Francisco Arana 2018',
  line2: 'Por la fabrica Donofrio',
  locality: 'Lima',
  region: 'LI',
  country: 'PE',
  postal: '01',
}

const RegisterSchema = schema({
  firstName: value => {
    value
      .required(MESSAGE.REQUIRED)
      .min(3, MESSAGE.MIN)
      .max(50, MESSAGE.MAX)
  },
  lastName: value => {
    value
      .required(MESSAGE.REQUIRED)
      .min(3, MESSAGE.MIN)
      .max(50, MESSAGE.MAX)
  },
  secondLastName: value => {
    value.min(3, MESSAGE.MIN).max(50, MESSAGE.MAX)
  },
  documentNumber: (value, { documentType }) => {
    switch (documentType) {
      default:
      case 'DNI':
        value.required(MESSAGE.REQUIRED).length(8, MESSAGE.DNI)
        break
      case 'CDI':
      case 'CEX':
        value
          .required(MESSAGE.REQUIRED)
          .custom(/^[ A-Za-z0-9-]*$/, MESSAGE.CUSTOM)
          .min(5, MESSAGE.MIN)
          .max(15, MESSAGE.MAX)
        break
    }
  },
  phone: value => {
    value
      .required(MESSAGE.REQUIRED)
      .min(9, MESSAGE.CELULAR)
      .max(12, MESSAGE.CELULAR)
  },
  email: value => {
    value.required(MESSAGE.REQUIRED)
    value.email(MESSAGE.EMAIL)
  },
})

const FormStyled = S.Form(Form)

const UserProfile = ({ title = '', profile, error, onSubmit, onReset }) => {
  const [typeInput, setTypeInput] = useState('number')

  const listTypesInput = {
    DNI: 'number',
    CEX: 'text',
    CDI: 'text',
  }

  const onSelectChange = e => {
    setTypeInput(listTypesInput[e.target.value])
  }

  return (
    <Formik
      initialValues={Object.assign({}, { documentNumber: null }, profile)}
      validate={values => {
        const erros = RegisterSchema(values)

        if (Object.keys(erros).length > 0) {
          return erros
        }
      }}
      onSubmit={(values, actions) => {
        return false
        // TODO: Crear un servicio desde el que se pueda obtener billing address
        onSubmit({ ...values, billingAddress: FAKE_BILLING_ADDRESS }, actions)
      }}
      onReset={onReset}
      render={({ isSubmitting, isValid, ...p }) => {
        return (
          <FormStyled>
            <S.WrapTitle>
              <S.Title>{title}</S.Title>
            </S.WrapTitle>
            <S.Wrap>
              <S.WrapField>
                <Field
                  minlength="3"
                  maxlength="50"
                  transform="capitalize"
                  name="firstName"
                  placeholder="Nombres"
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  transform="capitalize"
                  name="lastName"
                  placeholder="Apellido Paterno"
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  transform="capitalize"
                  name="secondLastName"
                  placeholder="Apellido Materno"
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  name="documentNumber"
                  placeholder="Tipo de documento"
                  type={typeInput}
                  prefix={
                    <Field
                      name="documentType"
                      key="select"
                      change={onSelectChange}
                      component={Select}
                    />
                  }
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  name="phone"
                  placeholder="Número de Celular"
                  type="number"
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  name="email"
                  placeholder="Correo Electrónico"
                  component={InputFormik}
                />
              </S.WrapField>
            </S.Wrap>
            {error && <S.Error mb="20px" message={error} />}
            <Button disabled={isSubmitting} maxWidth="300px" type="submit">
              CONTINUAR
            </Button>
          </FormStyled>
        )
      }}
    />
  )
}

export default UserProfile
