import React, { Component } from 'react'
import Consumer from 'fusion:consumer'

@Consumer
class Filter extends Component {
  static queryAux

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
    this.queryAux = evt.target.value
  }

  handleChangeRadio(evt) {
    const {
      target: { value: valueRadio },
    } = evt
    if (valueRadio !== 'section') {
      this.setState({
        sort: valueRadio,
        isSection: false,
      })
    } else this.setState({ isSection: true })
  }

  handleSubmit(evt) {
    const { isSection } = this.state
    const section =
      isSection &&
      evt.target.querySelector('select').options[
        evt.target.querySelector('select').selectedIndex
      ].value
    evt.preventDefault()
    const { website } = this.props
    const { sort } = this.state
    const { origin, pathname } = window.location

    window.location.href = `${origin}${pathname}?_website=${website}&query=${
      this.queryAux ? this.queryAux : ''
    }${isSection ? `&category=${section}` : ''}${sort ? `&sort=${sort}` : ''}`
  }

  render() {
    const { sort, isSection, sections } = this.state
    return (
      <div>
        <label htmlFor="recent">
          <input
            type="radio"
            name="recent"
            id="recent"
            value="desc"
            checked={sort === 'desc'}
            onChange={this.handleChangeRadio}
          />
          Mas Reciente
        </label>
        <label htmlFor="old">
          <input
            type="radio"
            name="old"
            id="old"
            value="asc"
            checked={sort === 'asc'}
            onChange={this.handleChangeRadio}
          />
          Menos Reciente
        </label>
        <label htmlFor="section">
          <input
            type="radio"
            name="section"
            id="section"
            value="section"
            onChange={this.handleChangeRadio}
          />
          Sección
        </label>
        <form action="" onSubmit={this.handleSubmit}>
          <input
            type="search"
            name="query"
            id=""
            onChange={this.handleChangeSearch}
          />
          {isSection && (
            <select name="secquery">
              {sections.map(el => (
                <option key={el._id} value={el._id}>
                  {el.name}
                </option>
              ))}
            </select>
          )}
          <button type="submit">
            <span>&#9740;</span>
          </button>
        </form>
      </div>
    )
  }
}
export default Filter
