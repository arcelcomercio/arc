import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

@Consumer
class FilterSearch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sort: !props.isAdmin && this.getOrder(),
      selected: !props.isAdmin && this.getSection(),
      sections: [],
      showList: false,
    }

    this.fetchSections()
    this.inputSearch = React.createRef()
  }

  getOrder() {
    const {
      globalContentConfig: {
        query: { sort },
      },
    } = this.props

    return sort
  }

  getSection() {
    const {
      globalContentConfig: {
        query: { section },
      },
    } = this.props

    return section && section !== '' ? 'section' : ''
  }

  getUrl(type, value) {
    const { requestUri, arcSite } = this.props
    switch (type) {
      case 'query': {
        const newUri = requestUri.replace(/\?query=.*?(?=&)/, `?query=${value}`)
        return newUri.replace(/&page=.*?(?=&)/, '')
      }
      case 'section': {
        const newUri = requestUri.replace(
          /&category=.*?(?=&)/,
          `&category=${value.slice(1)}`
        )
        return newUri.replace(/&page=.*?(?=&)/, '')
      }
      case 'sort': {
        const newUri = requestUri.replace(/&sort=.*?(?=&)/, `&sort=${value}`)
        return newUri.replace(/&page=.*?(?=&)/, '')
      }
      case 'from':
        return requestUri.replace(/&page=.*?(?=&)/, `&page=${value}`)
      default:
        return `/buscar/?query=&category=&sort=desc&_website=${arcSite}`
    }
  }

  _handleButton = event => {
    this.setState({
      selected: event.target.name,
    })
  }

  _handleSearch = e => {
    const { arcSite } = this.props
    e.preventDefault()
    const { value } = this.inputSearch.current
    if (value && value !== '')
      location.href = `${
        location.pathname
      }?query=${value}&category=&sort=desc&_website=${arcSite}`
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
        if (response && response.children.length > 0) {
          this.setState({ sections: response.children })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { sections, selected, showList, sort } = this.state

    return (
      <div className="filter-search full-width margin-top">
        <div className="filter-search__box-list">
          <button
            className={`filter-search__select ${showList ? 'active' : ''}`}
            onClick={() => this.setState({ showList: !showList })}
            onKeyDown={() => this.setState({ showList: !showList })}
            type="button">
            <span className="filter-search__select-name">
              Seleccione <span className="icon-angle-down">+</span>
            </span>
          </button>
          <ul className={`filter-search__list ${showList ? 'active' : ''}`}>
            <li
              className={`filter-search__item ${
                sort === 'desc' ? 'active' : ''
              }`}>
              <a
                href={this.getUrl('sort', 'desc')}
                className="filter-search__link"
                role="checkbox"
                aria-checked="true">
                Más Recientes
              </a>
            </li>
            <li
              className={`filter-search__item ${
                sort === 'asc' ? 'active' : ''
              }`}>
              <a
                href={this.getUrl('sort', 'asc')}
                className="filter-search__link"
                role="checkbox"
                aria-checked="false">
                Menos Recientes
              </a>
            </li>
            <li
              className={`filter-search__item ${
                sort === 'rel' ? 'active' : ''
              }`}>
              <a
                href={this.getUrl()}
                className="filter-search__link"
                role="checkbox"
                aria-checked="false">
                Relevancia
              </a>
            </li>
            <li
              className={`filter-search__item ${
                selected === 'type' ? 'selected' : ''
              }`}>
              <button
                type="button"
                className="filter-search__link"
                onClick={this._handleButton}
                onKeyDown={this._handleButton}
                name="type">
                Tipo de Nota
              </button>
            </li>
            <li
              className={`filter-search__item ${
                selected === 'section' ? 'selected' : ''
              }`}>
              <button
                type="button"
                className="filter-search__link"
                onClick={this._handleButton}
                onKeyDown={this._handleButton}
                name="section">
                Sección
              </button>
              {selected === 'section' && sections !== [] && (
                <ul className="filter-search__sublist active">
                  {sections.map(section => (
                    <li key={section._id} className="filter-search__subitem">
                      <a
                        href={this.getUrl('section', section._id)}
                        className="filter-search__sublink">
                        {section.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li
              className={`filter-search__item ${
                selected === 'time' ? 'selected' : ''
              }`}>
              <button
                type="button"
                className="filter-search__link"
                onClick={this._handleButton}
                onKeyDown={this._handleButton}
                name="time">
                Período de tiempo
              </button>
            </li>
          </ul>
        </div>
        <div className="filter-search__box-search">
          <form className="filter-search__search" onSubmit={this._handleSearch}>
            <button className="icon-search" type="submit">
              Q
            </button>
            <input ref={this.inputSearch} type="search" placeholder="Buscar" />
          </form>
        </div>
      </div>
    )
  }
}

export default FilterSearch
