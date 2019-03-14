import React, { Component, Fragment } from 'react'
import CardAutor from '../../../../resources/components/option-autor'
import CardEditorial from '../../../../resources/components/option-editorial'
import BarraAutor from '../../../../resources/components/option-mas'

class OpinionAutomatica extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
      <div>
        <div className="grid-notice">
          <CardEditorial />
          <CardAutor />
          <CardAutor />
        </div>
				<div className="">
					<BarraAutor />
				</div>
      </div>
    )
	}
}

export default OpinionAutomatica
