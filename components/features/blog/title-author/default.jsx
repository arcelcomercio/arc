import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer'


@Consumer
class TitleAuthor extends PureComponent {
	render() {
		const { globalContent } = this.props
		const { user = [] } = globalContent || {}
		return (
			// Componente titulo
			<div> {user}</div>
		)
	}
}

TitleAuthor.label = 'Titulo autor'

export default TitleAuthor