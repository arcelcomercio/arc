import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'

import CardNotice from '../../../../resources/components/listado-noticias'

@Consumer
class ListadoNoticia extends Component {
	static SECTION_DEFAULT = 'todas'

	constructor(props) {
		super(props)
		this.renderCount = 0
	}

	render() {
		const {
			globalContent: { content_elements: contentElements },
			arcSite,
		} = this.props
		const params = {
			data: contentElements || [],
			arcSite,
		}

		return (
			<Fragment>
				<div>
					{params.data.slice(8,16).map((el, index) => (
						<CardNotice key={index} formato="row" data={el} arcSite={params.arcSite} />
					))}
				</div>
			</Fragment>
		)
	}
}

export default ListadoNoticia
