import React from 'react'
import { Formik, Form, Field } from 'formik'
import InputFormik from '../input'
import * as S from './styled'
import Button from '../button'
import schema from '../../_dependencies/schema'

const MESSAGE = {
  MIN: 'Longitud inválida, mínimo 3 caracteres.',
  MAX: 'Longitud inválida, Máximo 50 caracteres.',
  REQUIRED: 'Este campo es requerido',
  CELULAR: 'Longitud inválida, entre 9 y 12 caracteres',
  DNI: 'Longitud inválida, requiere 8 dígitos',
  EMAIL: 'Correo inválido',
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
  mobilePhone: value => {
    value.min(9, MESSAGE.CELULAR).max(12, MESSAGE.CELULAR)
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

const UserProfile = ({ title = '', profile }) => (
  <Formik
    initialValues={profile}
    validate={values => {
      return RegisterSchema(values)
    }}
    onSubmit={(values, actions) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        actions.setSubmitting(false)
      }, 1000)
    }}
    render={() => (
      <FormStyled>
        <S.WrapTitle>
          <S.Title>{title}</S.Title>
        </S.WrapTitle>
        <S.Wrap>
          <Field
            name="firstName"
            placeholder="Nombres"
            component={InputFormik}
          />
          <Field
            name="lastName"
            placeholder="Apellido Paterno"
            component={InputFormik}
          />
          <Field
            name="secondLastName"
            placeholder="Apellido Materno"
            component={InputFormik}
          />
          <Field
            name="documentNumber"
            placeholder="Tipo de documento"
            type="number"
            prefix={<Select key="select" />}
            component={InputFormik}
          />
          <Field
            name="mobilePhone"
            placeholder="Número de Celular"
            type="number"
            component={InputFormik}
          />
          <Field
            name="email"
            placeholder="Correo Electrónico"
            component={InputFormik}
          />
        </S.Wrap>
        <Button type="submit">CONTINUAR 2</Button>
      </FormStyled>
    )}
  />
)

export default UserProfile
