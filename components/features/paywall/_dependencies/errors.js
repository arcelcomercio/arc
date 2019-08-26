const Errors = {
  E300012: 'No se ha encontrado ningún carrito para el usuario.',
}
const getMessage = errCode => {
  switch (errCode) {
    case 'E300012':
      return Error.E300012
    default:
      return 'Disculpe, ha ocurrido un error durante el pago'
  }
}

Errors.getMessage = getMessage

export default Errors
