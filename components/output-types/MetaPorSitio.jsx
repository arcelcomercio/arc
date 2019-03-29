import React, { Component, Fragment } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class MetaPorSitio extends Component {
	// eslint-disable-next-line no-useless-constructor
	constructor(props){
		super(props)
	}

	render() {
		const { siteproperties : {
      favicon,
      appleIcon,
      canonical,
			ldjson,
			tagmanager }
    } = this.props
		return (
			<Fragment>
				<link rel="shortcut icon" href={favicon} />
				<link rel="apple-touch-icon" href={appleIcon} />
				<link rel="canonical" href={canonical} />
				<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldjson }} />
			</Fragment>
		);
	}
}

export default MetaPorSitio