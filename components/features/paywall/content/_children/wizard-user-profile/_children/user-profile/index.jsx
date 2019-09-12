import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field } from 'formik'
import pick from 'object.pick'

import { Persist } from '../../../../../_children/formik-persist'
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
  secondLastName: null,
  documentType: 'DNI',
  documentNumber: null,
  phone: null,
  email: null,
}
const UserProfile = ({
  name,
  title = '',
  initialValues = {},
  error,
  onSubmit,
  onReset,
}) => {
  return (
    <Formik
      initialValues={Object.assign(
        {},
        _initValue,
        pick(initialValues, Object.keys(_initValue))
      )}
      validate={values => new FormSchema(values)}
      onSubmit={(values, actions) => {
        const {
          email,
          firstName,
          lastName,
          secondLastName,
          phone,
          documentType,
          documentNumber,
        } = values
        onSubmit(
          {
            ...values,
            email: email.trim(),
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            secondLastName: secondLastName ? secondLastName.trim() : undefined,
            phone: phone.replace(/\D/g, ''),
            billingAddress: {
              country: 'PE',
              line2: `${documentType}_${documentNumber}`,
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
                  {...Masks.Piped.PERSON_NAME}
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  name="lastName"
                  label="Apellido Paterno"
                  {...Masks.Piped.PERSON_NAME}
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field name="secondLastName">
                  {props => <InputFormik {...props} label="Apellido Materno" />}
                </Field>
              </S.WrapField>
              <S.WrapField>
                <Field
                  name="documentNumber"
                  label="Número de documento"
                  mask={Masks[documentType.toUpperCase()]}
                  type="text"
                  prefix={
                    <Field name="documentType">
                      {({ field: { onChange, ...restField } }) => (
                        <S.Select
                          key="select"
                          onChange={(...args) => {
                            setFieldValue('documentNumber', '')
                            onChange(...args)
                          }}
                          {...restField}>
                          <option value="DNI">DNI</option>
                          <option value="CEX">CEX</option>
                          <option value="CDI">CDI</option>
                        </S.Select>
                      )}
                    </Field>
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
                  label="Número de Celular"
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  name="email"
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
            <Persist name={name} isSessionStorage />
          </FormStyled>
        )
      }}
    />
  )
}

UserProfile.propTypes = {
  initialValues: PropTypes.shape({
    firstName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(null),
    ]),
    lastName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(null),
    ]),
    documentType: PropTypes.oneOf(['DNI', 'CEX', 'CDI']),
    documentNumber: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(null),
    ]),
    phone: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(null)]),
    email: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(null)]),
  }),
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

export default UserProfile
