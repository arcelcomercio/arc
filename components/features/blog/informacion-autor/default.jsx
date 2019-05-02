
import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer'
import InformacionAutor from '../../../../resources/components/author-details'

@Consumer
class InforAutor extends PureComponent {
	render() {
		const { globalContent } = this.props
		const { user = [] } = globalContent || {}
		return (
			
			<InformacionAutor data={user} />
		)
	}
}

InforAutor.label = 'Información del Autor'

export default InforAutor