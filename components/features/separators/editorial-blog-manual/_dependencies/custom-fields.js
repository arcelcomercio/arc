import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  titleEditorial: PropTypes.string.tag({
    name: 'Titulo de bloque editorial',
  }),
  imageEditorial: PropTypes.string.tag({ name: 'Url de Imagen' }),
  post01: PropTypes.string.isRequired.tag({
    name: 'Entrada 1',
    description:
      'Ingrese el link de la entrada del blog. Ejm /blog/mirando-los-negocios-al-reves/2020/01/la-curva-de-santa-claus-y-el-algoritmo-de-la-innovacion.html',
  }),
  post02: PropTypes.string.isRequired.tag({
    name: 'Entrada 2',
    description:
      'Ingrese el link de la entrada del blog. Ejm /blog/mirando-los-negocios-al-reves/2020/01/la-curva-de-santa-claus-y-el-algoritmo-de-la-innovacion.html',
  }),
  post03: PropTypes.string.isRequired.tag({
    name: 'Entrada 3',
    description:
      'Ingrese el link de la entrada del blog. Ejm /blog/mirando-los-negocios-al-reves/2020/01/la-curva-de-santa-claus-y-el-algoritmo-de-la-innovacion.html',
  }),
  post04: PropTypes.string.isRequired.tag({
    name: 'Entrada 4',
    description:
      'Ingrese el link de la entrada del blog. Ejm /blog/mirando-los-negocios-al-reves/2020/01/la-curva-de-santa-claus-y-el-algoritmo-de-la-innovacion.html',
  }),
})

export default customFields
