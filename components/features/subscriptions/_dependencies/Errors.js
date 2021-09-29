import {
  birthDateRegex,
  cellphoneRegex,
  descripRegex,
  emailRegex,
  namesRegex,
  numberRegex,
} from './Regex'

export const formatEmail = () => ({
  func: (value) => emailRegex.test(value) && !value.match(/@facebook.com/),
  error: 'Correo electrónico Inválido',
})

export const formatPass = () => ({
  func: (value) => value.length >= 8,
  error: 'Mínimo 8 caracteres',
})
export const formatNames = () => ({
  func: (value) => value === '' || namesRegex.test(value),
  error: 'Formato inválido, solo letras',
})

export const formatSecondLastName = () => ({
  func: (value) =>
    value === '' || (value.length >= 2 && namesRegex.test(value)),
  error: 'Formato inválido, solo letras',
})

export const formatPhone = () => ({
  func: (value) =>
    value === '' || (value.length >= 2 && numberRegex.test(value)),
  error: 'Formato inválido. Solo números',
})

export const formatDate = () => ({
  func: (value) => value === '' || (value && birthDateRegex.test(value)),
  error: 'El formato de la fecha es incorrecto.',
})

const calculateAge = (date) => {
  const birthday = new Date(date)
  const currentDate = new Date()

  const time = parseInt(
    (currentDate.getTime() - birthday.getTime()) / (1000 * 3600 * 24) / 365,
    10
  )
  return time
}

export const minBirthDay = () => ({
  func: (value) => value === null || calculateAge(value) > 4,
  error: 'No cumple con la edad mínima',
})

export const maxBirthDay = () => ({
  func: (value) => value === null || calculateAge(value) < 100,
  error: '¿Está seguro que tiene esa edad?',
})

export const formatCellphone = () => ({
  func: (value) => cellphoneRegex.test(value),
  error: 'Formato inválido.',
})

export const acceptCheckTerms = () => ({
  func: (value) => value !== '1',
  error:
    'Para ser parte de nuestra comunidad es necesario aceptar los términos y condiciones',
})

export const acceptCheckTermsPay = () => ({
  func: (value) => value === 'no',
  error:
    'Para continuar con le proceso de pago es necesario aceptar las condiciones de servicio y las políticas de privacidad',
})

export const formatDescription = () => ({
  func: (value) =>
    value === '' || (value.length >= 2 && descripRegex.test(value)),
  error: 'Contiene caracteres no permitidos',
})

export const formatCvv = () => ({
  func: (value) => /^(\d{3,4})/.test(value),
  error: 'Mínimo 3 caracteres',
})

export const formatExpire = () => ({
  func: (value) =>
    /^(0[1-9]|1[0-2])\/?(((202)\d{1}|(202)\d{1})|(2)\d{1})$/.test(value),
  error: 'Formato inválido',
})

const getCodeError = (code, status) => {
  switch (code) {
    case '300040':
    case '300037':
      return 'Correo electrónico y/o contraseña incorrecta.'

    case '130051':
      return 'Activa tu cuenta para iniciar sesión'

    case '100014':
    case '300014':
      return 'Tu cuenta ha sido bloqueada debido a demasiados intentos fallidos. Por favor inténtalo más tarde.'
    case '300015':
      return 'Pedido no encontrado.'
    case '300030':
      return 'Tu correo electrónico no está registrado.'

    case '300022':
    case '300031':
    case '300039':
    case '300023':
      return 'El correo electrónico ingresado ya existe.'

    case '300033':
      return 'Token inválido o caducado'

    case '300020':
      return 'Token inválido o caducado'

    case '300036':
      return 'Tu contraseña tiene un formato inválido.'

    case '300201':
      return 'El campo ingresado contiene caracteres inválidos.'

    case '100018':
      return 'Su tiempo ha expirado, para continuar con la compra ingresar nuevamente.'
    case '3001001':
      return 'Al parecer hubo un problema con su cuenta, intente ingresar nuevamente.'

    case '300130':
      return 'El campo Apellido Paterno es requerido.'

    case '300128':
      return 'El campo Nombre excedió la cantidad de caracteres permitidos.'

    case '300130,300066,300063':
    case '300066,300063,300130':
    case '300066,300130,300063':
    case '300130,300063,300066':
    case '300063,300130,300066':
    case '300063,300066,300130':
      return 'Los campos Apellido Paterno y Documento de Identidad son requeridos'

    case '300063,300066':
    case '300066,300063':
      return 'El campo Documento de Identidad es requerido.'

    case '3007018':
      return 'El campo Teléfono es requerido.'

    case 'Failed to fetch':
      return 'Oops. Ocurrió un error inesperado.'

    case '300170':
      return 'Ha ocurrido un error de red al momento de solicitar el pago. Por favor inténtelo nuevamente.'

    case '300012':
      return 'Ha ocurrido un error al momento de generar la orden. Te recomendamos volver a intentar ó ingresar nuevamente.'

    case '100011':
      return 'Ha ocurrido un error al momento de actualizar tu perfil. Te recomendamos ingresar nuevamente.'

    case 'NoPaid':
      return `Se llegó a concluir el proceso de compra. Pero este tiene un Estado: ${status}. Comunícate con nosotros para verificar que sucedió.`

    case 'lostSession':
      return 'El Usuario ha perdido su sesión/perfil'

    case 'transactionError':
      return 'Ocurrió un error en la transacción con PayU'

    case 'errorFinalize':
      return 'Ocurrió un error al finalizar la compra con ARC'

    case 'errorNoTokenPayU':
      return 'Ocurrió un error al momento re realizar la transacción. Por favor inténtelo nuevamente.'

    case '300169':
      return 'Ocurrió un error. No se pudo tokenizar la tarjeta'

    case 'verifyReset':
      return 'Activa tu cuenta para resetear la contraseña'

    case 'verifySocial':
      return 'El Correo Electrónico asociado a tu red social no está verificado. Contáctate al Call Center: 311-5100.'

    case 'validCaptcha':
      return 'Seleccionar la casilla de verificación'

    case 'updateCard':
      return 'Ha ocurrido un error inesperado. Por favor inténtalo más tarde ó contáctanos al 01 311-5100.'

    case 'updateCardTry':
      return 'Ha ocurrido un error al actualizar. Revise sus datos de tarjeta e inténtelo nuevamente.'

    default:
      return 'Ocurrió un error inesperado.'
  }
}

export default getCodeError
