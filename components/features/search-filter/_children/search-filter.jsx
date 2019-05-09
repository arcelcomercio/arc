import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

// TODO: Refactorizar todo (la data debe venir desde el feature, no hacer fetches aca)
@Consumer
class SearchFilterChildSearchFilter extends PureComponent {
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
    const { globalContentConfig } = this.props
    const { query: { sort } = {} } = globalContentConfig || {}
    return sort || 'desc'
  }

  // Set the section state from &category=
  getSection() {
    const { globalContentConfig } = this.props
    const { query: { section = '' } = {} } = globalContentConfig || {}

    return section !== '' ? 'section' : ''
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
      const { globalContentConfig } = this.props
      const { query: params = {} } = globalContentConfig || {}

      /* Por defecto "sort" será "desc", no "vacío" */
      const sort = type === 'sort' ? value : 'desc'
      /*
        Es necesario hacer esto para poder agregar el parámetro "category" 
        aún cuando no está presente en la URI actual
      */
      const category = type === 'category' ? value : ''

      // TODO: Manejar error con "params.section.slice(1)"
      newUri = `/buscar/?query=${encodeURIComponent(params.query || '').replace(
        /%20/g,
        '+'
      )}&category=${(params.section && params.section.slice(1)) ||
        category}&sort=${params.sort || sort || 'desc'}&_website=${arcSite}`
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

  // TODO: Agrega la nueva "query" a la URI
  _handleSearch = e => {
    const { arcSite, globalContentConfig } = this.props
    const { query: { sort } = {} } = globalContentConfig || {}
    const { value } = this.inputSearch.current /* React ref del input */
    e.preventDefault()

    /* Sólo genera la URI si "query" tiene contenido */
    if (value !== '')
      // TODO: location.pathmane por "contextPath y requestUri"
      // Si me dio tiempo de escribir esto pero no de hacerlo...
      // eslint-disable-next-line no-restricted-globals
      location.href = `${location.pathname}?query=${encodeURIComponent(
        value
      ).replace(/%20/g, '+')}&category=&sort=${sort ||
        'desc'}&_website=${arcSite}`
    /* Si, la categoría por defecto se vuelve vacía al realizar nueva búsqueda */
  }

  fetchSections() {
    const { arcSite } = this.props

    const source = 'navigation-by-hierarchy'
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
        const { children = [] } = response || {}
        if (children.length > 0) {
          this.setState({ sections: children })
        }
      })
      .catch(error => {
        throw new Error(error)
      })
  }

  render() {
    const { sections, selected, showList, sort } = this.state
    const { isAdmin } = this.props

    const classes = {
      searchFilter: 'search-filter full-width margin-top',
      searchFilterContainerList: 'search-filter__box-list',
      searchFilterSelect: `search-filter__select ${showList ? 'active' : ''}`,
      searchFilterSelectName: 'search-filter__select-name',
      searchFilterIconButton: 'icon-angle-down',
      searchFilterList: `search-filter__list ${showList ? 'active' : ''}`,
      searchFilterItemDesc: `search-filter__item ${
        sort === 'desc' || !sort ? 'active' : ''
      }`,
      searchFilterItemAsc: `search-filter__item ${
        sort === 'asc' ? 'active' : ''
      }`,
      searchFilterItemRel: `search-filter__item ${
        sort === 'rel' ? 'active' : ''
      }`,
      searchFilterItemType: `search-filter__item ${
        selected === 'type' ? 'selected' : ''
      }`,
      searchFilterItemSection: `search-filter__item ${
        selected === 'section' ? 'selected' : ''
      }`,
      searchFilterItemTime: `search-filter__item ${
        selected === 'time' ? 'selected' : ''
      }`,
      searchFilterLink: 'search-filter__link',
      searchFilterSubList: 'search-filter__sublist active',
      searchFilterSubItem: 'search-filter__subitem',
      searchFilterSubLink: 'search-filter__sublink',
      searchFilterContainerSearch: 'search-filter__box-search',
      searchFilterInputSearch: 'search-filter__search',
      searchFilterIconSearch: 'icon-search',
    }

    return (
      <div className={classes.searchFilter}>
        <div className={classes.searchFilterContainerList}>
          <button
            className={classes.searchFilterSelect}
            onClick={() => this.setState({ showList: !showList })}
            onKeyDown={() => this.setState({ showList: !showList })}
            type="button">
            <span className={classes.searchFilterSelectName}>
              Seleccione{' '}
              <span className={classes.searchFilterIconButton}>+</span>
            </span>
          </button>
          <ul className={classes.searchFilterList}>
            <li className={classes.searchFilterItemDesc}>
              <a
                href={!isAdmin && this.getUrl('sort', 'desc')} // (type, value)
                className={classes.searchFilterLink}
                role="checkbox"
                aria-checked="true">
                Más Recientes
              </a>
            </li>
            <li className={classes.searchFilterItemAsc}>
              <a
                href={!isAdmin && this.getUrl('sort', 'asc')} // (type, value)
                className={classes.searchFilterLink}
                role="checkbox"
                aria-checked="false">
                Menos Recientes
              </a>
            </li>
            <li className={classes.searchFilterItemRel}>
              <a
                href={!isAdmin && this.getUrl()} // (type, value)
                className={classes.searchFilterLink}
                role="checkbox"
                aria-checked="false">
                Relevancia
              </a>
            </li>
            <li className={classes.searchFilterItemType}>
              <button
                type="button"
                className={classes.searchFilterLink}
                onClick={this._handleButton}
                onKeyDown={this._handleButton}
                name="type">
                Tipo de Nota
              </button>
            </li>
            <li className={classes.searchFilterItemSection}>
              <button
                type="button"
                className={classes.searchFilterLink}
                onClick={this._handleButton}
                onKeyDown={this._handleButton}
                name="section">
                Sección
              </button>
              {/* Si el filtro seleccionado es "sección", renderiza la lista de secciones */
              selected === 'section' && sections !== [] && (
                <ul className={classes.searchFilterSubList}>
                  {sections.map(section => (
                    <li
                      key={section._id}
                      className={classes.searchFilterSubItem}>
                      <a
                        href={
                          !isAdmin &&
                          this.getUrl('category', section._id.slice(1))
                        } // (type, value)
                        /* El slice(0) es para eliminar el slash inicial de la sección */
                        className={classes.searchFilterSubLink}>
                        {section.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li className={classes.searchFilterItemTime}>
              <button
                type="button"
                className={classes.searchFilterLink}
                onClick={this._handleButton}
                onKeyDown={this._handleButton}
                name="time">
                Período de tiempo
              </button>
            </li>
          </ul>
        </div>
        <div className={classes.searchFilterContainerSearch}>
          <form
            className={classes.searchFilterInputSearch}
            onSubmit={this._handleSearch}>
            <button className={classes.searchFilterIconSearch} type="submit">
              Q
            </button>
            <input ref={this.inputSearch} type="search" placeholder="Buscar" />
          </form>
        </div>
      </div>
    )
  }
}

export default SearchFilterChildSearchFilter
