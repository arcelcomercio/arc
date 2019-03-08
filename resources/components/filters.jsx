import React, { Component } from 'react'
import Consumer from 'fusion:consumer'

@Consumer
class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      sort: '',
      sections: '',
    }

    this.handleChangeSearch = this.handleChangeSearch.bind(this)
    this.handleChangeRadio = this.handleChangeRadio.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.fetchSections()
  }

  castingData(data) {
    const aux = []
    data.forEach(el => {
      const d = {}
    })
  }

  fetchSections() {
    const { arcSite } = this.props

    const source = 'section'
    const params = {
      website: arcSite,
    }
    const schema = `{
      q_results {
        _id
        name
      }
    }`
    const { fetched } = this.getContent(source, params, schema)
    fetched
      .then(response => {
        console.log(response)
        if (response && response.q_results.length > 0) {
          this.castingData(response.q_results)
        } else this.setDataTest()
      })
      .catch(error => {
        console.log(error)
        //this.setDataTest()
      })
  }

  handleChangeSearch(evt) {
    this.setState({ query: evt.target.value })
  }

  handleChangeRadio(evt) {
    this.setState({ sort: evt.target.value })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    console.log(this.props)
    const { website } = this.props
    const { query, sort } = this.state
    const { origin, pathname } = window.location
    window.location.href = `${origin}${pathname}?_website=${website}&query=${query}&sort=${sort}`
  }

  render() {
    const { sort } = this.state
    return (
      <div>
        <input
          type="radio"
          name="filter"
          id=""
          value="desc"
          checked={sort == 'desc'}
          onChange={this.handleChangeRadio}
        />
        <label>Mas Reciente</label>
        <input
          type="radio"
          name="filter"
          id=""
          value="asc"
          checked={sort == 'asc'}
          onChange={this.handleChangeRadio}
        />
        <label>Menos Reciente</label>
        <form action="" onSubmit={this.handleSubmit}>
          <input
            type="search"
            name="query"
            id=""
            onChange={this.handleChangeSearch}
          />
          <button type="submit">
            <span>&#9740;</span>
          </button>
        </form>
      </div>
    )
  }
}
export default Filter
