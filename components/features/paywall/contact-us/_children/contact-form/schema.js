import _createSchema, { Masks as M } from '../../../_dependencies/schema'

export const Masks = M

export const createSchema = (values, msgs) =>
  _createSchema(values, {
    correo: value => {
      value.required(msgs.requiredField)
      value.email(msgs.wrongEmails)
    },
    nombre: value => {
      value
        .required(msgs.requiredField)
        .min(2, msgs.minLength)
        .max(50, msgs.maxLength)
    },
    apellido: value => {
      value
        .required(msgs.requiredField)
        .min(2, msgs.minLength)
        .max(50, msgs.maxLength)
    },
    organizacion: value => {
      value.required(msgs.requiredField)
      value.min(1, msgs.minLength)
      value.max(50, msgs.maxLength)
    },
    telefono: value => {
      value
        .ignoreChars(' ')
        .required(msgs.requiredField)
        .between(9, 12, msgs.lengthNotBetween)
    },
    tipo_consulta: value => {
      value.required('Debe seleccionar un tipo')
    },
    descripcion: value => {
      value.max(500, msgs.maxLength)
    },
  })
