import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  hierarchyConfig: PropTypes.contentConfig('navigation').tag({
    name: 'Editar navegación',
    group: 'Configuración del contenido',
  }),
  hidePlaylist: PropTypes.bool.tag({
    name: 'Ocultar Playlist',
    defaultValue: false,
  }),
  hideSectionBar: PropTypes.bool.tag({
    name: 'Ocultar Barra de Secciones',
    defaultValue: false,
  }),
  hideShare: PropTypes.bool.tag({
    name: 'Ocultar Compartir',
    defaultValue: false,
  }),
  hideMeta: PropTypes.bool.tag({
    name: 'Ocultar metadata',
    defaultValue: false,
  }),
  hideSticky: PropTypes.bool.tag({
    name: 'Ocultar video sticky',
    defaultValue: false,
  }),
  categoryTop: PropTypes.bool.tag({
    name: 'categoria top video mobile',
    defaultValue: false,
  }),
})

export default customFields
