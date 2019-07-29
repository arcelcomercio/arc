import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as S from './styled'
import InputFormik from '../../../../../_children/input'
import Button from '../../../../../_children/button'
import Error from '../../../../../_children/error'
import { FormSchema, Masks } from './schema'

// TODO: Falta obtener esta info que es obligatoria para crear una orden
const FAKE_BILLING_ADDRESS = {
  line1: 'Jr Francisco Arana 2018',
  line2: 'Por la fabrica Donofrio',
  locality: 'Lima',
  region: 'LI',
  country: 'PE',
  postal: '01',
}

const FormStyled = S.Form(Form)

const UserProfile = ({ title = '', profile, error, onSubmit, onReset }) => {
  return (
    <Formik
      initialValues={Object.assign({}, profile, { documentType: 'DNI' })}
      validate={values => new FormSchema(values)}
      onSubmit={(values, actions) => {
        // TODO: Crear un servicio desde el que se pueda obtener billing address
        onSubmit({ ...values, billingAddress: FAKE_BILLING_ADDRESS }, actions)
      }}
      onReset={onReset}
      render={({ isSubmitting, values: { documentType } }) => {
        return (
          <FormStyled>
            <S.WrapTitle>
              <S.Title>{title}</S.Title>
            </S.WrapTitle>
            <S.Wrap>
              <S.WrapField>
                <Field
                  transform="capitalize"
                  name="firstName"
                  label="Nombres"
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  transform="capitalize"
                  name="lastName"
                  label="Apellido Paterno"
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  transform="capitalize"
                  name="secondLastName"
                  label="Apellido Materno"
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  name="documentNumber"
                  label="Tipo de documento"
                  mask={Masks[documentType.toUpperCase()]}
                  type="text"
                  prefix={
                    <Field
                      name="documentType"
                      key="select"
                      component={({ field, ...props }) => (
                        <S.Select {...field} {...props}>
                          <option value="DNI">DNI</option>
                          <option value="CEX">CEX</option>
                          <option value="CDI">CDI</option>
                        </S.Select>
                      )}
                    />
                  }
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  name="phone"
                  mask={Masks.PHONE}
                  label="Número de Celular"
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  name="email"
                  label="Correo Electrónico"
                  component={InputFormik}
                />
              </S.WrapField>
            </S.Wrap>
            {error && <Error mb="20px" message={error} />}
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
