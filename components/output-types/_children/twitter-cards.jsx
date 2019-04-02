import React, { Fragment } from 'react'

export default ({ twitterUser, title, siteUrl, arcSite, description, twitterCreator, article }) => {

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