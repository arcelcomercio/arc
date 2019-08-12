import schema, {Masks as M} from '../../_dependencies/schema'

export const Masks = M

export const MESSAGE = {
  // eslint-disable-next-line no-template-curly-in-string
  MIN: 'Longitud inválida, mínimo ${min} caracteres.',
  // eslint-disable-next-line no-template-curly-in-string
  MAX: 'Longitud inválida, Máximo ${max} caracteres.',
  REQUIRED: 'Este campo es requerido',
  EMAIL: 'Correo inválido',
  SUBJECT: 'Ingrese el Asunto',
  API_ERROR: 'Intentlo más tarde'
}

export const FormSchema = schema({
  email: value => {
    value.required(MESSAGE.REQUIRED)
    value.email(MESSAGE.EMAIL)
  },
  name: value => {
    value
      .required(MESSAGE.REQUIRED)
      .min(3, MESSAGE.MIN)
      .max(50, MESSAGE.MAX)
  },
  lastname: value => {
    value
      .required(MESSAGE.REQUIRED)
      .min(3, MESSAGE.MIN)
      .max(50, MESSAGE.MAX)
  },
  company_name: value => {
    value.required(MESSAGE.REQUIRED)
    value.min(1, MESSAGE.MIN)
    value.max(50, MESSAGE.MAX)
  },
  subject: value => {
    value.required(MESSAGE.SUBJECT)
    value.min(3, MESSAGE.MIN)
    value.max(100, MESSAGE.MAX)
  },
  /* description: value => {
    value.required(MESSAGE.REQUIRED)
    value.min(12, MESSAGE.MIN)
    value.max(1000, MESSAGE.MAX)    
  } */
})
