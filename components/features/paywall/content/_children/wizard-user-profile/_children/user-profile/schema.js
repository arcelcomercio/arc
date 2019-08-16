import schema, { Masks as M } from '../../../../../_dependencies/schema'

export const Masks = M

export const MESSAGE = {
  // eslint-disable-next-line no-template-curly-in-string
  MIN: 'Longitud inválida, mínimo ${min} caracteres.',
  // eslint-disable-next-line no-template-curly-in-string
  MAX: 'Longitud inválida, máximo ${max} caracteres.',
  REQUIRED: 'Este campo es requerido',
  EXTRA_SPACE: 'Formato inválido',
  CELULAR: 'Longitud inválida, entre 9 y 12 caracteres',
  DNI: 'Longitud inválida, requiere 8 dígitos',
  EMAIL: 'Correo inválido',
  CUSTOM: 'Formato inválido',
}

export const FormSchema = schema({
  firstName: value => {
    value
      .dedup(' ')
      .required(MESSAGE.REQUIRED)
      .min(3, MESSAGE.MIN)
      .max(50, MESSAGE.MAX)
      .custom(/[^\s]$/, MESSAGE.EXTRA_SPACE)
  },
  lastName: value => {
    value
      .dedup(' ')
      .required(MESSAGE.REQUIRED)
      .min(3, MESSAGE.MIN)
      .max(50, MESSAGE.MAX)
      .custom(/[^\s]$/, MESSAGE.EXTRA_SPACE)
  },
  secondLastName: value => {
    value
      .dedup(' ')
      .min(3, MESSAGE.MIN)
      .max(50, MESSAGE.MAX)
      .custom(/[^\s]$/, MESSAGE.EXTRA_SPACE)
  },
  documentNumber: (value, { documentType }) => {
    switch (documentType) {
      default:
      case 'DNI':
        value.required(MESSAGE.REQUIRED).length(8, MESSAGE.DNI)
        break
      case 'CDI':
      case 'CEX':
        value
          .required(MESSAGE.REQUIRED)
          .custom(/^[ A-Za-z0-9-]*$/, MESSAGE.CUSTOM)
          .min(5, MESSAGE.MIN)
          .max(15, MESSAGE.MAX)
        break
    }
  },
  phone: value => {
    value
      .ignoreChars(' ')
      .required(MESSAGE.REQUIRED)
      .min(9, MESSAGE.CELULAR)
      .max(12, MESSAGE.CELULAR)
  },
  email: value => {
    value.required(MESSAGE.REQUIRED)
    value.email(MESSAGE.EMAIL)
  },
})
