import _createSchema, { Masks as M } from '../../../../../_dependencies/schema'

export const Masks = M

export const createSchema = (values, msgs) =>
  _createSchema(values, {
    firstName: value => {
      value
        .dedup(' ')
        .required(msgs.requiredField)
        .min(2, msgs.minLength)
        .max(50, msgs.maxLength)
    },
    lastName: value => {
      value
        .dedup(' ')
        .required(msgs.requiredField)
        .min(2, msgs.minLength)
        .max(50, msgs.maxLength)
    },
    secondLastName: value => {
      value
        .dedup(' ')
        .min(2, msgs.minLength)
        .max(50, msgs.maxLength)
    },
    documentNumber: (value, { documentType }) => {
      switch (documentType) {
        default:
        case 'DNI':
          value.required(msgs.requiredField).length(8, msgs.lengthNotExactly)
          break
        case 'CDI':
        case 'CEX':
          value
            .required(msgs.requiredField)
            .custom(/^[ A-Za-z0-9-]*$/, msgs.wrongFormat)
            .min(5, msgs.minLength)
            .max(15, msgs.maxLength)
          break
      }
    },
    phone: value => {
      value
        .ignoreChars(' ')
        .required(msgs.requiredField)
        .between(9, 12, msgs.lengthNotBetween)
    },
    email: value => {
      value.required(msgs.requiredField)
      value.email(msgs.wrongEmail)
    },
  })
