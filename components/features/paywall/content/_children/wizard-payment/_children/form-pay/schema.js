/* eslint-disable import/prefer-default-export */
import _createSchema, { Masks as M } from '../../../../../_dependencies/schema'

export const Masks = M

export const createSchema = (values, msgs) =>
  _createSchema(values, {
    cardMethod: value => {
      value.required(msgs.requiredField)
    },
    cardNumber: (value, { cardMethod }) => {
      value
        .required(msgs.requiredField)
        .creditCardNumber(cardMethod, msgs.wrongCardNumber)
    },
    cvv: (value, { cardMethod }) => {
      value
        .required(msgs.requiredField)
        .creditCardCvv(cardMethod, msgs.wrongCvv)
    },
    expiryDate: value => {
      value.expiryDate(value, msgs.wrongDate)
    },
    agreed: value => value.required(msgs.requiredField),
  })
