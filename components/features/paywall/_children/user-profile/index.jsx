import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import InputFormik from '../input'
import * as S from './styled'
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
  name: value => {
    value
      .required(MESSAGE.REQUIRED)
      .min(3, MESSAGE.MIN)
      .max(50, MESSAGE.MAX)
  },
  firstname: value => {
    value
      .required(MESSAGE.REQUIRED)
      .min(3, MESSAGE.MIN)
      .max(50, MESSAGE.MAX)
  },
  lastname: value => {
    value.min(3, MESSAGE.MIN).max(50, MESSAGE.MAX)
  },
  documentId: value => {
    value.required(MESSAGE.REQUIRED).length(8, MESSAGE.DNI)
  },
  phone: value => {
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

const UserProfile = ({ title = '' }) => (
  <Formik
    initialValues={{ firstname: 'first' }}
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
          <Field name="name" placeholder="Nombres" component={InputFormik} />
          <Field
            name="firstname"
            placeholder="Apellido Paterno"
            component={InputFormik}
          />
          <Field
            name="lastname"
            placeholder="Apellido Materno"
            component={InputFormik}
          />
          <Field
            name="documentId"
            placeholder="Tipo de documento"
            type="number"
            prefix={<Select key="select" />}
            component={InputFormik}
          />
          <Field
            name="phone"
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
        <S.Button type="submit">CONTINUAR</S.Button>
      </FormStyled>
    )}
  />
)

export default UserProfile
