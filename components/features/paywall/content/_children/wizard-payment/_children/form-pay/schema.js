/* eslint-disable import/prefer-default-export */
import schema, { Masks as M } from '../../../../../_dependencies/schema'

export const Masks = M

const MESSAGE = {
  REQUIRED: 'Este campo es requerido',
  WRONG_CARD_NUMBER: 'Número tarjeta inválido',
  WRONG_CVV: 'CVV Inválido',
  WRONG_EXPIRY_DATE: 'Fecha incorrecta',
  CHECK_REQUIRED: 'Debe seleccionar el check',
}

export const FormSchema = schema({
  cardMethod: value => {
    value.required(MESSAGE.REQUIRED)
  },
  cardNumber: (value, { cardMethod }) => {
    value
      .required(MESSAGE.REQUIRED)
      .creditCardNumber(cardMethod, MESSAGE.WRONG_CARD_NUMBER)
  },
  cvv: (value, { cardMethod }) => {
    value
      .required(MESSAGE.REQUIRED)
      .creditCardCvv(cardMethod, MESSAGE.WRONG_CVV)
  },
  expiryDate: value => {
    const match = (value.value || '').match(/^(\d\d)\/(\d\d(\d\d)?)$/)
    if (!match) throw MESSAGE.WRONG_EXPIRY_DATE
    let _m = match[1]
    let _y = match[2]
    if (!(_m >= 0 && _m < 13)) {
      throw MESSAGE.WRONG_EXPIRY_DATE
    }
    if (_y.length === 2) {
      _y = '20' + _y
    }

    if (_m.length === 1) {
      _m = '0' + _m
    }

    const formDate = new Date(_y, _m - 1)
    if (formDate < Date.now()) {
      throw MESSAGE.WRONG_EXPIRY_DATE
    }
    return this
  },
  agreed: value => value.required(MESSAGE.REQUIRED),
})
