import {
  namesRegex,
  numberRegex,
  // docRegex,
  emailRegex,
  // phoneRegex,
} from './Regex'

export const formatEmail = () => {
  return {
    func: value => emailRegex.test(value),
    error: 'Correo electrónico Inválido',
  }
}

export const formatNames = () => {
  return {
    func: value => namesRegex.test(value),
    error: 'Formato inválido, solo letras',
  }
}

export const formatPhone = () => {
  return {
    func: value => numberRegex.test(value),
    error: 'Formato inválido. Solo números',
  }
}

export const acceptCheckTerms = () => {
  return {
    func: value => value === 'no',
    error:
      'Para ser parte de nuestra comunidad es necesario aceptar los términos y condiciones',
  }
}

export const acceptCheckTermsPay = () => {
  return {
    func: value => value === 'no',
    error:
      'Para continuar con le proceso de pago es necesario aceptar las condiciones de servicio y las políticas de privacidad',
  }
}

const getCodeError = (code, status) => {
  switch (code) {
    case '300040':
    case '300037':
      return 'Correo electrónico y/o contraseña incorrecta.'

    case '130051`':
      return 'El Correo electrónico no ha sido verificado.'

    case '100014':
    case '300014':
      return 'Tu cuenta ha sido bloqueada debido a demasiados intentos fallidos. Por favor inténtalo más tarde.'

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
      return 'Ha ocurrido un error de red al momento de solicitar el pago. Por Favor inténtelo nuevamente.'

    case '300012':
      return 'Ha ocurrido un error al momento de generar la orden. Te recomendamos volver a intentar ó ingresar nuevamente.'

    case '100011':
      return 'Ha ocurrido un error al momento de actualizar tu perfil. Te recomendamos ingresar nuevamente.'

    case 'NoPaid':
      return `Se llegó a concluir el proceso de compra. Pero este tiene un Estado: ${status}. Comunícate con nosotros para verificar que sucedió.`

    default:
      return 'Ocurrió un error inesperado.'
  }
}

export default getCodeError
