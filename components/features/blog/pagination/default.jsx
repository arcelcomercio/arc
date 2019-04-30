import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer'

import Paginacion from '../../../../resources/components/paginacion_numerica'

@Consumer
class BlogPagination extends PureComponent {
	render() {
		const { globalContent } = this.props
		const { posts = [] } = globalContent || {}
		const totalPost = posts.length
		return (
				<Paginacion
					totalElements={totalPost}
					storiesQty={2}
					currentPage={1}
				/>
		)
	}
}

BlogPagination.label = 'Paginacion del blog'

export default BlogPagination