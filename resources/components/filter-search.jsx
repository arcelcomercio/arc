import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

@Consumer
class FilterSearch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: '',
      sections: [],
      showList: false,
    }

    this.getOrder()
    this.fetchSections()
  }

  getOrder() {
    const {
      globalContentConfig: {
        query: { sort },
      },
    } = this.props
  }

  getUrl(type, value) {
    const { requestUri, arcSite } = this.props
    switch (type) {
      case 'query':
        return requestUri.replace(/\?query=.*?(?=&)/, `?query=${value}`)
      case 'section':
        return requestUri.replace(/&category=.*?(?=&)/, `&category=${value}`)
      case 'sort':
        return requestUri.replace(/&sort=.*?(?=&)/, `&sort=${value}`)
      case 'from':
        return requestUri.replace(/page=.*?(?=&)/, `&page=${value}`)
      default:
        return `/buscar/?query=&category=&sort=&page=&_website=${arcSite}`
    }
  }

  _handleButton = event => {
    this.setState({
      selected: event.target.name,
    })
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
    const { sections, selected, showList } = this.state
    const {
      globalContentConfig: { query },
    } = this.props
    console.log(query)

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
            <li className="filter-search__item active">
              <a
                href={this.getUrl('sort', 'desc')}
                className="filter-search__link"
                role="checkbox"
                aria-checked="true">
                Más Recientes
              </a>
            </li>
            <li className="filter-search__item">
              <a
                href={this.getUrl('sort', 'asc')}
                className="filter-search__link"
                role="checkbox"
                aria-checked="false">
                Menos Recientes
              </a>
            </li>
            <li className="filter-search__item">
              <a
                href="/"
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
              <a
                href="/"
                className="filter-search__link"
                role="button"
                onClick={this._handleButton}
                onKeyDown={this._handleButton}
                name="type">
                Tipo de Nota
              </a>
            </li>
            <li
              className={`filter-search__item ${
                selected === 'section' ? 'selected' : ''
              }`}>
              <a
                href="/"
                className="filter-search__link"
                role="button"
                onClick={this._handleButton}
                onKeyDown={this._handleButton}
                name="section">
                Sección
              </a>
              {selected === 'section' && sections !== [] && (
                <ul className="filter-search__sublist active">
                  {sections.map(section => (
                    <li key={section._id} className="filter-search__subitem">
                      <a href={section._id} className="filter-search__sublink">
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
              <a
                href="/"
                className="filter-search__link"
                role="button"
                onClick={this._handleButton}
                onKeyDown={this._handleButton}
                name="time">
                Período de tiempo
              </a>
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
