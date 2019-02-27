import PropTypes from 'prop-types'

export const customFields = PropTypes.shape({
    content: PropTypes.label.tag({
        name: 'Contenido'
    }),
    link: PropTypes.string.isRequired.tag({
        name: 'Link de nota interna'
    }),
    section: PropTypes.string.isRequired.tag({
        name: 'Sección',
        description: 'Dejar vacío para tomar el valor original de la noticia.'
    }),
    title: PropTypes.string.isRequired.tag({
        name: 'Título',
        description: 'Dejar vacío para tomar el valor original de la noticia.'
    }),
    subTitle: PropTypes.string.isRequired.tag({
        name: 'Bajada',
        description: 'Dejar vacío para tomar el valor original de la noticia.'
    }),
    orientation: PropTypes.label.tag({
        name: 'Posición del contenido'
    }),
    multimediaOrientation: PropTypes.oneOf(['top', 'bottom', 'left', 'right']).tag({
        name: 'Posición de la imagen o video',
        labels: {
            top: 'Superior',
            bottom: 'Inferior',
            left: 'Izquierda',
            right: 'Derecha'
        },
        defaultValue: 'bottom'
    }),
    contentOrientation: PropTypes.oneOf(['center', 'left', 'right']).tag({
        name: 'Posición de los textos',
        labels: {
            center: 'Centro',
            left: 'Izquierda',
            right: 'Derecha'
        },
        defaultValue: 'left'
    }),
    hasVideo: PropTypes.bool.tag({
        name: '¿Colocar un video?',
        group: 'Video'
    }),
    videoService: PropTypes.oneOf(['goldfish', 'youtube']).tag({
        name: 'Proveedor',
        group: 'Video',
        labels: {
            goldfish: 'GoldFish',
            youtube: 'Youtube'
        },
        defaultValue: 'goldfish'
    }),
    videoCode: PropTypes.string.tag({
        name: 'Código de video',
        group: 'Video'
    })
})