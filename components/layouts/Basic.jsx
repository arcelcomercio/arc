import React from 'react';

const styles = {
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
    ]
}

const Basic = props => {
    return (
            <div className={styles.layout.join(' ')}>
                <div className={styles.zocalo.join(' ')}> 
                    {props.children[0] /*Zocalo izquierda*/}
                </div>
                <div className={styles.contentContainer.join(' ')}>
                    {props.children[1] /*Nav*/}
                    {props.children[2] /*Header*/}
                    <div className={styles.mainContent.join(' ')}>
                        {props.children[3] /*Content*/}
                    </div>
                    {props.children[4] /*Footer*/}
                </div>
                <div className={styles.zocalo.join(' ')}>
                    {props.children[5] /*Zocalo izquierda*/}
                </div>
            </div>
    );
}

Basic.sections = [
    'Zocalo izquierda', 
    'Nav', 
    'Header', 
    'Contenido', 
    'Footer', 
    'Zocalo derecha'
]

export default Basic;