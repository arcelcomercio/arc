import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

// import customFields from './_dependencies/custom-fields'

const classes = {
    container: 'flex flex-col p-20',
    header: 'flex justify-between',
}

const StoriesListLinkedByBrand = props => {

    return (
        <section className={classes.container}>
            <div className={classes.header}>
                <p>NO TE PIERDAS</p>
                <h3>Contenido de Mag.</h3>
            </div>
            <ul>
                <li></li>
            </ul>
        </section>
    )
}

export default StoriesListLinkedByBrand