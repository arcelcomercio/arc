import React from 'react';

let styles = {
    layout: [
        'flex',
        'flex__justify--center'
    ],
    contentContainer: [
        'flex',
        'flex__column'
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
}

const Article = props => {

    return (
            <div className={styles.layout.join(' ')}>
                <div className={styles.zocalo.join(' ')}> 
                    {props.children[0] /*Zocalo izquierda*/}
                </div>
                <div className={styles.contentContainer.join(' ')}>
                    {props.children[1] /*Nav*/}
                    {props.children[2] /*Header*/}
                    {props.children[3] && props.children[3] /*Encabezado adicional*/}
                    {props.children[4] && props.children[4] /*Encabezado*/}
                    <div className={styles.mainContent.join(' ')}>
                        <main className={styles.main.join(' ')}>
                            {props.children[5] /*Content*/}
                        </main>
                        <aside className={styles.sidebar.join(' ')}>
                            {props.children[6] /*Sidebar */}
                        </aside>
                        {props.children[7] && props.children[7] /*Contenido adicional*/}
                    </div>
                    {props.children[8] /*Footer*/}
                </div>
                <div className={styles.zocalo.join(' ')}>
                    {props.children[9] /*Zocalo izquierda*/}
                </div>
            </div>
    );
}

Article.sections = [
    'Zocalo izquierda', 
    'Barra de navegación', 
    'Encabezado adicional',
    'Encabezado',
    'Header', 
    'Contenido',
    'Sidebar',
    'Contenido adicional',
    'Footer', 
    'Zocalo derecha'
]

export default Article;