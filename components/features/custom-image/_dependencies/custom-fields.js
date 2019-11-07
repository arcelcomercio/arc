import PropTypes from 'prop-types';

const customFields = PropTypes.shape({
    imgUrlDesktop: PropTypes.string.tag({
        name: 'Url imagen desktop',
    }),
    imgUrlMobile: PropTypes.string.tag({
        name: 'Url imagen mobile',
    }),
    imgTitle: PropTypes.string.tag({
        name: 'Title imagen',
    }),
    imgAlt: PropTypes.string.tag({
        name: 'Alt imagen',
    }),
    imgLink: PropTypes.string.tag({
        name: 'Link imagen',
    }),
    imgWidth: PropTypes.string.tag({
        name: 'Ancho',
        description:
        'Debería ingresar pixeles o porcentaje. Ejemplo: 100px ó 100%',
    })
})


export default customFields