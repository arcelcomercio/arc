const getCodeError = code => {
  switch (code) {
    case '300040':
    case '300037':
      return 'Correo electrónico y/o contraseña incorrecta.'

    case '130051':
      return 'Activa tu cuenta para iniciar sesión'

    case '100014':
    case '300014':
      return 'Tu cuenta ha sido bloqueada debido a demasiados intentos fallidos. Por favor inténtalo más tarde.'

    case 'Failed to fetch':
      return 'Oops. Ocurrió un error inesperado.'

    case '300030':
      return 'Tu correo electrónico no está registrado.'

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

    case 'verifyReset':
      return 'Activa tu cuenta para resetear la contraseña'

    case 'verifySocial':
      return 'El Correo Electrónico asociado a tu red social no está verificado. Contáctate al Call Center: 311-5100.'

    default:
      return 'Ocurrió un error inesperado.'
  }
}

export default getCodeError
