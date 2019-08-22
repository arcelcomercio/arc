import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as S from './styled'
import InputFormik from '../../../../../_children/input'
import Button from '../../../../../_children/button'
import Error from '../../../../../_children/error'
import { FormSchema, Masks } from './schema'

const FormStyled = S.Form(Form)
const { trim } = Masks.Pipes

const _initValue = {
  firstName: null,
  lastName: null,
  documentType: 'DNI',
  documentNumber: null,
  phone: null,
  email: null,
}
const UserProfile = ({
  title = '',
  initialValues,
  error,
  onSubmit,
  onReset,
}) => {
  return (
    <Formik
      initialValues={Object.assign({}, _initValue, initialValues)}
      validate={values => new FormSchema(values)}
      onSubmit={(values, actions) => {
        onSubmit(
          {
            ...values,
            phone: values.phone.replace(/\D/g, ''),
            billingAddress: {
              country: 'PE',
              line2: `${values.documentType}_${values.documentNumber}`,
            },
          },
          actions
        )
      }}
      onReset={onReset}
      render={({ setFieldValue, isSubmitting, values: { documentType } }) => {
        return (
          <FormStyled>
            <S.WrapTitle>
              <S.Title>{title}</S.Title>
            </S.WrapTitle>
            <S.Wrap>
              <S.WrapField>
                <Field
                  name="firstName"
                  label="Nombres"
                  tabIndex="1"
                  {...Masks.Piped.PERSON_NAME}
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  name="lastName"
                  label="Apellido Paterno"
                  tabIndex="2"
                  {...Masks.Piped.PERSON_NAME}
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  name="secondLastName"
                  label="Apellido Materno"
                  tabIndex="3"
                  {...Masks.Piped.PERSON_NAME}
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  name="documentNumber"
                  label="Número de documento"
                  mask={Masks[documentType.toUpperCase()]}
                  type="text"
                  tabIndex="5"
                  prefix={
                    <Field
                      name="documentType"
                      key="select"
                      tabIndex="4"
                      component={({
                        field: { onChange, ...restField },
                        ...restProps
                      }) => (
                        <S.Select
                          onChange={(...args) => {
                            setFieldValue('documentNumber', '')
                            onChange(...args)
                          }}
                          {...restField}
                          {...restProps}>
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
                  inputMode="numeric"
                  pipe={trim()}
                  mask={Masks.PHONE}
                  tabIndex="6"
                  label="Número de Celular"
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  name="email"
                  tabIndex="7"
                  inputMode="email"
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
