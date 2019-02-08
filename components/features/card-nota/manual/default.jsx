import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { Fragment, Component } from 'react'

// Temp
import './card-nota.scss'

@Consumer
class Manual extends Component {

  constructor(props) {
    super(props)
    this.fetch()
  }

  fetch() {
    const source = 'get-story-by-websiteurl'
    const params = {
      website: this.props.arcSite, 
      website_url: '/2019/02/01/carlos-tubino-sobre-moises-mamani-no-vamos-a/'
    }
    const schema = ``

    const { fetched } = this.getContent(source, params)
    fetched.then(response => {
      console.log(response)
    })
  }

  render() {

    return (
      <article>
        <div>
          <div>
            <h3>
              <a href="">Editorial</a>
            </h3>
          </div>
          <h2>
            <a href="">"El olvido que nos acecha", sobre la preservación del Archivo General de la Nación</a>
          </h2>
          <span>
            <a href="">opinión ec</a>
          </span>
        </div>
        <figure>
          <a href="">
            <img src="https://img.elcomercio.pe/files/listing_ec_home_principal/uploads/2019/02/06/5c5b3d2b7c9e2.jpeg" alt=""/>
          </a>
        </figure>
      </article>
    )
  }
}



export default Manual