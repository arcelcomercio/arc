import schema, { Masks as M } from '../../../../../_dependencies/schema'

export const Masks = M

export const MESSAGE = {
  REQUIRED: 'Este campo es requerido',
  DNI: 'Longitud inválida, requiere 8 dígitos',
}

export const FormSchema = schema({
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
})
