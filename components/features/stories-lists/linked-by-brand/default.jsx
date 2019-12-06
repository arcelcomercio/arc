import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'
import { defaultImage } from '../../../utilities/helpers'

import StoriesListLinkedByBrandChild from './_children/linked-by-brand'

const StoriesListLinkedByBrand = props => {
    const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()
    const {
        customFields: {
            feedConfig: {
                contentService = '',
                contentConfigValues = {},
            } = {}
        } = {},
    } = props

    /**
     * TODO: Se podria agregar caso por defecto para que haga fetch
     * de las ultimas notas de Mag o del sitio actual.
     */
    const data = useContent({
        source: contentService,
        query: contentConfigValues,
        filter: schemaFilter(arcSite),
    }) || {}

    const {
        title,
        websiteLink,
        multimediaSquareL,
        multimediaSquareMD,
        multimediaSquareS,
        multimediaType,
        multimediaSubtitle,
        multimediaCaption,
    } = new StoryData({
        data,
        arcSite,
        contextPath,
        deployment,
        defaultImgSize: 'sm',
    })

    const params = {
        isAdmin,
        title,
        websiteLink,
        multimediaSquareL,
        multimediaSquareMD,
        multimediaSquareS,
        lazyImage: defaultImage({
            deployment,
            contextPath,
            arcSite,
            size: 'sm',
        }),
        multimediaType,
        multimediaSubtitle,
        multimediaCaption,
    }

    return <StoriesListLinkedByBrandChild {...params} />
}

StoriesListLinkedByBrand.propTypes = {
    customFields,
}

StoriesListLinkedByBrand.label = 'No te pierdas - por marca'

export default StoriesListLinkedByBrand