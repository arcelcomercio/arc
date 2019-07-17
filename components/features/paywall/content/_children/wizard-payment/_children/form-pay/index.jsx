import React from 'react'
import { Formik, Form, Field } from 'formik'
import RadioButton from '../../../radio-button'
import * as S from './styled'
import Button from '../../../../../_children/button'
import Icon from '../../../../../_children/icon'
import schema from '../../../../../_dependencies/schema'

const RegisterSchema = schema({})

const FormPay = ({ profile }) => (
  <Formik
    initialValues={profile}
    validate={values => {
      return RegisterSchema(values)
    }}
    onSubmit={(values, actions) => {
      setTimeout(() => {
        actions.setSubmitting(false)
      }, 1000)
    }}
    render={() => (
      <Form>
        <S.Security>
          <Icon type="lock" width="20" height="25" />
          <S.TextSecurity>
            Compra seguro. Esta web está protegida
          </S.TextSecurity>
        </S.Security>
        <S.WrapCards>
          <S.TextCard>Selecciona un tipo de tarjeta</S.TextCard>
          <S.Cards>
            <Field
              component={RadioButton}
              label={<Icon type="visa" />}
              name="card"
              valueCheck="visa"
            />
            <Field
              component={RadioButton}
              label={<Icon type="mcard" />}
              name="card"
              valueCheck="visa"
            />
            <Field
              component={RadioButton}
              label={<Icon type="amex" />}
              name="card"
              valueCheck="visa"
            />
            <Field
              component={RadioButton}
              label={<Icon type="diners" />}
              name="card"
              valueCheck="visa"
            />
          </S.Cards>
        </S.WrapCards>

        <Button type="submit">CONTINUAR</Button>
      </Form>
    )}
  />
)

export default FormPay
