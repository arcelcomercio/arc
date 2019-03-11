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
      isSection: false,
    }

    this.handleChangeSearch = this.handleChangeSearch.bind(this)
    this.handleChangeRadio = this.handleChangeRadio.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.fetchSections()
  }

  fetchSections() {
    const { arcSite } = this.props

    const source = 'navigation__by-hierarchy'
    const params = {
      website: arcSite,
      hierarchy: 'filter-section',
    }
    const schema = `{
      children {
        _id
        name
      }
    }`
    const { fetched } = this.getContent(source, params, schema)
    fetched
      .then(response => {
        console.log(response)
        if (response && response.children.length > 0) {
          this.setState({ sections: response.children })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleChangeSearch(evt) {
    this.setState({ query: evt.target.value })
  }

  handleChangeRadio(evt) {
    const valueRadio = evt.target.value
    if (valueRadio !== 'section') {
      this.setState({ sort: evt.target.value })
      this.setState({ isSection: false })
    } else this.setState({ isSection: true })
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
    const { sort, sections, isSection } = this.state
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
        <input
          type="radio"
          name="filter"
          id=""
          value="section"
          onChange={this.handleChangeRadio}
        />
        <label>Sección</label>

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
