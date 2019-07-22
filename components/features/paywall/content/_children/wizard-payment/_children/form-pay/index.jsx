import React from 'react'
import styled from 'styled-components'
import { Formik, Form, Field } from 'formik'
import RadioButton from '../../../radio-button'
import * as S from './styled'
import Button from '../../../../../_children/button'
import Input from '../../../../../_children/input'
import Icon from '../../../../../_children/icon'
import { devices } from '../../../../../_dependencies/devices'

const RadioCondition = styled(RadioButton)`
  @media (${devices.mobile}) {
    flex-direction: row;
    margin: 0;
  }
`

const cardPatterns = {
  VISA: /^(4)(\d{12}|\d{15})$|^(606374\d{10}$)/,
  MASTERCARD: /^(5[1-5]\d{14}$)|^(2(?:2(?:2[1-9]|[3-9]\d)|[3-6]\d\d|7(?:[01]\d|20))\d{12}$)/,
  AMEX: /^3[47][0-9]{13}$/,
  DINERS: /(^[35](?:0[0-5]|[268][0-9])[0-9]{11}$)|(^30[0-5]{11}$)|(^3095(\d{10})$)|(^36{12}$)|(^3[89](\d{12})$)/,
  NARANJA: /^(589562)\d{10}$/,
  SHOPPING: /(^603488(\d{10})$)|(^2799(\d{9})$)/,
  CABAL: /(^604(([23][0-9][0-9])|(400))(\d{10})$)|(^589657(\d{10})$)/,
  ARGENCARD: /^(501105|532362)(\d{10}$)/,
  CENCOSUD: /^603493(\d{10})$/,
  HIPERCARD: /^(384100|384140|384160|606282)(\d{10}|\d{13})$/,
  CODENSA: /^590712(\d{10})$/,
  ELO: /(^(636368|438935|504175|451416|636297|650901|650485|650541|650700|650720|650720|650720|655021|650405)\d{10})$|(^(5090|5067|4576|4011)\d{12})$|(^(50904|50905|50906)\d{11})$/,
}

const cvvPatterns = {
  VISA: /^\d{3}$/,
  MASTERCARD: /^\d{3}$/,
  AMEX: /^\d{3,4}$/,
  DINERS: /^\d{3}$/,
}

const formValidations = values => {
  const errors = {}
  if (values.cardMethod && values.cardNumber) {
    const cardNumber = values.cardNumber.replace(/\D/g, '').trim()
    const regex = cardPatterns[values.cardMethod.toUpperCase()]
    if (!regex.test(cardNumber)) {
      errors.cardNumber = 'Número tarjeta inválido'
    }
  }
  if (values.expiryDate) {
    const errorMsg = 'Fecha incorrecta'
    const match = values.expiryDate.trim().match(/^(\d\d)\/(\d\d(\d\d)?)$/)
    if (!match) errors.expiryDate = errorMsg
    else {
      let _m = match[1]
      let _y = match[2]
      if (!(_m >= 0 && _m < 13)) {
        errors.expiryDate = errorMsg
      }
      if (_y.length === 2) {
        _y = '20' + _y
      }

      if (_m.length === 1) {
        _m = '0' + _m
      }

      var formDate = new Date(_y, _m - 1)
      if (formDate < Date.now()) {
        errors.expiryDate = errorMsg
      }
    }
  }
  if (values.cvv) {
    const match = cvvPatterns[values.cvv]
    if (!match) {
      errors.cvv = 'CVV inválido'
    }
  }

  if (!values.term) {
    errors.term = 'Debe seleccionar el check'
  }
  return errors
}

const FormPay = ({ onSubmit, onReset }) => (
  <Formik
    validate={formValidations}
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
              valueCheck="mastercard"
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
          valueCheck="term"
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
