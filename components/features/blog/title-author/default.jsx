import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer'
import AuthorDetail from '../../../../resources/components/author-title';

@Consumer
class TitleAuthor extends PureComponent {
	render() {
		const { globalContent } = this.props
		const { user = [] } = globalContent || {}
		return (
			// Componente titulo
			<AuthorDetail data={user} />
		)
	}
}

TitleAuthor.label = 'Titulo autor'

export default TitleAuthor