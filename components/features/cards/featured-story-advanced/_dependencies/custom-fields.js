import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  storyConfig: PropTypes.contentConfig('story').isRequired.tag({
    name: 'Configuración del contenido',
  }),
  imageSize: PropTypes.oneOf(['parcialBot', 'parcialTop', 'complete']).tag({
    name: 'Posición de la imagen',
    labels: {
      parcialBot: 'Parcial inferior',
      parcialTop: 'Parcial Superior',
      complete: 'Completa',
    },
    defaultValue: 'parcialBot',
  }),
  size: PropTypes.oneOf(['oneCol', 'twoCol']).tag({
    name: 'Tamaño del destaque',
    group: 'Configuración',
    labels: {
      oneCol: '1 fila, 1 columna',
      twoCol: '1 fila, 2 columnas',
    },
    defaultValue: 'oneCol',
  }),
  headband: PropTypes.oneOf(['normal', 'live', 'tv']).tag({
    name: 'Cintillo',
    group: 'Configuración',
    labels: {
      normal: 'Normal',
      live: 'En vivo',
      tv: 'Tv',
    },
    defaultValue: 'normal',
  }),
  hightlightOnMobile: PropTypes.bool.tag({
    name: 'Destacar en móvil',
    group: 'Configuración',
    description:
      'Si esta opción es activada, la vista del elemento en móvil será igual a su vista en escritorio.',
    defaultValue: false,
  }),
  categoryField: PropTypes.string.tag({
    name: 'Sección',
    group: 'Editar campos',
    description: 'Dejar vacío para tomar el valor original de la historia.',
  }),
  titleField: PropTypes.string.tag({
    name: 'Título',
    group: 'Editar campos',
    description: 'Dejar vacío para tomar el valor original de la historia.',
  }),
  imgField: PropTypes.string.tag({
    name: 'Imagen',
    group: 'Editar campos',
    description: 'Dejar vacío para tomar el valor original de la historia.',
  }),
  flagLive: PropTypes.bool.tag({
    name: 'Activar en vivo',
    group: 'Video en vivo',
  }),
  urlVideoFacebook: PropTypes.string.tag({
    name: 'URL de facebook',
    group: 'Video en vivo',
    description:
      'Url del video en vivo que facebook ofrece desde la plataforma',
  }),
  adsSpace: PropTypes.oneOf([
    'none',
    'publirreportaje',
    'auspiciotop1',
    'auspiciotop2',
    'auspiciotop3',
    'daily1',
    'daily2',
    'catalogo1',
    'catalogo2',
    'zonaauspiciada0',
    'zonaauspiciada1',
    'zonaauspiciada2',
    'zonaauspiciada3',
    'zonaauspiciada4',
    'zonaauspiciada5',
    'zonaauspiciada6',
    'suplementos',
    'middle1',
    'middle2',
    'caja1',
    'caja2',
    'caja3',
    'zocalo1',
  ]).tag({
    name: 'Espacio',
    group: 'Publicidad',
    labels: {
      none: 'Ninguno',
      publirreportaje: 'publirreportaje',
      auspiciotop1: 'auspiciotop1',
      auspiciotop2: 'auspiciotop2',
      auspiciotop3: 'auspiciotop3',
      daily1: 'daily1',
      daily2: 'daily2',
      catalogo1: 'catalogo1',
      catalogo2: 'catalogo2',
      zonaauspiciada0: 'zonaauspiciada0',
      zonaauspiciada1: 'zonaauspiciada1',
      zonaauspiciada2: 'zonaauspiciada2',
      zonaauspiciada3: 'zonaauspiciada3',
      zonaauspiciada4: 'zonaauspiciada4',
      zonaauspiciada5: 'zonaauspiciada5',
      zonaauspiciada6: 'zonaauspiciada6',
      suplementos: 'suplementos',
      middle1: 'middle1',
      middle2: 'middle2',
      caja1: 'caja1',
      caja2: 'caja2',
      caja3: 'caja3',
    },
    defaultValue: 'none',
  }),
})

export default customFields
