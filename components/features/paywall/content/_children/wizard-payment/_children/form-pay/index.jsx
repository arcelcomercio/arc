import React from 'react'
import { Formik, Form, Field } from 'formik'
import { withTheme } from 'styled-components'

import { Persist } from '../../../../../_children/formik-persist'
import * as S from './styled'
import Button from '../../../../../_children/button'
import Input from '../../../../../_children/input'
import Icon from '../../../../../_children/icon'
import { createSchema, Masks } from './schema'
import { useStrings, useFusionContext } from '../../../../../_children/contexts'

const { trim } = Masks.Pipes

const FormPay = ({ theme, name, error, onSubmit, initialValues }) => {
  const msgs = useStrings()
  const {
    siteProperties: {
      paywall: { urls },
    },
  } = useFusionContext()
  return (
    <Formik
      validate={values => createSchema(values, msgs)}
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
              <Icon
                type="lock"
                width="20"
                height="25"
                fill={theme.palette.success.main}
              />
              <S.TextSecurity>{msgs.securityText}</S.TextSecurity>
            </S.Security>
            {error && <S.Error mb="20px" message={error} />}
            <S.WrapCards>
              <S.TextCard>{msgs.chooseCreditCard}</S.TextCard>
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
                  label={msgs.cardNumberlabel}
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
                <S.Agreement
                  source={msgs.interpolate(msgs.acceptAgreement, {
                    terms_url: urls.terms,
                    privacy_url: urls.privacyPolicy,
                  })}
                />
              }
            />

            <S.Span>{msgs.paymentNotice}</S.Span>

            <S.WrapSubmit>
              <Button disabled={isSubmitting} type="submit" maxWidth="300px">
                {msgs.payButton.toUpperCase()}
              </Button>
            </S.WrapSubmit>
            <Persist name={name} isSessionStorage ignoreErrors />
          </Form>
        )
      }}
    />
  )
}

export default withTheme(FormPay)
