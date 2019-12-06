import React from 'react'

const classes = {
    container: 'flex flex-col justify-start p-20',
    header: 'flex justify-between items-center border-b-1 border-solid border-black',
    headerText: 'uppercase',
    headerBrand: '',
    list: 'flex flex-col'
}

const StoriesListLinkedByBrandChild = ({
    isAdmin,
    stories,
    lazyImage
}) => {

    return (
        <section className={classes.container}>
            <div className={classes.header}>
                <p>NO TE PIERDAS</p>
                <h3>Contenido de Mag.</h3>
            </div>
            <ul className={classes.list}>
                <li></li>
            </ul>
        </section>
    )
}

// TODO: Verificar si ayuda React.memo
export default StoriesListLinkedByBrandChild