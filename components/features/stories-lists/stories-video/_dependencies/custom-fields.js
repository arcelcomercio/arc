import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
    story01:PropTypes.string.isRequired.tag({
        name:'Nota destacada',
        description:'Ingrese el link de la nota con video destacada. Ejm /video/clausura-panamericanos'
    }),
    story02:PropTypes.string.isRequired.tag({
        name:'Nota 1',
        description:'Ingrese el link de la nota con video. Ejm /video/clausura-panamericanos'
    }),
    story03:PropTypes.string.isRequired.tag({
        name:'Nota 2',
        description:'Ingrese el link de la nota con video. Ejm /video/clausura-panamericanos'
    }),
    story04:PropTypes.string.isRequired.tag({
        name:'Nota 3',
        description:'Ingrese el link de la nota con video. Ejm /video/clausura-panamericanos'
    }),
    story05:PropTypes.string.isRequired.tag({
        name:'Nota 4',
        description:'Ingrese el link de la nota con video. Ejm /video/clausura-panamericanos'
    }),
})

export default customFields