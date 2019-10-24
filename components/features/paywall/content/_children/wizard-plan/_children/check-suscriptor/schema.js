import _createSchema, { Masks as M } from '../../../../../_dependencies/schema'

export const Masks = M

export const createSchema = (values, msgs) =>
  _createSchema(values, {
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
  })
