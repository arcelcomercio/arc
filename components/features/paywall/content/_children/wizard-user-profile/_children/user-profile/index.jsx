import React from 'react'
import { Formik, Form, Field } from 'formik'
import InputFormik from '../../../../../_children/input'
import * as S from './styled'
import Button from '../../../../../_children/button'
import schema from '../../../../../_dependencies/schema'

const MESSAGE = {
  MIN: 'Longitud inválida, mínimo 3 caracteres.',
  MAX: 'Longitud inválida, Máximo 50 caracteres.',
  REQUIRED: 'Este campo es requerido',
  CELULAR: 'Longitud inválida, entre 9 y 12 caracteres',
  DNI: 'Longitud inválida, requiere 8 dígitos',
  EMAIL: 'Correo inválido',
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
  documentNumber: value => {
    value.required(MESSAGE.REQUIRED).length(8, MESSAGE.DNI)
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

const Select = () => (
  <S.Select>
    <option>DNI</option>
    <option>CEX</option>
    <option>CDI</option>
  </S.Select>
)

const FormStyled = S.Form(Form)

const UserProfile = ({ title = '', profile, error, onSubmit, onReset }) => (
  <Formik
    initialValues={Object.assign(
      {},
      { documentNumber: null, documentType: 'DNI' },
      profile
    )}
    validate={values => {
      const erros = RegisterSchema(values)

      if (Object.keys(erros).length > 0) {
        return erros
      }
    }}
    onSubmit={(values, actions) => {
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
                name="firstName"
                placeholder="Nombres"
                component={InputFormik}
              />
            </S.WrapField>
            <S.WrapField>
              <Field
                name="lastName"
                placeholder="Apellido Paterno"
                component={InputFormik}
              />
            </S.WrapField>
            <S.WrapField>
              <Field
                name="secondLastName"
                placeholder="Apellido Materno"
                component={InputFormik}
              />
            </S.WrapField>
            <S.WrapField>
              <Field
                name="documentNumber"
                placeholder="Tipo de documento"
                type="number"
                prefix={<Select key="select" />}
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

export default UserProfile
