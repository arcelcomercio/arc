import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

const classes = {} // TODO: Falta refactorizar estilos

@Consumer
class FilterSearch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      /* Agrega valor a estos estados fuera del PageBuilder */
      sort: !props.isAdmin && this.getOrder(),
      selected: !props.isAdmin && this.getSection(),
      sections: [],
      showList: false,
    }

    this.fetchSections()
    this.inputSearch = React.createRef() /* React ref del input */
  }

  // Set the sort state from &sort=
  getOrder() {
    const { globalContentConfig: { query: { sort } = {} } = {} } = this.props

    return sort
  }

  // Set the section state from &category=
  getSection() {
    const {
      globalContentConfig: { query: { section = '' } = {} } = {},
    } = this.props

    return section
  }

  // Replace the parameter from the query
  getUrl(type, value) {
    const { requestUri, arcSite } = this.props

    /* Genera la expresión regular basado en el parámetro que se busca */
    const regex = new RegExp(`(\\?|&)${type}=.*?(?=&)`)
    let newUri

    /* Si la URI actual tiene el parámetro que se quiere reemplazar, lo reemplaza */
    if (requestUri.includes(type)) {
      /* Si el parámetro es "query", agrega el "?" al inicio, sino el "&" */
      newUri = requestUri.replace(
        regex,
        `${type === 'query' ? '?' : '&'}${type}=${
          type === 'query'
            ? encodeURIComponent(value).replace(/%20/g, '+')
            : value
        }`
      )
      /* Luego de agregar un parámetro resetea la paginación */
      newUri = newUri.replace(/&page=.*?(?=&|$)/, '')
    } else {
      /*
        Si el parámetro que se quiere reemplazar no está en la URI actual 
        generará la URI desde cero usando los parámetros que ya tiene y
        agregando el nuevo parámetro
      */
      const { globalContentConfig: { query: params = {} } = {} } = this.props

      /* Por defecto "sort" será "desc", no "vacío" */
      const sort = type === 'sort' ? value : 'desc'
      /*
        Es necesario hacer esto para poder agregar el parámetro "category" 
        aún cuando no está presente en la URI actual
      */
      const category = type === 'category' ? value : ''

      newUri = `/buscar/?query=${encodeURIComponent(params.query || '').replace(
        /%20/g,
        '+'
      )}&category=${(params.section && params.section.slice(1)) ||
        category}&sort=${params.sort || sort}&_website=${arcSite}`
      /* El slice(0) es para eliminar el slash de la sección que se agrega para la consulta a la API */
    }

    return newUri /* Retorna la nueva URI armada */
  }

  // Establece el estado "selected" relacionado al filtro seleccionado
  _handleButton = event => {
    this.setState({
      selected: event.target.name,
    })
  }

  // Agrega la nueva "query" a la URI
  _handleSearch = e => {
    const {
      arcSite,
      globalContentConfig: { query: { sort = 'desc' } = {} } = {},
    } = this.props
    const { value = '' } = this.inputSearch.current /* React ref del input */

    e.preventDefault()

    /* Sólo genera la URI si "query" tiene contenido */
    if (value !== '')
      location.href = `${location.pathname}?query=${encodeURIComponent(
        value
      ).replace(/%20/g, '+')}&category=&sort=${sort}&_website=${arcSite}`
    /* Si, la categoría por defecto se vuelve vacía al realizar nueva búsqueda */
  }

  fetchSections() {
    const { arcSite } = this.props

    const source = 'navegacion-por-jerarquia'
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
      .then(({ children = [] }) => {
        if (children && children.length > 0) {
          this.setState({ sections: children })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { sections, selected, showList, sort } = this.state
    const { isAdmin } = this.props

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
                sort === 'desc' || !sort ? 'active' : ''
              }`}>
              <a
                href={!isAdmin && this.getUrl('sort', 'desc')} // (type, value)
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
                href={!isAdmin && this.getUrl('sort', 'asc')} // (type, value)
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
                href={!isAdmin && this.getUrl()} // (type, value)
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
              {/* Si el filtro seleccionado es "sección", renderiza la lista de secciones */
              selected === 'section' && sections !== [] && (
                <ul className="filter-search__sublist active">
                  {sections.map(section => (
                    <li key={section._id} className="filter-search__subitem">
                      <a
                        href={
                          !isAdmin &&
                          this.getUrl('category', section._id.slice(1))
                        } // (type, value)
                        /* El slice(0) es para eliminar el slash inicial de la sección */
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
