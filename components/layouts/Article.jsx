import React from 'react';
import { FormatClassName } from '../../resources/utilsJs/utilities'

let classes = FormatClassName({
    layout: [
        'flex',
        'flex--justify-center'
    ],
    contentContainer: [
        'flex',
        'flex--column',
        'content-layout-container'
    ],
    mainContent: [
        'content--grid-base',
        'content-layout',
        'content--1col',
        'content--2col',
        'content--3col',
        'margin-top'
    ],
    zocalo: [
        'zocalo__container'
    ],
    main: [
        'content--grid-base',
        'content--1col',
        'col-2'
    ],
    sidebar: [
        'content--grid-base',
        'content--1col',
        'col-1'
    ]
})

const Article = props => {

    return (
            <div className={classes.layout}>
                <div className={classes.zocalo}> 
                    {props.children[0] /*Zocalo izquierda*/}
                </div>
                <div className={classes.contentContainer}>
                    {props.children[1] /*Nav*/}
                    {props.children[2] /*Header*/}
                    {props.children[3] && props.children[3] /*Encabezado adicional*/}
                    {props.children[4] && props.children[4] /*Encabezado*/}
                    <div className={classes.mainContent}>
                        <main className={classes.main}>
                            {props.children[5] /*Content*/}
                        </main>
                        <aside className={classes.sidebar}>
                            {props.children[6] /*Sidebar */}
                        </aside>
                        {props.children[7] && props.children[7] /*Contenido adicional*/}
                    </div>
                    {props.children[8] /*Footer*/}
                </div>
                <div className={classes.zocalo}>
                    {props.children[9] /*Zocalo izquierda*/}
                </div>
            </div>
    );
}

Article.sections = [
    'Zocalo izquierda', 
    'Barra de navegación', 
    'Encabezado adicional',
    'Encabezado de Página',
    'Encabezado de Articulo', 
    'Contenido',
    'Sidebar',
    'Contenido adicional',
    'Footer', 
    'Zocalo derecha'
]

export default Article;