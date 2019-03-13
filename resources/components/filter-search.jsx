import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

@Consumer
class FilterSearch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sort: this.getOrder(),
      selected: this.getSection(),
      sections: [],
      showList: false,
    }

    this.fetchSections()
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
    console.log(event)
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

  render() {
    const { sections, selected, showList, sort } = this.state
    const {
      globalContentConfig: { query },
    } = this.props

    return (
      <div className="filter-search content-layout-container">
        <div className="filter-search__box-list">
          <div
            className={`filter-search__select ${showList ? 'active' : ''}`}
            onClick={() => this.setState({ showList: !showList })}
            onKeyPress={() => this.setState({ showList: !showList })}
            role="button">
            <p className="filter-search__select-name">
              Seleccione <span className="icon-angle-down">+</span>
            </p>
          </div>
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
          <div className="filter-search__search">
            <span className="icon-search">Q</span>
            <input type="search" placeholder="" />
          </div>
        </div>
      </div>
    )
  }
}

export default FilterSearch
