/* eslint-disable no-shadow */
import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import { customFields } from './_children/customfields'
// import Api from './_children/api'
import { filterSchema } from './_children/filterschema'
import TripleteChildren from './_children/triplete'
import Listado from './_children/listado'

@Consumer
class pruebaApiSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      criterio: '',
      resultados: [],
    }
  }

  onInputChange = e => {
    this.setState({
      criterio: e.target.value,
    })
  }

  fetch = e => {
    e.preventDefault()
    const { arcSite } = this.props
    const { criterio } = this.state
    const source = 'stories__by-tag-search'
    const params = {
      website: arcSite,
      search: criterio,
    }

    const schema = `{ 
      content_elements {
        headlines {
          basic
        }
      }
    }`

    console.log(arcSite)
    console.log(criterio)
    console.log(source)

    const { fetched } = this.getContent(source, params, schema)

    fetched.then(response => {
      const res = response.children.map(el => {
        return {
          name: el.name,
          url: el._id,
        }
      })
      console.log(res)
      this.setState({
        resultados: res,
      })
    })
    console.log('me dieron click')
    console.log(fetched)
  }

  render() {
    const { criterio } = this.state
    return (
      <form onSubmit={this.fetch}>
        <input type="text" onChange={this.onInputChange} value={criterio} />
        <button>buscar</button>
      </form>
    )
  }
}

export default pruebaApiSearch
