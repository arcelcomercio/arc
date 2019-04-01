import React, { Fragment } from 'react'

export default (props) => {

    const fbAppId = '1667917060088448'
    const title = ''
    const description = ''
    const siteUrl = 'elcomercio.pe'
    const arcSite = 'elcomercio'
    const requestUri = '/cajotafer'
    const siteName = 'El Comercio'

    const article = true

    return (
        <Fragment>
            {/* <!-- Facebook OG --> */}
            <meta property="fb:app_id" content={fbAppId} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image"
                content={article // Img de articulo o logo
                    ? `https://${siteUrl}/resources/dist/${arcSite}/images/logo-sitio.jpg`
                    : `https://${siteUrl}/resources/dist/${arcSite}/images/logo-sitio.jpg`
                }
            />
            {
                article &&
                <Fragment>
                    <meta property="og:image:width" content="696" />
                    <meta property="og:image:height" content="418" />
                    <meta property="og:image:type" content="image/jpeg" />
                </Fragment>

            }
            <meta property="og:url" content={`https://${siteUrl}${requestUri}`} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:type" content={article ? 'article' : 'website'} />
        </Fragment>
    )
}