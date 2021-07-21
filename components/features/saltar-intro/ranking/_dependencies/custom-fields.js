import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  titleOne: PropTypes.string.isRequired.tag({
    name: '1er título del ranking',
    group: '1er Ranking',
  }),
  imageOne: PropTypes.string.isRequired.tag({
    name: 'Imagen del 1er ranking',
    group: '1er Ranking',
  }),
  rankOneTitle1: PropTypes.string.isRequired.tag({
    name: 'Nombre posición 1',
    group: '1er Ranking',
  }),
  rankOnePlatform1: PropTypes.string.isRequired.tag({
    name: 'Plataforma posición 1',
    group: '1er Ranking',
  }),
  rankOneTitle2: PropTypes.string.isRequired.tag({
    name: 'Nombre posición 2',
    group: '1er Ranking',
  }),
  rankOnePlatform2: PropTypes.string.isRequired.tag({
    name: 'Plataforma posición 2',
    group: '1er Ranking',
  }),
  rankOneTitle3: PropTypes.string.isRequired.tag({
    name: 'Nombre posición 3',
    group: '1er Ranking',
  }),
  rankOnePlatform3: PropTypes.string.isRequired.tag({
    name: 'Plataforma posición 3',
    group: '1er Ranking',
  }),
  /* title: PropTypes.string.tag({
    name: 'Título',
    description:
      'Si no se llena este campo, se mostrará el título por defecto de la nota.',
  }), */
  titleTwo: PropTypes.string.isRequired.tag({
    name: '2do título del ranking',
    group: '2do Ranking',
  }),
  imageTwo: PropTypes.string.isRequired.tag({
    name: 'Imagen del 2do ranking',
    group: '2do Ranking',
  }),
  rankTwoTitle1: PropTypes.string.isRequired.tag({
    name: 'Nombre posición 1',
    group: '2do Ranking',
  }),
  rankTwoPlatform1: PropTypes.string.isRequired.tag({
    name: 'Plataforma posición 1',
    group: '2do Ranking',
  }),
  rankTwoTitle2: PropTypes.string.isRequired.tag({
    name: 'Nombre posición 2',
    group: '2do Ranking',
  }),
  rankTwoPlatform2: PropTypes.string.isRequired.tag({
    name: 'Plataforma posición 2',
    group: '2do Ranking',
  }),
  rankTwoTitle3: PropTypes.string.isRequired.tag({
    name: 'Nombre posición 3',
    group: '2do Ranking',
  }),
  rankTwoPlatform3: PropTypes.string.isRequired.tag({
    name: 'Plataforma posición 3',
    group: '2do Ranking',
  }),

  seeMoreLink: PropTypes.string.tag({ name: 'Link de Ver Mas' }),
})

export default customFields
