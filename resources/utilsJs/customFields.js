import PropTypes from 'prop-types';

export const customWidth = PropTypes.oneOf(["col-1", "col-2", "col-3"]).tag({
    name: "Ancho del contenedor",
    labels: {
        "col-1": "1 Columna",
        "col-2": "2 Columnas",
        "col-3": "3 Columnas"
    },
    defaultValue: "col-1",
    group: 'Dimensiones'
});
export const customHeight = PropTypes.oneOf(["row-1", "row-2", "row-3", "row-4"]).tag({
    name: "Alto del contenedor",
    labels: {
        "row-1": "1 Fila",
        "row-2": "2 Filas",
        "row-3": "3 Filas",
        "row-4": "4 Filas"
    },
    defaultValue: "row-1",
    group: 'Dimensiones'
})
