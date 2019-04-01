import React, { Fragment } from 'react'

export default (props) => {

    const twitterUser = '@elcomercio'
    const title = ''
    const siteUrl = 'elcomercio.pe'
    const arcSite = 'elcomercio'
    const description = ''

    const article = true
    const twitterCreator = '@cajotafer'

    return (
        <Fragment>
            {/* <!-- Twitter Cards --> */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content={twitterUser} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:image" content={`https://${siteUrl}/resources/dist/${arcSite}/images/logo-sitio.jpg`} />
            <meta name="twitter:description" content={description} />
            {article && <meta name="twitter:creator" content={twitterCreator} />}
        </Fragment>
    )
}