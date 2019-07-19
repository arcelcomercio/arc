import React from 'react'
import styled from 'styled-components'
import { Formik, Form, Field } from 'formik'
import RadioButton from '../../../radio-button'
import * as S from './styled'
import Button from '../../../../../_children/button'
import Input from '../../../../../_children/input'
import Icon from '../../../../../_children/icon'
import schema from '../../../../../_dependencies/schema'
import { devices } from '../../../../../_dependencies/devices'

const RadioCondition = styled(RadioButton)`
  @media (${devices.mobile}) {
    flex-direction: row;
    margin: 0;
  }
`

const RegisterSchema = schema({})

const FormPay = ({ onSubmit, onReset }) => (
  <Formik
    initialValues={{}}
    validate={values => {
      // FIXME: Validaciones y errores
      // return RegisterSchema(values)
      return true
    }}
    onReset={onReset}
    onSubmit={(values, actions) => {
      onSubmit(values, actions)
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
              name="cardMethod"
              valueCheck="visa"
            />
            <Field
              component={RadioButton}
              label={<Icon type="mcard" />}
              name="cardMethod"
              valueCheck="mcard"
            />
            <Field
              component={RadioButton}
              label={<Icon type="amex" />}
              name="cardMethod"
              valueCheck="amex"
            />
            <Field
              component={RadioButton}
              label={<Icon type="diners" />}
              name="cardMethod"
              valueCheck="diners"
            />
          </S.Cards>
        </S.WrapCards>
        <S.WrapInputs>
          <S.WrapInput min-width="310px">
            <Field
              component={Input}
              name="cardNumber"
              placeholder="Número de tarjeta"
            />
          </S.WrapInput>

          <S.WrapInput max-width="150px">
            <Field
              component={Input}
              name="expiryDate"
              placeholder="F. de Vencimiento"
            />
          </S.WrapInput>
          <S.WrapInput max-width="135px">
            <Field component={Input} name="cvv" placeholder="CVV" />
          </S.WrapInput>
        </S.WrapInputs>

        <Field
          component={RadioCondition}
          label={
            <span>
              Acepto las condiciones de servicio, política de privacidad y estoy
              de acuerdo con la información.
            </span>
          }
          name="term"
          valueCheck="amex"
        />

        <S.Span>
          Acepto las condiciones de servicio, política de privacidad y estoy de
          acuerdo con la información.
        </S.Span>

        <Button type="submit">CONTINUAR</Button>
      </Form>
    )}
  />
)

export default FormPay
