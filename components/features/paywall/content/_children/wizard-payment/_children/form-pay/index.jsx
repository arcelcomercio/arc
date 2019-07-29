import React from 'react'
import styled from 'styled-components'
import { Formik, Form, Field } from 'formik'
import Checkbox from '../../../../../_children/checkbox'
import * as S from './styled'
import Button from '../../../../../_children/button'
import Error from '../../../../../_children/error'
import Input from '../../../../../_children/input'
import Icon from '../../../../../_children/icon'
import { FormSchema, Masks } from './schema'
import { devices } from '../../../../../_dependencies/devices'

const RadioCondition = styled(Checkbox)``
RadioCondition.defaultProps = { radio: true }

const AgreementCheckbox = styled(Checkbox)`
  @media (${devices.mobile}) {
    flex-direction: row;
    margin: 0;
  }
`

const FormPay = ({ error, onSubmit }) => {
  return (
    <Formik
      validate={values => new FormSchema(values)}
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
      render={({ values: { cardMethod, agreed }, isSubmitting }) => (
        <Form>
          <S.Security>
            <Icon type="lock" width="20" height="25" />
            <S.TextSecurity>
              Compra seguro. Esta web está protegida
            </S.TextSecurity>
          </S.Security>
          {error && <Error mb="20px" message={error} />}
          <S.WrapCards>
            <S.TextCard>Selecciona un tipo de tarjeta</S.TextCard>
            <S.Cards>
              <Field
                component={RadioCondition}
                label={<Icon type="visa" />}
                name="cardMethod"
                checked={cardMethod === 'visa'}
                value="visa"
              />
              <Field
                component={RadioCondition}
                label={<Icon type="mcard" />}
                name="cardMethod"
                checked={cardMethod === 'mastercard'}
                value="mastercard"
              />
              <Field
                component={RadioCondition}
                label={<Icon type="amex" />}
                name="cardMethod"
                checked={cardMethod === 'amex'}
                value="amex"
              />
              <Field
                component={RadioCondition}
                label={<Icon type="diners" />}
                name="cardMethod"
                checked={cardMethod === 'diners'}
                value="diners"
              />
            </S.Cards>
          </S.WrapCards>
          <S.WrapInputs>
            <S.WrapInput min-width="310px">
              <Field
                component={Input}
                name="cardNumber"
                label="Número de tarjeta"
                // prettier-ignore
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
                label="F. de Vencimiento"
              />
            </S.WrapInput>
            <S.WrapInput max-width="135px">
              <Field
                component={Input}
                sufix={<Icon type="cvv" />}
                type="number"
                mask={Masks.CREDIT_CARD_CVV}
                name="cvv"
                label="CVV"
                placeholder="***"
              />
            </S.WrapInput>
          </S.WrapInputs>

          <Field
            component={AgreementCheckbox}
            name="agreed"
            checked={agreed}
            value={agreed}
            label={
              <span>
                Acepto las{' '}
                <S.Link
                  href="https://suscripciones.gestion.pe/terminos/"
                  target="_blank">
                  condiciones de servicio
                </S.Link>
                ,{' '}
                <S.Link
                  href="https://gestion.pe/politica-de-privacidad"
                  target="_blank">
                  política de privacidad
                </S.Link>{' '}
                , y estoy de acuerdo con la información.
              </span>
            }
          />

          <S.Span>
            La suscripción se renovará automáticamente de acuerdo a tu plan.
          </S.Span>

          <S.WrapSubmit>
            <Button disabled={isSubmitting} type="submit" maxWidth="300px">
              PAGAR
            </Button>
          </S.WrapSubmit>
        </Form>
      )}
    />
  )
}

export default FormPay
