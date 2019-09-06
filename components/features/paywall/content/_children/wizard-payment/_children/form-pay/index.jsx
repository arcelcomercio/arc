import React from 'react'
import { Formik, Form, Field } from 'formik'

import { Persist } from '../../../../../_children/formik-persist'
import * as S from './styled'
import Button from '../../../../../_children/button'
import Input from '../../../../../_children/input'
import Icon from '../../../../../_children/icon'
import { FormSchema, Masks } from './schema'

const { trim } = Masks.Pipes

const FormPay = ({ error, onSubmit, initialValues }) => {
  return (
    <Formik
      validate={values => new FormSchema(values)}
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        onSubmit(
          Object.assign({}, values, {
            cardNumber:
              // Remover espacios en blanco del numero de tarjeta
              values.cardNumber && values.cardNumber.replace(/\D/g, ''),
          }),
          actions
        )
      }}
      render={({
        values: { cardMethod, cvv, agreed },
        handleChange,
        setFieldValue,
        isSubmitting,
      }) => {
        const clearField = field => {
          return e => {
            const method = e.currentTarget.defaultValue
            if (method !== 'amex') {
              setFieldValue(field, cvv ? cvv.slice(0, 3) : cvv)
            }
            handleChange(e)
          }
        }

        return (
          <Form>
            <S.Security>
              <Icon type="lock" width="20" height="25" fill="#249109" />
              <S.TextSecurity>
                Compra seguro. Esta web está protegida
              </S.TextSecurity>
            </S.Security>
            {error && <S.Error mb="20px" message={error} />}
            <S.WrapCards>
              <S.TextCard>Selecciona un tipo de tarjeta</S.TextCard>
              <S.Cards className="cards">
                <Field
                  component={S.RadioCondition}
                  label={<Icon type="visa" />}
                  name="cardMethod"
                  checked={cardMethod === 'visa'}
                  onChange={clearField('cvv')}
                  value="visa"
                />
                <Field
                  component={S.RadioCondition}
                  label={<Icon type="mcard" />}
                  name="cardMethod"
                  checked={cardMethod === 'mastercard'}
                  onChange={clearField('cvv')}
                  value="mastercard"
                />
                <Field
                  component={S.RadioCondition}
                  label={<Icon type="amex" />}
                  name="cardMethod"
                  checked={cardMethod === 'amex'}
                  onChange={clearField('cvv')}
                  value="amex"
                />
                <Field
                  component={S.RadioCondition}
                  label={<Icon type="diners" />}
                  name="cardMethod"
                  checked={cardMethod === 'diners'}
                  onChange={clearField('cvv')}
                  value="diners"
                />
              </S.Cards>
            </S.WrapCards>
            <S.WrapInputs>
              <S.WrapInput min-width="310px">
                <Field
                  component={Input}
                  name="cardNumber"
                  inputMode="numeric"
                  label="Número de tarjeta"
                  pipe={trim()}
                  mask={Masks.CREDIT_CARD_NUMBER}
                  placeholder="0000 - 0000 - 0000 - 0000"
                />
              </S.WrapInput>

              <S.WrapInput max-width="150px">
                <Field
                  component={Input}
                  name="expiryDate"
                  mask={Masks.EXPIRY_DATE}
                  placeholder="mm/aaaa"
                  inputMode="numeric"
                  label="F. de Vencimiento"
                />
              </S.WrapInput>
              <S.WrapInput max-width="135px">
                <Field
                  component={Input}
                  suffix={
                    <Icon type={cardMethod === 'amex' ? 'cvvfront' : 'cvv'} />
                  }
                  inputMode="numeric"
                  type="text"
                  mask={
                    cardMethod === 'amex'
                      ? [...Masks.CREDIT_CARD_CVV, /\d/]
                      : Masks.CREDIT_CARD_CVV
                  }
                  name="cvv"
                  label="CVV"
                  placeholder={cardMethod === 'amex' ? '****' : '***'}
                />
              </S.WrapInput>
            </S.WrapInputs>

            <Field
              component={S.AgreementCheckbox}
              name="agreed"
              checked={agreed}
              value={agreed}
              label={
                <span>
                  Acepto las{' '}
                  <S.Link
                    href="https://suscripciones.gestion.pe/terminos/"
                    rel="noopener noreferrer"
                    target="_blank">
                    condiciones de servicio
                  </S.Link>
                  ,{' '}
                  <S.Link
                    href="https://gestion.pe/politica-de-privacidad"
                    rel="noopener noreferrer"
                    target="_blank">
                    política de privacidad
                  </S.Link>{' '}
                  , y estoy de acuerdo con la información.
                </span>
              }
            />

            <S.Span>
              El precio de la suscripción se cargará automáticamente en tu
              tarjeta cada mes o año, según el período elegido.
            </S.Span>

            <S.WrapSubmit>
              <Button disabled={isSubmitting} type="submit" maxWidth="300px">
                PAGAR
              </Button>
            </S.WrapSubmit>
            <Persist name="paywall-payment-form" />
          </Form>
        )
      }}
    />
  )
}

export default FormPay
