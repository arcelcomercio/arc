import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer'


@Consumer
class ListAuthor extends PureComponent {
	render() {
		const { globalContent } = this.props
		const { posts = [] } = globalContent || {}
		return (
			// Iteacion de item
			<div> { posts }</div>
		)
	}
}

ListAuthor.label = 'Listado de Post por autor'

export default ListAuthor