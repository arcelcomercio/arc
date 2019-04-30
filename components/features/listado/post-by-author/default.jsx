/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import Consumer from 'fusion:consumer'

import Paginacion from '../../../../resources/components/paginacion_numerica'

@Consumer
class BlogList extends Component {
	constructor(props){
		super(props)
	}

	render(){
		const { globalContent } = this.props
		const { posts = [], user = {} } = globalContent || {}
		const totalPost = posts.length
		console.log(globalContent)
		return (
      <div>
				{/* <Titulo data={user} > */}
				{/* <Item > */}
        <Paginacion
          totalElements={totalPost}
          storiesQty={2}
          currentPage={1}
        />
      </div>
    )
	}
}

BlogList.label = 'Listado Post/blog por Autor'

export default BlogList;